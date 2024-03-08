import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import Style from "../styles/Style";
import { ColorScheme } from "../colors/ColorScheme";
import { Button } from "react-native-paper";
import { moderateScale } from "./Metrics";

export default function Home({ navigation }) {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={Style.container}>
      <Header />
      <View style={Style.gameInfoView}>
        {!hasPlayerName ? (
          <>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={moderateScale(78)}
              color={ColorScheme.colors.iconColorPrimary}
              style={Style.gameInfoIcon}
            />
            <Text style={Style.headingTextPrimary}>
              For scoreboard enter your name...
            </Text>
            <TextInput
              style={Style.playerNameTextInput}
              onChangeText={setPlayerName}
              autoFocus={true}
              mode="outlined"
            />
            <Button
              buttonColor={ColorScheme.colors.buttonColorPrimary}
              textColor={ColorScheme.colors.textColorPrimary}
              style={Style.button}
              labelStyle={{ fontSize: moderateScale(15) }}
              mode="contained"
              onPress={() => handlePlayerName(playerName)}
            >
              OK
            </Button>
          </>
        ) : (
          <>
            <MaterialCommunityIcons
              name="alert-circle-check-outline"
              size={moderateScale(78)}
              color={ColorScheme.colors.iconColorPrimary}
              style={Style.gameInfoIcon}
            />
            <View style={Style.gameRulesView}>
              <Text style={Style.headingTextSecondary}>Rules of the game</Text>
              <Text style={Style.gameRulesText} multiline="true">
                <Text style={Style.subHeading}>THE GAME:</Text> Upper section of
                the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS} throws. After each
                throw you can keep dices in order to get same dice spot counts
                as many as possible. In the end of the turn you must select your
                points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points
                have been selected. The order for selecting those is free.
              </Text>
              <Text style={Style.gameRulesText} multiline="true">
                <Text style={Style.subHeading}>POINTS:</Text> After each turn
                game calculates the sum for the dices you selected. Only the
                dices having the same spot count are calculated. Inside the game
                you can not select same points from
                {MIN_SPOT} to {MAX_SPOT} again.
              </Text>
              <Text style={Style.gameRulesText} multiline="true">
                <Text style={Style.subHeading}>GOAL:</Text> To get points as
                much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                getting bonus which gives you {BONUS_POINTS} points more.
              </Text>
            </View>
            <Text style={Style.headingTextTertiary}>
              Good luck, {playerName}
            </Text>
            <Button
              buttonColor={ColorScheme.colors.buttonColorPrimary}
              textColor={ColorScheme.colors.textColorPrimary}
              style={Style.button}
              labelStyle={{ fontSize: moderateScale(15) }}
              mode="contained"
              onPress={() =>
                navigation.navigate("Gameboard", { player: playerName })
              }
            >
              PLAY
            </Button>
          </>
        )}
      </View>
      <Footer />
    </View>
  );
}
