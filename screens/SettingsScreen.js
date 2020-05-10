import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
export default function SettingsScreen() {
  const [name, setName]=useState("");
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");

  return (
    <View>
    <Text style={{fontSize: 17, fontWeight: "700", margin: 41, marginLeft:10, marginTop:10}}>Name:</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setName(text)}/>
    <Text style={{fontSize: 17, fontWeight: "700", margin: 41, marginLeft:10, marginTop:10}}>Whipple Hill Username:</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setUsername(text)}/>
    <Text style={{fontSize: 17, fontWeight: "700", margin: 41, marginLeft:10, marginTop:10}}>Whipple Hill Password:</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setPassword(text)}/>
    <Text style={{padding:20}}>Your information is secure and never leaves your device.</Text>
    </View>
  );
};
