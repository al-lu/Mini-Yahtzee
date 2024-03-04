import React from "react";
import { Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
} from "../constants/Game";
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

let board = [];

export default function Gameboard({ navigation, route }) {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices");
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

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  const getDiceColor = (i) => {
    return selectedDices[i] ? "black" : "steelblue";
  };

  const getDicePointsColor = (i) => {
    return selectedDicePoints[i] && !gameEndStatus ? "black" : "steelblue";
  };

  const getSpotTotal = (i) => {
    console.log(i);
    return dicePointsTotal[i];
  };

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first");
    }
  };

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedDicePoints[i] = true;
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
        setStatus("You already selected points for " + (i + 1));
      }
    } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
    }
  };

  const throwDices = () => {
    if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
      setStatus("Select your points before next throw");
      return 1;
    } else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
      setGameEndStatus(false);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
    }

    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        board[i] = "dice-" + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDicesSpots(spots);
    setStatus("Select and throw dices again.");
  };

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable key={"dice" + dice} onPress={() => selectDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50}
            color={getDiceColor(dice)}
          />
        </Pressable>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          />
        </Pressable>
      </Col>
    );
  }

  return (
    <>
      <Header />
      <View>
        <Text>Gameboard will be here..</Text>
        <Container fluid>
          <Row>{dicesRow}</Row>
        </Container>
        <Text>Throws left: {nbrOfThrowsLeft}</Text>
        <Text>{status}</Text>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Pressable onPress={() => throwDices()}>
          <Text>THROW DICES</Text>
        </Pressable>
        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
}
