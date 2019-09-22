import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import Bridgefy from 'react-native-bridgefy-sdk';


let deviceList = []

export function listen() {

  // const e = new NativeEventEmitter()
  // const = DeviceEventEmitter;

  const BleManagerModule = NativeModules.BleManager
  const e = new NativeEventEmitter(BleManagerModule)
  //
  // Message listeners
  //  

  // This event is launched when a message has been received, 
  // the `message` dictionary structure is explained in the appendix
  e.addListener('onMessageReceived', (message)=> {
    console.log('onMessageReceived: '+ JSON.stringify(message));
  });

  e.addListener('*', (message)=> {
    console.log('*: '+ JSON.stringify(message));
  });


  // This event is launched when a broadcast message has been received, the structure 
  // of the dictionary received is explained in the appendix.
  e.addListener('onBroadcastMessageReceived', (message)=> {
    console.log('onMessageReceived: '+ JSON.stringify(message));
  });

  // Justin's
  e.addListener('onBroadcastMessageSent', (message)=> {
    console.log('onBroadcastMessageSent: '+ JSON.stringify(message));
  });


  // This event is launched when a message could not be sent, it receives an error
  // whose structure will be explained in the appendix
  e.addListener('onMessageFailed', (error)=> {
    console.log('onMessageFailed: '+ error);
    console.log('code: ' + error.conde); // error code
    console.log('message' + error.message); // message object
    console.log('description' + error.description); // Error cause 
  });

  // This event is launched when a message was sent, contains the message
  // itself, and the structure of message is explained in the appendix.
  e.addListener('onMessageSent', (message)=> {
    console.log('onMessageSent: '+ JSON.stringify(message));
  });

  // This event is launched when a message was received but it contains errors, 
  // the structure for this kind of error is explained in the appendix.
  // This method is launched exclusively on Android.
  e.addListener('onMessageReceivedException', (error)=> {
    console.log('onMessageReceivedException: '+ error);
    console.log('sender: ' + error.sender); // User ID of the sender
    console.log('code: ' + error.code); // error code
    console.log('message' + error.message); // message object empty
    console.log('description' + error.description); // Error cause 
  });

  //
  // Device listeners
  //   

  // This event is launched when the service has been started successfully, it receives
  // a device dictionary that will be descripted in the appendix.
  e.addListener('onStarted', (device)=> {
    // For now, device is an empty dictionary
    console.log('onStarted', device)
  });

  // This event is launched when the Bridgefy service fails on the start, it receives
  // a dictionary (error) that will be explained in the appendix.
  e.addListener('onStartError', (error)=> {
    console.log('onStartError: '+ error);
    console.log('code: ' + error.conde); // error code
    console.log('description' + error.description); // Error cause 
  });

  // This event is launched when the Bridgefy service stops.
  e.addListener('onStopped', ()=> {
    console.log('onStopped');
  });

  // This method is launched when a device is nearby and has established connection with the local user.
  // It receives a device dictionary.
  e.addListener('onDeviceConnected', (device)=> {
    deviceList.push(device);
    console.log(device);
    var message = {
      content:{ 
        message: `Hello ${device.userId}`,
        language: "English"
      },
      receiver_id: device.userId,
    };
    Bridgefy.sendMessage(message)
    console.log('onDeviceConnected: ' + device.DeviceName + " size: " + deviceList.length);


  });
  // This method is launched when there is a disconnection of a user.
  e.addListener('onDeviceLost', (device)=> {
    console.log('onDeviceLost: ' + device);
  });

  // This is method is launched exclusively on iOS devices, notifies about certain actions like when
  // the bluetooth interface  needs to be activated, when internet is needed and others.
  e.addListener('onEventOccurred', (event)=> {
    console.log('Event code: ' + event.code + ' Description: ' + event.description);
  });

  // try emitting an event
  setTimeout(
    () => e.emit('onMessageReceived', 'abc'),
    1000
  )
}