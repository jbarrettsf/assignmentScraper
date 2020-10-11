import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { encrypt } from "../api";
const db = SQLite.openDatabase("db.db");
export default function SettingsScreen(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { navigation } = props;
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from AARDVARK", [], (_, { rows }) => {
        setName(rows["_array"][0]["name"]);
        setUsername(rows["_array"][0]["username"]);
        setPassword(rows["_array"][0]["password"]);
      });
    });
  }, []);
  const set = () => {
    if (
      name === null ||
      name === "" ||
      username === null ||
      username === "" ||
      password === null ||
      password === ""
    ) {
      return false;
    }

    db.transaction(
      (tx) => {
        // tx.executeSql("delete from AARDVARK");
        tx.executeSql(
          "insert into AARDVARK (name, username, password) values (?,?,?)",
          [name, username, encrypt(password)]
          );
          console.log("transaction");
          tx.executeSql("select * from AARDVARK", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      null
    );
    return true;
  };
  function save() {
    if (!set()) {
      Alert.alert("Failed to save data.");
    } else {
      navigation.navigate();
    }
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            margin: 41,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Name:
        </Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setName(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            margin: 41,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Whipple Hill Username:
        </Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setUsername(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            margin: 41,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Whipple Hill Password:
        </Text>
        <TextInput
          secureTextEntry={true}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={{ padding: 20 }}>
          Your information is always encrypted and never leaves your device.
        </Text>
        <TouchableOpacity
          onPress={save}
          style={{
            padding: 11,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#1890FF",
            width: Dimensions.get("screen").width * 0.5,
            flex: 1,
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 17, textAlign: "center", color: "#1890FF" }}>
            Save
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
