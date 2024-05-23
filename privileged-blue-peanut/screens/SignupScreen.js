import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignupScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Recuperar o nickname armazenado
    AsyncStorage.getItem('nickname').then((value) => {
      if (value) {
        setNickname(value);
      }
    });
  }, []);

  function handleSignup() {
    // Salvar o nickname no AsyncStorage
    AsyncStorage.setItem('nickname', nickname);

    // Aqui você pode adicionar lógica para lidar com o cadastro do usuário
    // Por exemplo, enviar os dados para o backend ou armazená-los localmente

    // Após o cadastro, você pode redirecionar o usuário para a tela de login
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        placeholderTextColor="#cc0000"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        placeholderTextColor="#cc0000"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#cc0000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#cc0000"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Cadastrar" color="#cc0000" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#cc0000',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#cc0000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#cc0000'
  },
});

export default SignupScreen;
