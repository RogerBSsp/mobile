import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import winesData from '../data/winesdata.json';

const { width } = Dimensions.get('window');

const WineCatalogScreen = ({ navigation }) => {
  const [wines, setWines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredWines, setFilteredWines] = useState([]);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const wineCategories = [
    {
      id: 'all',
      name: 'Todos',
      icon: 'wine-outline',
      color: '#640000',
      filter: () => true,
    },
    {
      id: 'red',
      name: 'Tintos',
      icon: 'wine',
      color: '#8B0000',
      filter: (wine) => wine.tipo.toLowerCase().includes('red') || wine.tipo.toLowerCase().includes('tinto'),
    },
    {
      id: 'white',
      name: 'Brancos',
      icon: 'wine-outline',
      color: '#FFD700',
      filter: (wine) => wine.tipo.toLowerCase().includes('white') || wine.tipo.toLowerCase().includes('branco'),
    },
    {
      id: 'rose',
      name: 'Rosés',
      icon: 'wine',
      color: '#FF69B4',
      filter: (wine) => wine.tipo.toLowerCase().includes('rose') || wine.tipo.toLowerCase().includes('rosé'),
    },
    {
      id: 'sparkling',
      name: 'Espumantes',
      icon: 'wine',
      color: '#4169E1',
      filter: (wine) => wine.tipo.toLowerCase().includes('sparkling') || wine.tipo.toLowerCase().includes('espumante'),
    },
  ];

  useEffect(() => {
    setWines(winesData);
    setFilteredWines(winesData);
  }, []);

  useEffect(() => {
    const category = wineCategories.find(cat => cat.id === selectedCategory);
    if (category) {
      const filtered = wines.filter(category.filter);
      setFilteredWines(filtered);
    }
  }, [selectedCategory, wines]);

  const handleAddToCart = (wine) => {
    addItem(wine);
  };

  const handleToggleFavorite = (wine) => {
    toggleFavorite(wine);
  };

  const renderCategoryItem = ({ item: category }) => (
    <Pressable
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategoryCard,
        { borderColor: category.color }
      ]}
      onPress={() => setSelectedCategory(category.id)}>
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Ionicons 
          name={category.icon} 
          size={24} 
          color="white" 
        />
      </View>
      <Text style={[
        styles.categoryName,
        selectedCategory === category.id && styles.selectedCategoryName
      ]}>
        {category.name}
      </Text>
      <Text style={styles.categoryCount}>
        {category.id === 'all' 
          ? wines.length 
          : wines.filter(category.filter).length
        } vinhos
      </Text>
    </Pressable>
  );

  const renderWineItem = ({ item: wine }) => (
    <Pressable
      style={styles.wineCard}
      onPress={() => navigation.navigate('ProductDetail', { vinho: wine })}>
      <Image source={{ uri: wine.thumbnail.path }} style={styles.wineImage} />
      
      {/* Status Badge */}
      <View style={styles.statusWrapper}>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: wine.status === 'Disponivel' ? '#C6F6D5' : '#FED7D7',
              color: wine.status === 'Disponivel' ? '#2F855A' : '#C53030',
            },
          ]}>
          {wine.status}
        </Text>
      </View>

      {/* Favorite Button */}
      <Pressable 
        style={styles.favoriteButton}
        onPress={() => handleToggleFavorite(wine)}>
        <Ionicons 
          name={isFavorite(wine.id) ? "heart" : "heart-outline"} 
          size={20} 
          color={isFavorite(wine.id) ? "#F687B3" : "#666"} 
        />
      </Pressable>

      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineBrand}>{wine.marca}</Text>
        <Text style={styles.wineType}>{wine.tipo}</Text>
        <Text style={styles.wineCountry}>🌍 {wine.pais}</Text>
        
        <View style={styles.wineFooter}>
          <View style={styles.priceSection}>
            <Text style={styles.winePrice}>R$ {wine.preco}</Text>
            <View style={styles.scoreContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.wineScore}>{wine.score}/100</Text>
            </View>
          </View>
          
          <Pressable 
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(wine)}>
            <Ionicons name="cart" size={16} color="white" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const getSelectedCategoryInfo = () => {
    return wineCategories.find(cat => cat.id === selectedCategory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Vinhos</Text>
        <Text style={styles.headerSubtitle}>Explore nossa seleção por categoria</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <FlatList
            data={wineCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>
              {getSelectedCategoryInfo()?.name}
            </Text>
            <Text style={styles.resultsCount}>
              {filteredWines.length} {filteredWines.length === 1 ? 'vinho' : 'vinhos'}
            </Text>
          </View>

          {filteredWines.length > 0 ? (
            <FlatList
              data={filteredWines}
              renderItem={renderWineItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.wineRow}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="wine-outline" size={60} color="#666" />
              <Text style={styles.emptyTitle}>Nenhum vinho encontrado</Text>
              <Text style={styles.emptyText}>
                Não há vinhos disponíveis nesta categoria no momento.
              </Text>
            </View>
          )}
        </View>
        
        {/* Spacing for bottom navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    backgroundColor: '#640000',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 4,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedCategoryCard: {
    borderColor: '#640000',
    backgroundColor: '#FFF5F5',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedCategoryName: {
    color: '#640000',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  resultsSection: {
    padding: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  wineRow: {
    justifyContent: 'space-between',
  },
  wineCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: (width - 48) / 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  wineImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  statusWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  status: {
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  wineInfo: {
    flex: 1,
  },
  wineName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    numberOfLines: 2,
  },
  wineBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  wineType: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  wineCountry: {
    fontSize: 10,
    color: '#888',
    marginBottom: 8,
  },
  wineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSection: {
    flex: 1,
  },
  winePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#640000',
    marginBottom: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wineScore: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  addToCartButton: {
    backgroundColor: '#640000',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default WineCatalogScreen;

