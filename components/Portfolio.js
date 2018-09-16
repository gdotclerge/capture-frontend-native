import React from 'react';
import { StyleSheet, Text, View, Button, Alert, CameraRoll, Image, TouchableHighlight } from 'react-native';

export default class Portfolio extends React.Component {
  state = {
    photo: null,
    photos: []
  }


  render() {
    if (this.state.photos.length === 0){
      return (
        <View style={styles.container}>
          <Button title="Click Me!"  onPress={() => {
            Alert.alert(
              'Alert Title',
              'My Alert Msg',
              [
                {text: 'Ask me later', onPress: () => CameraRoll.getPhotos({first: 10, assetType: "Photos"})
                .then((resp)=> {
                  this.setState({
                    photo: resp.edges[0].node.image.uri,
                    photos: resp.edges
                  })
                  console.log(resp.edges[0].node.image.uri);
                })
              },
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
           }}/>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          {!!this.state.photo ? <Image source={{uri: this.state.photo }} style={{width: 100, height: 100}} /> : null}
        </View>
      )
    } else {
      return (
        <View>
          {this.showImages()}
        </View>
      )
    }
  }

  showImages() {
    return this.state.photos.map((p)=>{
      return (<TouchableHighlight onPress={()=>{console.log("YOOOOOOOOO")}} >
              <Image source={{uri: p.node.image.uri }} style={{width: 100, height:100}} />
              </TouchableHighlight>)
    })
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
