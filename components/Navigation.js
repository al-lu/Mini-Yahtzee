import Home from "./Home";
import Gameboard from "./Gameboard";
import Scoreboard from "./Scoreboard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ColorScheme } from "../colors/ColorScheme";
import TopAppBar from "./TopAppBar";
import { moderateScale, verticalScale } from "./Metrics";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={({ route }) => ({
          headerShown: true,
          header: (props) => <TopAppBar {...props} />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-variant" : "home-variant-outline";
            } else if (route.name === "Gameboard") {
              iconName = focused ? "dice-multiple" : "dice-multiple-outline";
            } else if (route.name === "Scoreboard") {
              iconName = focused ? "view-list" : "view-list-outline";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={moderateScale(35)}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: ColorScheme.colors.tabBarActiveTintColor,
          tabBarInactiveTintColor: ColorScheme.colors.tabBarInactiveTintColor,
          tabBarActiveBackgroundColor:
            ColorScheme.colors.tabBarActiveBackgroundColor,
          tabBarStyle: {
            backgroundColor: ColorScheme.colors.tabBarBackgroundColor,
            height: verticalScale(55),
          },
          tabBarLabelStyle: { fontSize: moderateScale(11) },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarStyle: { display: "none" },
          }}
        />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
