import React from "react";
import { Text, View } from "react-native";
import Style from "../styles/Style";

export default function Footer() {
  return (
    <View style={Style.footer}>
      <Text style={Style.author}>Author: Aleksi Kallio</Text>
    </View>
  );
}
