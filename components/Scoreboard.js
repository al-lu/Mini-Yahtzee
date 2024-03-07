import { View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAX_NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import { Button, DataTable, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { ColorScheme } from "../colors/ColorScheme";
import Style from "../styles/Style";

export default function ScoreBoard({ navigation }) {
  const [gameScores, setGameScores] = useState([]);

  // Read from Asyncstorage when pening gameboard or scoreboard
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      const gameScores = jsonValue ? JSON.parse(jsonValue) : [];
      setGameScores(gameScores);
    } catch (error) {
      console.error("Error while fetching scoreboard data:", error);
    }
  };

  const clearScoreboardData = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setGameScores([]);
    } catch (error) {
      console.error("Clear while clearing scoreboard data:", error);
    }
  };

  gameScores.sort((a, b) => b.points - a.points);

  return (
    <>
      <Header />
      <View>
        <View style={Style.gameInfoView}>
          <MaterialCommunityIcons
            name="view-list"
            size={90}
            color={ColorScheme.colors.iconColorPrimary}
            style={Style.gameInfoIcon}
          />
          <Text>Top 10</Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text>Rank</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Player</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Date</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Time</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Points</Text>
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <View>
          {gameScores.length === 0 ? (
            <Text>Scoreboard is empty</Text>
          ) : (
            gameScores.map(
              (player, rank) =>
                rank < MAX_NBR_OF_SCOREBOARD_ROWS && (
                  <DataTable.Row key={player.key}>
                    <DataTable.Cell>
                      <Text>{rank + 1}.</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{player.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{player.date}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{player.time}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{player.points}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                )
            )
          )}
        </View>
      </View>
      <View>
        {gameScores.length > 0 && (
          <View>
            <Button
              buttonColor={ColorScheme.colors.iconColorQuaternary}
              textColor={ColorScheme.colors.textColorPrimary}
              mode="contained"
              onPress={() => clearScoreboardData()}
            >
              CLEAR SCOREBOARD
            </Button>
          </View>
        )}
      </View>
      <Footer />
    </>
  );
}
