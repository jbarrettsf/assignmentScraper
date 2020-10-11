import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import * as api from "../api/";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MyDayScreen from "../screens/MyDayScreen";

const db = SQLite.openDatabase("db.db");
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "MyDay";
const { useState, useEffect } = React;

export default function BottomTabNavigator({ navigation, route }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from credentials", [], (_, { rows }) => {
        setName(rows["_array"][0]["name"]);
        setUsername(rows["_array"][0]["username"]);
        setPassword(rows["_array"][0]["password"]);
      });
    });
  }, []);

  useEffect(() => {
    api
      .logIn(username, password)
      .then(
        api
          .getData()
          .then(
            (res) => {
              console.info(res);
              setData(res);
              storeData();
            },
            (rej) => console.warn(rej)
          )
          .catch((e) => console.error(`Failed Login:${e.message}`))
      )
      .then(() => console.info("Successful Login"))
      .catch((e) => console.error(`Failed Login:${e.message}`));
  }, []);

  function storeData() {
    db.transaction((tx) => {
      for (let i = 0; i < data.length; i += 1) {
        const {
          groupname,
          short_description,
          date_assigned,
          date_due,
          long_description,
          assignment_type,
          assignment_status,
        } = data[i];
        tx.executeSql(
          "insert into wHData (groupname, short_description, date_assigned, date_due, long_description, assignment_type, assignment_status) values (?,?,?,?,?,?,?)",
          [groupname,
            short_description,
            date_assigned,
            date_due,
            long_description,
            assignment_type,
            assignment_status,]
        );
      }
    },
    (e)=>console.error(e.message)
    );
    // groupname, short_description, date_assigned, date_due, long_description, assignment_type, assignment_status,
  }

  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={{ paddingRight: 10 }}
      >
        <AntDesign name="setting" size={30} />
      </TouchableOpacity>
    ),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="MyDay"
        component={MyDayScreen}
        options={{
          title: "My Day",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="calendar" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Assignments",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bars" />
          ),
        }}
      />
    </BottomTab.Navigator>

    // <Stack.Navigator>
    // <Stack.Screen
    //   name="Settings"
    //   component={SettingsScreen}
    //   options={{
    //     title: 'Settings',
    //     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="setting" />,
    //   }}
    // />
    // <BottomTab.Screen
    //   name="Settings"
    //   component={Settings}
    //   options={{
    //     title: 'Settings',
    //     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bars" />,
    //   }}
    // />
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Assignment Center";
    case "MyDay":
      return "My Day";
    case "Settings":
      return "Settings";
  }
}
