import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button,CameraRoll } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';


export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let [image, multipleImage] = React.useState([]);
  
  let openImagePickerAsync = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
          return(<Text> Hello </Text>);
        }
        console.log(status,permissions)
      let result = await ImagePicker.launchCameraAsync({
        base64:true,
        //allowsEditing:true,
        aspect: [3, 4],
      });
      if (!result.cancelled) {
        setSelectedImage({ localUri: result.uri });
        multipleImage([
      ...image,
      {
        id: image.length,
        name: result.uri
      }
    ]);
      }
    console.log(image);
  }

  let openPdf = async() => {
    let x ="";
    image.map(item => { 
        x=x+"<img width='595px' height='842px' src='"+item.name+"'/>"
    });
     let file = await Print.printAsync({
       html: x
     }); 
    console.log(x);
    }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  };

  if (image.length!=0) {
    return (
      <View style={styles.container}>
        
         <TouchableOpacity onPress={async()=>await  openImagePickerAsync()} style={styles.button}>
          <Text style={styles.buttonText}>Take another photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async()=>await openPdf()} style={styles.button}>
          <Text style={styles.buttonText}>PDF Preview</Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View>
    <TouchableOpacity onPress={openImagePickerAsync()} style={styles.button}>
          <Text style={styles.buttonText}>Take another photo</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign:"center"
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});