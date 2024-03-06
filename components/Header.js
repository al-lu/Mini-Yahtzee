import React from "react";
import { Text, View } from "react-native";
import Style from "../styles/Style";

export default function Header() {
  return (
    <View style={Style.header}>
      <Text style={Style.title}>Mini-yahtzee</Text>
    </View>
  );
}
