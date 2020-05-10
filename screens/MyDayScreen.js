import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TextInput, AsyncStorage, FlatList} from 'react-native';

export default function MyDayScreen() {
  const [value, setValue] = useState ("");
  useEffect(()=>{
    get()
  },[])
    async function set() {
    try {
      await AsyncStorage.setItem("name", value)
    } catch(e){}
  }
  async function get() {
    try {
      let info = await AsyncStorage.getItem("name")
      if (info !== null) {
        setValue(info)
      }
    } catch(e){}
  }
  function setName(name) {
    setValue(name);
    set();
  }
  return (
    <ScrollView>
      <Text style={{fontSize: 34, fontWeight: "700", margin: 41, marginLeft:10, marginTop:10}}>Today's Schedule</Text>
      <TextInput style={{height:50}} placeholder="AND I OOP" onChangeText ={text => setName(text)} value={value}/>
      <Text>{value}</Text>
      <Text style={{fontSize: 34, fontWeight: "500", margin: 41, marginLeft:10, marginTop:250}}>Jacob, you have 3 assignments due today.</Text>
    </ScrollView>
  );
};
MyDayScreen.navigationOptions = {
  header: "My Day",
};
