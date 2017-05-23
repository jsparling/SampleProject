/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import sampleApi from "./SampleApi"

export default class SampleProject extends Component {
  constructor(props){
    super(props)

    this.state = {
      textToDisplay: "not set" // state value that will display API response
    }
  }

  // Action that is called when button is pressed
  retrieveData() {
    returnText = sampleApi.get()
    // returnText = 'jake'
    this.setState({textToDisplay: returnText})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>

        <Button
          onPress={() => this.retrieveData()}
          title="API request"
          color="#841584"
        />

        <Text>
          {this.state.textToDisplay}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SampleProject', () => SampleProject);
