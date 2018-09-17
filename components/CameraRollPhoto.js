import React from 'react';
import {
  StyleSheet,
  View,
  CameraRoll,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window')

export default class CameraRollPhoto extends React.Component {

  render() {
    const { photo } = this.props
    if (photo.selected){
      console.log("SELECTED")
    } else {
      console.log("NOT SELECTED");
    }


    return (
      <TouchableHighlight onPress={(event)=> {this.props.handlePhotoSelect(photo)}} >
        <Image source={{uri: photo.node.image.uri }} style={ photo.selected ? styles.imageSel : styles.cameraRollImage} />
      </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  cameraRollImage: {
    width: width/2-20,
    height: width/2-20,
    margin: 10,
  },
  imageSel: {
    width: width/2-20,
    height: width/2-20,
    margin: 10,
    borderStyle: "solid",
    borderWidth: 5,
  }
})
