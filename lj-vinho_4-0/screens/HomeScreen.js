import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

import winesData from '../data/winesdata.json';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    setData(winesData);
  }, []);

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { vinho: item })}>
      <Image source={{ uri: item.thumbnail.path }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.tipo}</Text>
      <Text style={styles.country}>🌍 From {item.pais}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>R$ {item.preco}</Text>
        <Text style={styles.score}>Critics Scores: {item.score} / 100 </Text>
      </View>
      <Pressable 
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}>
        <Ionicons name="add" size={20} color="white" />
      </Pressable>
    </Pressable>
  );

  const ListaHorizontal = () => {
    return (
      <View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.cardHorizontal}
              onPress={() =>
                navigation.navigate('ProductDetail', { vinho: item })
              }>
              <Image
                source={{ uri: item.thumbnail.path }}
                style={styles.imageHorizontal}
              />
              <Text style={styles.titleHorizontal}>{item.name}</Text>
              <Text style={styles.subtitleHorizontal}>{item.tipo}</Text>
            </Pressable>
          )}
          contentContainerStyle={{ paddingHorizontal: 5}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem vindos!</Text>
      </View>

      <ListaHorizontal />

      <Text style={styles.verticalText}>Outras Opções</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'flex-end',
    backgroundColor: '#640000',
    padding: 16,
    alignItems: 'center',
    height: '25%',
  
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#640000',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#4A5568',
  },
  country: {
    fontSize: 12,
    color: '#4A5568',
    marginVertical: 2,
  },
  footer: {
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  score: {
    fontSize: 12,
    color: '#718096',
  },
  cardHorizontal: {
    margin: 16,
    backgroundColor: '#640000',
    marginRight: 0.25,
    borderRadius: 16,
    padding: 8,
    width: 140,
  },
  imageHorizontal: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  titleHorizontal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  subtitleHorizontal: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  verticalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
});

export default HomeScreen;


