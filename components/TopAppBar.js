import { Appbar, Icon } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import Style from "../styles/Style";
import { Image } from "react-native";

function TopAppBar({ route, options }) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={Style.topAppBar}>
      <Appbar.Content
        title={title}
        titleStyle={Style.topAppBarTitleText}
      ></Appbar.Content>
      <Image
        style={Style.yahtzeeDicesImage}
        source={require("../assets/yahtzee-dices-90.png")}
      />
    </Appbar.Header>
  );
}

export default TopAppBar;
