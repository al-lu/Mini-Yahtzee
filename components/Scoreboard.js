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
import { horizontalScale, moderateScale } from "./Metrics";

export default function ScoreBoard({ navigation }) {
  const [gameScores, setGameScores] = useState([]);

  // Read from Asyncstorage when opening gameboard or scoreboard
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
    <View style={Style.container}>
      <Header />
      <View>
        <View style={Style.gameInfoView}>
          <MaterialCommunityIcons
            name="view-list"
            size={moderateScale(78)}
            color={ColorScheme.colors.iconColorPrimary}
            style={Style.gameInfoIcon}
          />
          <Text style={Style.headingTextScoreboardPrimary}>Top 3</Text>
        </View>
        {gameScores.length === 0 ? (
          <Text style={Style.headingTextPrimary}>Scoreboard is empty</Text>
        ) : (
          <View style={Style.scoreboardDatatable}>
            <DataTable>
              <DataTable.Header style={Style.dataTableHeader}>
                <DataTable.Title>
                  <Text style={Style.dataTableTextHeading}>Rank</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={Style.dataTableTextHeading}>Player</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={Style.dataTableTextHeading}>Date</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={Style.dataTableTextHeading}>Time</Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={Style.dataTableTextHeading}>Points</Text>
                </DataTable.Title>
              </DataTable.Header>
            </DataTable>
            <View>
              {gameScores.map(
                (player, rank) =>
                  rank < MAX_NBR_OF_SCOREBOARD_ROWS && (
                    <DataTable.Row
                      style={[
                        Style.dataTableRow,
                        {
                          backgroundColor:
                            (rank + 1) % 2
                              ? ColorScheme.colors.dataTableRowColorPrimary
                              : ColorScheme.colors.dataTableRowColorSecondary,
                        },
                      ]}
                      key={player.key}
                    >
                      <DataTable.Cell>
                        <Text style={Style.dataTableText}>{rank + 1}.</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={Style.dataTableText}>{player.name}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={Style.dataTableText}>{player.date}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={Style.dataTableText}>{player.time}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[
                            Style.dataTableText,
                            {
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          {player.points}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )
              )}
            </View>
          </View>
        )}
      </View>
      <View>
        {gameScores.length > 0 && (
          <View>
            <Button
              buttonColor={ColorScheme.colors.iconColorQuaternary}
              textColor={ColorScheme.colors.textColorPrimary}
              style={{ width: horizontalScale(320), alignSelf: "center" }}
              labelStyle={{ fontSize: moderateScale(15) }}
              mode="contained"
              onPress={() => clearScoreboardData()}
            >
              CLEAR SCOREBOARD
            </Button>
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
}
