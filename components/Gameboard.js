import React from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  SCOREBOARD_KEY,
} from "../constants/Game";
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Style from "../styles/Style";
import { ColorScheme } from "../colors/ColorScheme";
import { Button, Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { moderateScale } from "./Metrics";

let board = [];

export default function Gameboard({ navigation, route }) {
  // States
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [bonusPointsStatus, setBonusPointsStatus] = useState(
    `You are ${BONUS_POINTS_LIMIT} points away from bonus.`
  );
  const [status, setStatus] = useState("Start the game by throwing dices.");
  const [gameStartStatus, setGameStartStatus] = useState(false);
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [diceSpots, setDicesSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  const [gameScores, setGameScores] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));

  // Rotate dices
  const interpolatedRotateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Animate dice rolls
  const startAnimation = (i) => {
    const animationSequence = Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start();
  };

  // Handle player name from route params
  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  // Read from Asyncstorage when opening gameboard or scoreboard
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  // Update state after dice selection
  useEffect(() => {
    const updateStateAfterDiceSelection = () => {
      selectedDices.fill(false);

      setStatus("Throw dices.");
      let totalPoints = dicePointsTotal.reduce((sum, point) => sum + point, 0);
      let remainingPointsToBonus = BONUS_POINTS_LIMIT - totalPoints;

      if (remainingPointsToBonus > 0) {
        setTotalPoints(totalPoints);
        setBonusPointsStatus(
          `You are ${remainingPointsToBonus} points away from bonus.`
        );
      } else {
        const newTotalPoints = totalPoints + BONUS_POINTS;
        setTotalPoints(newTotalPoints);
        setBonusPointsStatus(`Congrats! Bonus points (50) added.`);
      }

      const isEveryPointSelected = selectedDicePoints.every(
        (selectedPoint) => selectedPoint
      );
      if (isEveryPointSelected) {
        setGameEndStatus(true);
      }
    };

    // Check if any point is selected
    if (selectedDicePoints.some((point) => point)) {
      updateStateAfterDiceSelection();
    }
  }, [selectedDicePoints]);

  // Avoid one step behind problem
  useEffect(() => {
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
    }
  }, [nbrOfThrowsLeft]);

  // Updates the game status to "GAME OVER" when all points are selected
  useEffect(() => {
    if (gameEndStatus) {
      saveGameData();
      setStatus("GAME OVER. All points selected.");
    }
  }, [gameEndStatus]);

  // Color for a dice
  const getDiceColor = (i) => {
    return selectedDices[i]
      ? ColorScheme.colors.iconColorPrimary
      : ColorScheme.colors.iconColorSecondary;
  };

  // Color for a dicePoint
  const getDicePointsColor = (i) => {
    return selectedDicePoints[i] && !gameEndStatus
      ? ColorScheme.colors.iconColorTertiary
      : ColorScheme.colors.iconColorSecondary;
  };

  // Total number of spots rolled for a specific point value
  const getSpotTotal = (i) => {
    return dicePointsTotal[i];
  };

  // Handle selecting a dice and update its selection state
  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first.");
    }
  };

  // Handle selecting a dice point and updates its selection state and points total
  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        return points[i];
      } else {
        setStatus("You already selected points for " + (i + 1) + ".");
      }
    } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
    }
  };

  // Handle throwing dice and updates game state and dice spots
  const throwDices = () => {
    setGameStartStatus(true);

    if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
      setStatus("Select points before the next throw.");
      return 1;
    } else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
      setGameEndStatus(false);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
    }

    let spots = [...diceSpots];

    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        // Animate only unselected dice
        startAnimation(i);
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber;
        spots[i] = randomNumber;
      }
    }

    setNbrOfThrowsLeft((prev) => prev - 1);
    setDicesSpots(spots);
    setStatus("Select and throw dices again.");
  };

  const resetGameState = () => {
    // Reset everything
    setGameStartStatus(false);
    setGameEndStatus(false);
    setStatus("Throw dices.");
    setTotalPoints(0);
    setBonusPointsStatus(
      `You are ${BONUS_POINTS_LIMIT} points away from bonus.`
    );
    diceSpots.fill(0);
    dicePointsTotal.fill(0);
    selectedDices.fill(0);
    selectedDicePoints.fill(0);
  };

  const saveGameData = async () => {
    const time = new Date();
    const date = `${time.getDate()}.${
      time.getMonth() + 1
    }.${time.getFullYear()}`;
    const currentTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

    const uniqueKey = uuidv4();
    const saveData = {
      key: uniqueKey,
      name: playerName,
      date,
      time: currentTime,
      points: totalPoints,
    };

    try {
      const newScore = [...gameScores, saveData];
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (error) {
      console.error("Error while saving game data: ", error);
    }
  };

  const fetchScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      const gameScores = jsonValue ? JSON.parse(jsonValue) : [];
      setGameScores(gameScores);
    } catch (error) {
      console.error("Error while fetching scoreboard data:", error);
    }
  };

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text style={Style.pointsRowText} key={"pointsRow" + spot}>
          {getSpotTotal(spot)}
        </Text>
      </Col>
    );
  }

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    // Only animate unselected dices
    const isSelected = selectedDices[dice];
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable key={"dice" + dice} onPress={() => selectDice(dice)}>
          {isSelected ? (
            // Render a static dice for selected dices
            <MaterialCommunityIcons
              name={board[dice]}
              key={"dice" + dice}
              size={moderateScale(47)}
              color={getDiceColor(dice)}
            />
          ) : (
            // Render animated dice for unselected dices
            <Animated.View
              style={[{ transform: [{ rotateY: interpolatedRotateY }] }]}
            >
              <MaterialCommunityIcons
                name={board[dice]}
                key={"dice" + dice}
                size={moderateScale(47)}
                color={getDiceColor(dice)}
              />
            </Animated.View>
          )}
        </Pressable>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col style={Style.pointsToSelectRow} key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={moderateScale(35)}
            color={getDicePointsColor(diceButton)}
          />
        </Pressable>
      </Col>
    );
  }

  return (
    <>
      <Header />
      <View style={Style.gameContainer}>
        {!gameStartStatus ? (
          <>
            <MaterialCommunityIcons
              name="dice-multiple"
              size={moderateScale(75)}
              color={ColorScheme.colors.iconColorPrimary}
            />
          </>
        ) : (
          <Container fluid>
            <Row style={Style.dicesRow}>{dicesRow}</Row>
          </Container>
        )}
        <Text style={Style.gameboardHeadingTextPrimary}>
          Throws left: {nbrOfThrowsLeft}
        </Text>
        <Text style={Style.gameboardSubHeadingText}>{status}</Text>
        <View style={Style.throwDicesButton}>
          <Button
            labelStyle={{ fontSize: moderateScale(12.5) }}
            mode="contained"
            buttonColor={
              !gameEndStatus
                ? ColorScheme.colors.buttonColorPrimary
                : ColorScheme.colors.iconColorQuaternary
            }
            icon={(p) => (
              <Icon
                {...p}
                source={
                  !gameEndStatus
                    ? require("../assets/yahtzee-cup-50.png")
                    : "restart"
                }
                size={moderateScale(28)}
              />
            )}
            onPress={() => (!gameEndStatus ? throwDices() : resetGameState())}
          >
            {!gameEndStatus ? "THROW DICES" : "RESTART"}
          </Button>
          <View>
            <Text style={Style.gameboardHeadingTextSecondary}>
              TOTAL: {totalPoints}
            </Text>
            <Text style={Style.gameboardSubHeadingText}>
              {bonusPointsStatus}
            </Text>
          </View>
        </View>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Text style={Style.gameboardPlayerName}>Player: {playerName}</Text>
      </View>

      <Footer />
    </>
  );
}
