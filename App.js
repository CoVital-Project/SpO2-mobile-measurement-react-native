import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState('off');
  const [autoFocus, setAutoFocus] = useState('off');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  console.log(Camera.Constants.AutoFocus);

  const toggleFlash = () => setFlash(flash === 'off' ? 'torch' : 'off');
  const toggleAutoFocus = () => setAutoFocus(autoFocus === 'off' ? 'on' : 'off');

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <Camera style={{ height: 300 }} type={type} flashMode={flash} autoFocus={autoFocus}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#aaa',
        marginTop: 30,
        height: 500
        }
      }>
        <Button onPress={toggleFlash} title="Toggle flash" />
        <Button onPress={toggleAutoFocus} title="Toggle auto-focus" />
      </View>
    </View>
  );
}