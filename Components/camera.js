import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Button,CameraRoll } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icon} from 'react-native-elements';



export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let [image, multipleImage] = React.useState([]);
  let [i, imageSet] = React.useState(null);
  let [v, viewModal] = React.useState(false);
  
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
        x=x+"<img width='720px' height='942px' src='"+item.name+"'/>"
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
      <ScrollView  style={styles.container}>

    <View style={styles.imageview}>
      {image.map((i, index) => {
        return <Image key={index} onPress={()=>{viewModal(true);imageSet(i.name)}} source={{ uri: i.name }} style={styles.image} />;
      })}
    </View>

      <View style={styles.buttonview}> 
         <Icon
                raised
                name='camera'
                size={30}
                type='font-awesome'
                color='dodgerblue'
                onPress={async()=>await  openImagePickerAsync()} />
         <Icon
                raised
                name='file-pdf-o'
                size={30}
                type='font-awesome'
                color='dodgerblue'
                onPress={async()=>await openPdf()} />
     
      </View>

      <Modal visible={v} transparent={true}>
                <ImageViewer imageUrls={[{url:i}]}/>
      </Modal>

      </ScrollView>
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
    backgroundColor: 'black',
    padding: 20,
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    color: '#008f68',
    fontSize: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  imageview:{
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-between',
    flexWrap:'wrap',
    padding:10,
  },
  buttonview:{
    flexDirection:'row',
    bottom:0,
    justifyContent:'center',
    flex:1,
    
  }
});

