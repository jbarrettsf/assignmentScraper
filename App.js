import { AntDesign, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import * as SQLite from "expo-sqlite";
import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("db.db");

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [data, setData] = React.useState({});
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists AARDVARK (id integer primary key not null, name text, username text, password text,);"
      );
      tx.executeSql(
        "create table if not exists wHData (id integer primary key not null, groupname text, short_description text, date_assigned text, date_due text, long_description text, assignment_type text, assignment_status integer,);"
      );
    });
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
            ></Stack.Screen>
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={({ navigation }) => {
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={30} color="#000" />
                  </TouchableOpacity>
                );
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
