import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatScreen from './components/ChatScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <ChatScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});