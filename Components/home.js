import React from 'react';
import { Platform,TouchableOpacity,View, Text ,ImageBackground, StyleSheet, Image} from 'react-native';
import { useFonts, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import {Icon, Card, Button, colors, ThemeProvider } from 'react-native-elements';

import image from '../Config/images.js'


export default function App(props) {
  let [fontsLoaded] = useFonts({Inter_200ExtraLight})

  return (

      <ImageBackground style={styles.container}>

            <View style={styles.row}>
              <Icon
                raised
                name='camera'
                type='font-awesome'
                color='dodgerblue'
                onPress={()=>props.navigation.navigate("Camera")} />

              <Icon
                raised
                name='collections'
                color='dodgerblue'
                onPress={()=>props.navigation.navigate("Gallery")} />
                
              </View>
                
              
              <Text style={styles.text}>DocScam</Text>
              
                
              
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
   
    container: {
      flex: 1,
      resizeMode: "cover",
      justifyContent:"center",
      alignItems:"center",
    },
    row:{
      flexDirection: 'row',
    },
    
    text: {
      top:20,
      fontFamily: 'Inter_200ExtraLight',
      fontSize:50
    }, 
  
  });