import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Math 7-3',
    details: 'Projectthatimadeup',
    completed: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Language Arts 7-2',
    details: 'Monolouge Recording',
    completed: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Social Studies ',
    details: 'Read ch. 5000000',
    completed: false,
  },
];

function Item({ name, details, completed, filtered }) {
  if (filtered&&completed) {
    return (
      <View/>
    )
  }
  return (
    <View style={{padding:5}}>
      <Text>{name}</Text>
      <Text>{details}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [filter, setFilter]=React.useState(false)
  return (
    <ScrollView>
    <Text style={{fontSize: 34, fontWeight: "700", margin: 41, marginLeft:10, marginTop:10}}>Due Today:</Text>
    <Button
          title="Toggle Completed and Graded"
          onPress={() => setFilter (!filter)}
    />
    <FlatList
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} details={item.details} completed={item.completed} filtered={filter}/>}
        keyExtractor={item => item.id}
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
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
