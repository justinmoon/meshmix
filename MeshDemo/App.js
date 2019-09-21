/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { listen } from './mesh'
import { requestBluetoothPermissions } from './permissions'

//import {
  //...
  //DeviceEventEmitter,
  //...
//} from 'react-native';

import Bridgefy from 'react-native-bridgefy-sdk';

function registerBridgefy() {
    Bridgefy.init("5e519275-d471-4524-a36a-397a6ba8d27c",
    (errorCode, message)=>{
      console.log('bridgefy error:', errorCode + ":" + message);
    },
    (client) => {
      console.log('bridgefy success:', client);
      
      // start bridgely
      Bridgefy.start()

      // broadcast to others
      var message = {
        content:{ 
          message:"Hello world!!"
        }
      };
      Bridgefy.sendBroadcastMessage(message)
      
      // register listeners
      listen()
      
    }
  );
}

class App extends React.Component {

  componentWillMount() {
    // request permissions
    requestBluetoothPermissions()
    // start bridgefy
    registerBridgefy()
  }
  render () {
    return (
      <View>
        <Text>
          Hello, world!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
