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

export default function Gameboard() {
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

  const getDiceColor = (i) => {
    return selectedDices[i] ? "black" : "steelblue";
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
        <Pressable onPress={() => throwDices()}>
          <Text>THROW DICES</Text>
        </Pressable>
      </View>
      <Footer />
    </>
  );
}
