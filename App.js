import Navigation from "./components/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Style from "./styles/Style";
import { ColorScheme } from "./colors/ColorScheme";

export default function App() {
  const [loaded] = useFonts({
    "Righteous-Regular": require("./fonts/Righteous-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[
          ColorScheme.colors.backgroundColorGradientPrimary,
          ColorScheme.colors.backgroundColorGradientSecondary,
        ]}
        style={Style.backgroundGradient}
      >
        <Navigation />
      </LinearGradient>
    </SafeAreaProvider>
  );
}
