import React from 'react';
import CameraRollPhoto from './CameraRollPhoto';

import {
  StyleSheet,
  View,
  Button,
  CameraRoll,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window')


export default class MyCameraRoll extends React.Component {
  state = {
    photos: [],
    selectedPhotos: []
  }

  render() {
    if (this.state.photos.length === 0){
      return (
        <View style={styles.container}>
          <Button title="Get My Photos!"  onPress={this.getPhotos}/>
        </View>
      )
    } else {
      return (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.showImages()}
        </ScrollView>
      )
    }
  }

  getPhotos = () => {
    CameraRoll.getPhotos({first: 30, assetType: "Photos"})
        .then((resp)=> {
          this.setState({
            photo: resp.edges[0].node.image.uri,
            photos: resp.edges
          })
        })
  }

  showImages() {
    return this.state.photos.map((p) => <CameraRollPhoto photo={p} handlePhotoSelect={this.handlePhotoSelect}/>)
  }

  handlePhotoSelect = (photo) => {
    if (this.state.selectedPhotos.includes(photo)){
      photo.selected = false
      let index = this.state.selectedPhotos.indexOf(photo)
      let array = [...this.state.selectedPhotos]
      array.splice(index, 1)
      this.setState({
        selectedPhotos: array
      })
    } else {
      photo.selected = true
      this.setState({
        selectedPhotos: [...this.state.selectedPhotos, photo]
      })
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
   flexWrap: 'wrap',
   flexDirection: 'row',
 },

   cameraRollImage: {
    width: width/2-20,
    height: width/2-20,
    margin: 10,
  },
});
