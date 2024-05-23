import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const cards = [
  { name: 'Mulher 1', age: 25, bio: 'Bio da Mulher 1: Preço do programa, idade, etc.', image: 'https://live.staticflickr.com/3112/2690807886_914dbf2de9_z.jpg', location: { lat: -23.55052, lng: -46.633308 } },
  { name: 'Mulher 2', age: 28, bio: 'Bio da Mulher 2: Preço do programa, idade, etc.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8I3W4GBgc2TO6tVHCKhemZQil-RNLyPkg9hKTMYwbXA&s', location: { lat: -23.557, lng: -46.649 } },
  { name: 'Mulher 3', age: 22, bio: 'Bio da Mulher 3: Preço do programa, idade, etc.', image: 'https://live.staticflickr.com/5515/14086980992_9cc1eaf342_b.jpg', location: { lat: -23.560, lng: -46.636 } },
];

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; 
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function Card({ card }) {
  return (
    <ImageBackground source={{ uri: card.image }} style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{card.name}, {card.age}</Text>
        <Text style={styles.distance}>{card.distance} km de você</Text>
      </View>
    </ImageBackground>
  );
}

function SwipeScreen({ navigation }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [noMoreCards, setNoMoreCards] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState(cards);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const calculatedDistances = cards.map(card => {
        const distance = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, card.location.lat, card.location.lng);
        return { ...card, distance: distance.toFixed(2) };
      });
      setDistances(calculatedDistances);
    }
  }, [userLocation]);

  function handleYup(card) {
    navigation.navigate('Chat', { name: card.name });
    handleNope();
  }

  function handleNope() {
    const newIndex = cardIndex + 1;
    if (newIndex >= distances.length) {
      setNoMoreCards(true);
    } else {
      setCardIndex(newIndex);
    }
  }

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={distances}
        renderCard={(cardData) => <Card card={cardData} />}
        handleYup={handleYup}
        handleNope={handleNope}
        renderNoMoreCards={() => (
          noMoreCards ? <Text>No women available</Text> : null
        )}
        showYup={false}
        showNope={false}
      />
      {!noMoreCards && (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{distances[cardIndex]?.name}, {distances[cardIndex]?.age}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="times" size={50} color="red" onPress={handleNope} />
            <Icon name="check" size={50} color="green" onPress={() => handleYup(distances[cardIndex])} />
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{distances[cardIndex]?.bio}</Text>
          </View>
        </>
      )}
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
  card: {
    width,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: 'white',
  },
  distance: {
    fontSize: 18,
    color: 'white',
  },
  bioContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  bioText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    position: 'absolute',
    bottom: 120,
  },
});

export default SwipeScreen;
