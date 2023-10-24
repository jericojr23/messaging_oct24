import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native';
import Constants from 'expo-constants';

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

const Status = () => {
  const info = 'wifi'; // Change this to simulate network status change
  const isConnected = info !== 'none';
  const backgroundColor = isConnected ? 'white' : 'red';

  const handlePress = () => {
    // Handle press event
    console.log('Pressed!');
  };

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View style={[styles.messageContainer, pressed && { opacity: 0.5 }]}>
          {statusBar}
          {!isConnected && (
            <View style={styles.bubble}>
              <Text style={styles.text}>No network connection</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }

  return messageContainer;
};

export default Status;