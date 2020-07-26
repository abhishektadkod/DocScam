import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators} from "@react-navigation/stack";
import {Icon} from 'react-native-elements';

import Cam from "./Components/camera";
import Gal from "./Components/gallery";
import Start from "./Components/WelcomeScreen";
import Home from "./Components/home";

function HomeScreen({ navigation }) {
  return (
    <Home navigation={navigation} />
  );
}

function GalleryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Gal />
    </View>
  );
}

function CameraScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Cam />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator  screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}>
      <Stack.Screen name="Home" component={HomeScreen}        
       options={{
          headerTitle: props => <><Icon type='font-awesome-5' name='vector-square' color='grey'/></>,
       }}/>
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [display, setDisplay] = useState(0);

  setTimeout(() => {
    setDisplay(1);
  }, 4000);
  if (display === 0) {
    return <Start />;
  } else if (display === 1) {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}
