import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'flex-end', 
  },
  message: {
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    maxWidth: '70%',
  },
});

export default Message;