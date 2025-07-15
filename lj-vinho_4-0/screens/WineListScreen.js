import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const WineListScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const [searchText, setSearchText] = useState('');

  // Filtrar favoritos baseado na busca
  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const handleRemoveFavorite = (item) => {
    removeFavorite(item.id);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { vinho: item })}>
      <Image source={{ uri: item.thumbnail.path }} style={styles.image} />
      
      {/* Status Badge */}
      <View style={styles.statusWrapper}>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: item.status === 'Disponivel' ? '#C6F6D5' : '#FED7D7',
              color: item.status === 'Disponivel' ? '#2F855A' : '#C53030',
            },
          ]}>
          {item.status}
        </Text>
      </View>

      {/* Favorite Button */}
      <Pressable 
        style={styles.favoriteButton}
        onPress={() => handleRemoveFavorite(item)}>
        <Ionicons name="heart" size={20} color="#F687B3" />
      </Pressable>

      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.marca}</Text>
      <Text style={styles.type}>{item.tipo}</Text>
      <Text style={styles.country}>🌍 From {item.pais}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>R$ {item.preco}</Text>
        <Text style={styles.score}>Critics' Scores: {item.score} / 100</Text>
        
        <View style={styles.actionButtons}>
          <Pressable 
            style={styles.cartButton}
            onPress={() => handleAddToCart(item)}>
            <Ionicons name="cart" size={16} color="white" />
            <Text style={styles.cartButtonText}>Carrinho</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const EmptyFavorites = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#640000" />
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptyText}>
        Adicione vinhos aos seus favoritos para vê-los aqui.
      </Text>
      <Pressable
        style={styles.shopButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopButtonText}>Explorar Vinhos</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Favoritos</Text>
        {favorites.length > 0 && (
          <View style={styles.favoritesCount}>
            <Text style={styles.favoritesCountText}>{favorites.length}</Text>
          </View>
        )}
      </View>

      {favorites.length > 0 ? (
        <>
          <TextInput 
            style={styles.search} 
            placeholder="Buscar nos favoritos..." 
            value={searchText}
            onChangeText={setSearchText}
          />
          
          <FlatList
            data={filteredFavorites}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <EmptyFavorites />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#640000',
    padding: 20,
    height: '22%',
    flexDirection: 'column',
    
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoritesCount: {
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  favoritesCountText: {
    color: '#640000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: '#FFF',
    padding: 12,
    margin: 16,
    borderRadius: 12,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  statusWrapper: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  status: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  type: {
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 2,
  },
  country: {
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#640000',
  },
  score: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#640000',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#640000',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  shopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WineListScreen;

