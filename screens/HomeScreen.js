import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { removeTag } from "../api";
const db = SQLite.openDatabase("db.db");

function Item(item) {
  const {
    groupname,
    short_description,
    date_assigned,
    date_due,
    long_description,
    assignment_type,
    assignment_status,
  } = item;
  if (!item) {
    return <View></View>;
  }
  return (
    <View style={{ padding: 5 }}>
      <Text>{groupname}</Text>
      <Text>{short_description}</Text>
      <Text>{date_assigned}</Text>
      <Text>{date_due}</Text>
      <Text>{removeTag(long_description)}</Text>
      <Text>{assignment_type}</Text>
      <Text>{assignment_status}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from wHData", [], (_, { rows }) => {
        console.log(rows);
        setData(rows["_array"]);
      });
    });
  }, []);

  function parse() {
    let parsed = JSON.parse(data);
  }
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 34,
          fontWeight: "700",
          margin: 41,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        Due Today:
      </Text>
      <Button
        title="Toggle Completed and Graded"
        onPress={() => setFilter(!filter)}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item />}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
    // <View>
    //   <Text>
    //     Assignment Center
    //   </Text>
    // </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
