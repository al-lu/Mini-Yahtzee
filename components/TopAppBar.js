import { Appbar, Icon } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import Style from "../styles/Style";
import { Image, View } from "react-native";
import { horizontalScale, verticalScale } from "./Metrics";

export default function TopAppBar({ route, options }) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={Style.topAppBar}>
      <Appbar.Content
        title={title}
        titleStyle={Style.topAppBarTitleText}
      ></Appbar.Content>
      <View style={Style.yahtzeeDicesImagesView}>
        <Image
          style={Style.yahtzeeDicesImages}
          source={require("../assets/yahtzee-dices-90.png")}
        />
      </View>
    </Appbar.Header>
  );
}
