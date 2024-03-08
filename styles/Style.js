import { Dimensions, StyleSheet } from "react-native";
import { ColorScheme } from "../colors/ColorScheme";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../components/Metrics";

export default StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: verticalScale(70),
    width: horizontalScale(376),
  },

  backgroundGradient: {
    flex: 1,
  },

  // TopAppBar
  topAppBar: {
    backgroundColor: ColorScheme.colors.topAppBarBackgroundColor,
    height: verticalScale(70),
  },

  topAppBarTitleText: {
    color: ColorScheme.colors.textColorPrimary,
    fontSize: moderateScale(21),
    fontWeight: "600",
  },

  yahtzeeDicesImagesView: {
    flex: 0.5,
  },
  yahtzeeDicesImages: {
    height: verticalScale(50),
    width: horizontalScale(90),
  },

  // Header Main
  header: {
    backgroundColor: ColorScheme.colors.backgroundColorPrimary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorScheme.colors.borderColor,
    borderWidth: 3,
    height: verticalScale(50),
    width: horizontalScale(375),
  },

  // Header Title
  title: {
    fontFamily: "Righteous-Regular",
    fontSize: moderateScale(27),
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
    height: verticalScale(35),
    width: horizontalScale(375),
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
    fontSize: moderateScale(18),
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
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },

  headingTextPrimary: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(10),
  },

  headingTextSecondary: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
    textAlign: "center",
    color: ColorScheme.colors.textColorSecondary,
    marginVertical: verticalScale(15),
  },

  headingTextTertiary: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(15),
  },

  playerNameTextInput: {
    height: verticalScale(35),
    width: horizontalScale(310),
    backgroundColor: ColorScheme.colors.textInputBackgroundColorPrimary,
    borderRadius: 50,
    marginTop: verticalScale(15),
    textAlign: "center",
    fontSize: moderateScale(18),
  },

  button: {
    width: horizontalScale(120),
    alignSelf: "center",
    marginTop: verticalScale(13),
  },

  // GameRules
  gameRulesView: {
    backgroundColor: ColorScheme.colors.backGroundColorSecondary,
    borderRadius: 10,
    marginLeft: horizontalScale(17),
    marginRight: horizontalScale(17),
    paddingBottom: verticalScale(20),
  },

  gameRulesText: {
    textAlign: "justify",
    color: ColorScheme.colors.textColorSecondary,
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(15),
    marginTop: verticalScale(10),
    fontSize: moderateScale(10),
  },

  subHeading: {
    fontWeight: "bold",
    fontSize: moderateScale(10.5),
  },

  // GameBoard
  gameContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: verticalScale(70),
    width: horizontalScale(376),
  },

  gameboardHeadingTextPrimary: {
    fontWeight: "600",
    fontSize: moderateScale(18),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(15),
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },

  gameboardHeadingTextSecondary: {
    fontWeight: "600",
    fontSize: moderateScale(18),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(25),
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },

  gameboardSubHeadingText: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(10),
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },

  pointsToSelectRow: {
    alignItems: "center",
  },

  dicesRow: {
    marginTop: verticalScale(25),
  },

  pointsRowText: {
    color: ColorScheme.colors.textColorSecondary,
    textAlign: "center",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(3),
  },

  throwDicesButton: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(40),
  },

  gameboardPlayerName: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginTop: verticalScale(15),
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },

  // Scoreboard
  scoreBoardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    alignContent: "center",
    height: verticalScale(70),
    width: horizontalScale(376),
  },
  scoreboardDatatable: {
    marginLeft: horizontalScale(10),
    marginRight: horizontalScale(10),
    marginBottom: verticalScale(30),
  },

  headingTextScoreboardPrimary: {
    fontWeight: "bold",
    fontSize: moderateScale(22),
    textAlign: "center",
    color: ColorScheme.colors.textColorPrimary,
    marginBottom: verticalScale(18),
  },

  dataTableTextHeading: {
    color: ColorScheme.colors.textColorSecondary,
    fontWeight: "bold",
    fontSize: moderateScale(14),
  },

  dataTableText: {
    color: ColorScheme.colors.textColorSecondary,
    fontWeight: "600",
    fontSize: moderateScale(13),
  },

  dataTableHeader: {
    backgroundColor: ColorScheme.colors.dataTableHeaderBackground,
    borderBottomColor: ColorScheme.colors.borderColor,
    borderBottomWidth: 3,
  },
  dataTableRow: {
    borderBottomColor: ColorScheme.colors.borderColor,
    borderBottomWidth: 1,
  },
});
