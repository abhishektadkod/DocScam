import React from 'react';
import { ActivityIndicator,View, Text ,ImageBackground, StyleSheet, Image} from 'react-native';
import { useFonts, Inter_200ExtraLight } from '@expo-google-fonts/inter';

import image from '../Config/images.js'


export default function App() {
  let [fontsLoaded] = useFonts({Inter_200ExtraLight})

  return (

      <ImageBackground  style={styles.image}>
          <View style={styles.view}>
            <Image source={image.logo} style={styles.logo}/>
            {fontsLoaded?(<><Text style={styles.text}>Turn your IOS/Android device into</Text><Text style={{top:20}}>A PORTABLE SCANNER</Text></>):<Text>....</Text>}
           <ActivityIndicator style={{top:70}} size="large" color="#ffffff"/>
         
          </View>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"dodgerblue"
    },
    view:{
        position:"absolute" ,
        alignItems:"center"
    },
    text: {
      top:20,
      fontFamily: 'Inter_200ExtraLight',
      fontSize:20
    }, 
    logo:{
        top:-20,
        width:200,
        height:200
    },
  });