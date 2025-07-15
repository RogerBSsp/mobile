import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { vinho } = route.params;
  const { addItem, isItemInCart, getItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('detalhes');

  const handleAddToCart = () => {
    addItem(vinho);
    Alert.alert(
      'Adicionado ao carrinho!',
      `${vinho.name} foi adicionado ao seu carrinho.`,
      [
        {
          text: 'Continuar comprando',
          style: 'cancel',
        },
        {
          text: 'Ver carrinho',
          onPress: () => navigation.navigate('Carinho'),
        },
      ]
    );
  };

  const handleToggleFavorite = () => {
    const isNowFavorite = toggleFavorite(vinho);
    Alert.alert(
      isNowFavorite ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!',
      isNowFavorite 
        ? `${vinho.name} foi adicionado aos seus favoritos.`
        : `${vinho.name} foi removido dos seus favoritos.`,
      [
        {
          text: 'OK',
          style: 'default',
        },
        ...(isNowFavorite ? [{
          text: 'Ver Favoritos',
          onPress: () => navigation.navigate('Favoritos'),
        }] : [])
      ]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detalhes':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Sobre o Vinho</Text>
            <Text style={styles.description}>
              {vinho.subTitulo || 'Um vinho excepcional com características únicas que proporcionam uma experiência sensorial incrível. Produzido com as melhores uvas selecionadas, este vinho apresenta um equilíbrio perfeito entre sabor, aroma e textura.'}
            </Text>
            
            <Text style={styles.sectionTitle}>Especificações</Text>
            <View style={styles.specContainer}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Tipo:</Text>
                <Text style={styles.specValue}>{vinho.tipo}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Marca:</Text>
                <Text style={styles.specValue}>{vinho.marca}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>País de Origem:</Text>
                <Text style={styles.specValue}>{vinho.pais}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Status:</Text>
                <Text style={[styles.specValue, { color: vinho.status === 'Disponivel' ? '#4CAF50' : '#F44336' }]}>
                  {vinho.status}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Pontuação:</Text>
                <Text style={styles.specValue}>{vinho.score}/100</Text>
              </View>
            </View>
          </View>
        );
      
      case 'avaliacoes':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Avaliações dos Clientes</Text>
            <View style={styles.ratingOverview}>
              <View style={styles.ratingScore}>
                <Text style={styles.ratingNumber}>{(vinho.score / 20).toFixed(1)}</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.round(vinho.score / 20) ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>Baseado em avaliações de especialistas</Text>
              </View>
            </View>
            
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>João Silva</Text>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={14} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                Excelente vinho! Sabor equilibrado e aroma marcante. Recomendo para ocasiões especiais.
              </Text>
              <Text style={styles.reviewDate}>Há 2 semanas</Text>
            </View>
            
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>Maria Santos</Text>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4].map((star) => (
                    <Ionicons key={star} name="star" size={14} color="#FFD700" />
                  ))}
                  <Ionicons name="star-outline" size={14} color="#FFD700" />
                </View>
              </View>
              <Text style={styles.reviewText}>
                Muito bom! Ótimo custo-benefício. Chegou bem embalado e dentro do prazo.
              </Text>
              <Text style={styles.reviewDate}>Há 1 mês</Text>
            </View>

            <Pressable 
              style={styles.viewAllCommentsButton}
              onPress={() => navigation.navigate('Comments', { vinho })}>
              <Text style={styles.viewAllCommentsText}>Ver todos os comentários</Text>
              <Ionicons name="arrow-forward" size={16} color="#640000" />
            </Pressable>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <Pressable style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Ionicons 
            name={isFavorite(vinho.id) ? "heart" : "heart-outline"} 
            size={24} 
            color="white" 
          />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: vinho.thumbnail.path }} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{vinho.name}</Text>
          <Text style={styles.productBrand}>{vinho.marca}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R$ {vinho.preco}</Text>
            <View style={styles.scoreContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.score}>{vinho.score}/100</Text>
            </View>
          </View>
          
          {/* Status Badge */}
          <View style={[
            styles.statusBadge, 
            { backgroundColor: vinho.status === 'Disponivel' ? '#E8F5E8' : '#FFEBEE' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: vinho.status === 'Disponivel' ? '#4CAF50' : '#F44336' }
            ]}>
              {vinho.status}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'detalhes' && styles.activeTab]}
            onPress={() => setActiveTab('detalhes')}>
            <Text style={[styles.tabText, activeTab === 'detalhes' && styles.activeTabText]}>
              Detalhes
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'avaliacoes' && styles.activeTab]}
            onPress={() => setActiveTab('avaliacoes')}>
            <Text style={[styles.tabText, activeTab === 'avaliacoes' && styles.activeTabText]}>
              Avaliações
            </Text>
          </Pressable>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
        
        {/* Spacing for bottom button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        {vinho.status === 'Disponivel' ? (
          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart" size={20} color="white" />
            <Text style={styles.addToCartText}>
              {isItemInCart(vinho.id) 
                ? `No carrinho (${getItemQuantity(vinho.id)})` 
                : 'Adicionar ao Carrinho'
              }
            </Text>
          </Pressable>
        ) : (
          <View style={styles.unavailableButton}>
            <Text style={styles.unavailableText}>Produto Indisponível</Text>
          </View>
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 32,
  },
  productImage: {
    width: width * 0.6,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  productInfo: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#640000',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57F17',
    marginLeft: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#640000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#640000',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  specContainer: {
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  specLabel: {
    fontSize: 16,
    color: '#666',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  ratingOverview: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  ratingScore: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#640000',
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  bottomContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addToCartButton: {
    backgroundColor: '#640000',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  unavailableButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  unavailableText: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllCommentsButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#640000',
  },
  viewAllCommentsText: {
    color: '#640000',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default ProductDetailScreen;

