import { PermissionsAndroid } from 'react-native';

// copy pasta: https://facebook.github.io/react-native/docs/permissionsandroid
async function request(permission) {
  try {
    const granted = await PermissionsAndroid.request(
      permission,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
console.log('permissions', PermissionsAndroid.PERMISSIONS)

export async function requestAll() {
  console.log(PermissionsAndroid.PERMISSIONS)
  await request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  // await request(PermissionsAndroid.PERMISSIONS.BLUETOOTH)
  // await request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN)
  // await request(PermissionsAndroid.PERMISSIONS.INTERNET)
}