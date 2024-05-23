import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.touchable}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpKXwffMX-7zIJUjZv6k1ovjiCbhXWfM7DZ6mMGsLGA&s' }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>SHHH</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  touchable: {
    borderRadius: 20, 
    overflow: 'hidden', 
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20, 
  },
  text: {
    color: '#ffffff', 
    fontSize: 24, 
    marginTop: 20, 
    fontFamily: 'Times New Roman', 
  },
});

export default SplashScreen;
