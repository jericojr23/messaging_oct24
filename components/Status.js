import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Text, Pressable, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';

const initialMessages = [
 { id: '1', text: 'Hello!' },
 { id: '2', text: 'No network connection!' },
 // Add more initial messages as needed
];

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

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

const ChatScreen = () => {
 const [messages, setMessages] = useState(initialMessages);
 const [newMessage, setNewMessage] = useState('');
 const [isConnected, setIsConnected] = useState(true); // Assume connected initially

 const handleSendMessage = () => {
   if (!isConnected) {
     console.log('Message sending failed: No network connection');
     return;
   }

   if (newMessage.trim() !== '') {
     const updatedMessages = [...messages, { id: String(messages.length + 1), text: newMessage }];
     setMessages(updatedMessages);
     setNewMessage('');
   }
 };

 useEffect(() => {
   // Simulate network connectivity changes
   const networkChangeHandler = () => {
     setIsConnected(navigator.onLine); // Update isConnected based on online/offline status
   };

   // Listen for online/offline events
   window.addEventListener('online', networkChangeHandler);
   window.addEventListener('offline', networkChangeHandler);

   return () => {
     // Remove event listeners on component unmount
     window.removeEventListener('online', networkChangeHandler);
     window.removeEventListener('offline', networkChangeHandler);
   };
 }, []);

 return (
   <View style={styles.container}>
     <View style={styles.status}>
       <Pressable onPress={() => console.log('Pressed!')}>
         {({ pressed }) => (
           <View style={[styles.messageContainer, pressed && { opacity: 0.5 }]}>
             <StatusBar
               backgroundColor={isConnected ? 'white' : 'red'}
               barStyle={isConnected ? 'dark-content' : 'light-content'}
               animated={false}
             />
             {!isConnected && (
               <View style={styles.bubble}>
                 <Text style={styles.text}>No network connection</Text>
               </View>
             )}
           </View>
         )}
       </Pressable>
     </View>

     <FlatList
       data={messages}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
         <View style={styles.messageContainer}>
           <View style={styles.bubble}>
             <Text style={styles.text}>{item.text}</Text>
           </View>
         </View>
       )}
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

export default ChatScreen;