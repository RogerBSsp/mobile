import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DetalheEspumanteScreen = ({ voltar, navegarParaAvaliacoes }) => (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={voltar}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Detalhe do Vinho</Text>
      <View style={{ width: 30 }} />
    </View>

    <View style={styles.wineCard}>
      <View style={styles.wineImageContainer}>
        <Image
          source={require('../assets/Home/champ.png')}
          style={styles.wineImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>Champagne Brut Impérial</Text>
        <Text style={styles.wineDetails}>Espumante elegante e sofisticado</Text>
        <Text style={styles.wineOrigin}>FR- Champagne</Text>
      </View>

      <View style={styles.priceRatingContainer}>
        <View style={styles.priceUnitContainer}>
          <Text style={styles.winePrice}>R$ 349.90</Text>
          <Text style={styles.winePriceUnit}>Garrafa (750ml)</Text>
        </View>
        <View style={styles.ratingReviewsContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              Crítica: <Text style={styles.ratingValue}>93</Text> / 100
            </Text>
          </View>
          <TouchableOpacity style={styles.reviewsButton} onPress={navegarParaAvaliacoes}>
            <Text style={styles.reviewsButtonText}>Ver Avaliações</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#4a0000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#4a0000',
    paddingBottom: 10,
  },
  backButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 70,
  },
  wineCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  wineImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  wineImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  wineInfo: {
    marginBottom: 10,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  wineDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  wineOrigin: {
    fontSize: 14,
    color: '#555',
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceUnitContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  winePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  winePriceUnit: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
  ratingReviewsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    marginRight: 5,
  },
  ratingValue: {
    fontWeight: 'bold',
    color: '#4a0000',
  },
  reviewsButton: {
    backgroundColor: 'gold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  reviewsButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buyButton: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetalheEspumanteScreen;