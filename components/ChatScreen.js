import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import Message from './Message';
import Status from './Status'; 

const initialMessages = [
  { id: '1', text: 'Hello!' },
  { id: '2', text: 'Hey there!' },
 
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { id: String(messages.length + 1), text: newMessage }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Status /> {"Messaging App"}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message text={item.text} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ChatScreen;