import { StyleSheet } from "react-native";
import { ColorScheme } from "../colors/ColorScheme";

export default StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  backgroundGradient: {
    flex: 1,
  },

  // TopAppBar
  topAppBar: {
    backgroundColor: ColorScheme.colors.topAppBarBackgroundColor,
  },

  topAppBarTitleText: {
    color: ColorScheme.colors.textColorPrimary,
  },

  yahtzeeDicesImage: { marginRight: 20 },

  // Header Main
  header: {
    backgroundColor: ColorScheme.colors.backgroundColorPrimary,
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorScheme.colors.borderColor,
    borderWidth: 3,
    flexDirection: "row",
  },

  // Header Title
  title: {
    fontFamily: "Righteous-Regular",
    fontSize: 30,
    color: ColorScheme.colors.textColorPrimary,
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },

  // Footer Main
  footer: {
    width: "100%",
    backgroundColor: ColorScheme.colors.backgroundColorPrimary,
    borderColor: ColorScheme.colors.borderColor,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },

  // Footer Author
  author: {
    fontFamily: "Righteous-Regular",
    fontSize: 20,
    color: ColorScheme.colors.textColorPrimary,
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },

  // GameInfo
  gameInfoView: {
    alignItems: "center",
    justifyContent: "center",
  },

  gameInfoIcon: {
    marginTop: 10,
    marginBottom: 10,
  },

  headingTextPrimary: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: 20,
  },

  headingTextSecondary: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: ColorScheme.colors.textColorSecondary,
    marginVertical: 15,
  },

  playerNameTextInput: {
    width: "80%",
    backgroundColor: ColorScheme.colors.textInputBackgroundColorPrimary,
    borderRadius: 50,
    textAlign: "center",
  },

  button: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: ColorScheme.colors.iconColorPrimary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: ColorScheme.colors.textColorPrimary,
    fontSize: 15,
    fontWeight: "bold",
  },

  // GameRules
  gameRulesView: {
    backgroundColor: ColorScheme.colors.backGroundColorSecondary,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },

  gameRulesText: {
    textAlign: "justify",
    color: ColorScheme.colors.textColorSecondary,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },

  subHeading: { fontWeight: "bold" },

  // GameBoard
  gameContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },

  row: {
    marginTop: 20,
    padding: 10,
  },

  pointsRowText: {
    color: ColorScheme.colors.textColorSecondary,
    textAlign: "center",
    fontSize: 30,
    marginBottom: 5,
  },

  throwDicesButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});
