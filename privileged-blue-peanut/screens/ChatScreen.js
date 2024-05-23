import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const initialMessages = {
  'Mulher 1': [
    { id: '1', text: 'Oi, tudo bem?', sender: 'them' },
    { id: '2', text: 'Qual é o seu nome?', sender: 'them' },
  ],
  'Mulher 2': [
    { id: '1', text: 'Olá, como vai?', sender: 'them' },
    { id: '2', text: 'Você é de onde?', sender: 'them' },
  ],
  'Mulher 3': [
    { id: '1', text: 'Oi! Adorei sua foto.', sender: 'them' },
    { id: '2', text: 'Quer conversar?', sender: 'them' },
  ],
};

function ChatScreen({ route }) {
  const { name } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  function sendMessage() {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const responses = initialMessages[name];
      if (responses.length > messages.filter(msg => msg.sender === 'them').length) {
        const response = responses[messages.filter(msg => msg.sender === 'them').length];
        setMessages([...messages, newMessage, response]);
      } else {
        setMessages([...messages, newMessage]);
      }
    }, 1000);

    setInputText('');
  }

  function renderItem({ item }) {
    const messageStyle = item.sender === 'me' ? styles.myMessage : styles.theirMessage;
    return (
      <View style={messageStyle}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
        />
        <Button title="Enviar" color="#cc0000" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffcccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff9999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
