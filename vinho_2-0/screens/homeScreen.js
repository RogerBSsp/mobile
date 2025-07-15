import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Perfil from './perfilScreen';

const HomeScreen = ({ irParaDetalhe }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity style={styles.topButton} onPress={() => irParaDetalhe('Perfil')}>
              <Text style={styles.topButtonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topButton} onPress={() => irParaDetalhe('Sobre')}>
              <Text style={styles.topButtonText}>Sobre nós</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.welcome}>Bem-vindo a adega Fortune Vine !</Text>

        <View style={styles.categories}>
          <Text style={styles.categoryText}>Vinhos</Text>
        </View>

        <View style={styles.featuredContainer}>
          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Vinho Tinto</Text>
            <Text style={styles.productDesc}>Um vinho tinto para sua mesa</Text>
            <Image source={require('../assets/Home/tinto.png')} style={styles.productImage} />
            <TouchableOpacity style={styles.viewButton} onPress={() => irParaDetalhe('Tinto')}>
              <Text style={styles.viewButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Espumante</Text>
            <Text style={styles.productDesc}>Um espumante para celebrar</Text>
            <Image source={require('../assets/Home/champ.png')} style={styles.productImage} />
            <TouchableOpacity style={styles.viewButton} onPress={() => irParaDetalhe('Espumante')}>
              <Text style={styles.viewButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Vinho Rosé</Text>
            <Text style={styles.productDesc}>Um vinho leve e refrescante </Text>
            <Image source={require('../assets/Home/rose.png')} style={styles.productImage} />
            <TouchableOpacity style={styles.viewButton} onPress={() => irParaDetalhe('Rose')}>
              <Text style={styles.viewButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productCard}>
            <Text style={styles.productTitle}>Vinho Branco</Text>
            <Text style={styles.productDesc}>Um vinho para frutos do mar</Text>
            <Image source={require('../assets/Home/branco.png')} style={styles.productImage} />
            <TouchableOpacity style={styles.viewButton} onPress={() => irParaDetalhe('Branco')}>
              <Text style={styles.viewButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#f0f0f0', padding: 12 },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'gold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    alignSelf: 'center' 
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20, 
  },
 topButton: {
  backgroundColor: 'gold',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 5,
  marginHorizontal: 0,
  flex: 1,
  marginRight: 5,
  marginLeft: 5,

  shadowColor: '#750404', 
  shadowOffset: { width: 3, height: 5 },
  shadowOpacity: 1,
  shadowRadius: 4,
  elevation: 7, 
 },
 topButtonText: {
  color: '#000',
  fontWeight: 'bold',
  textAlign: 'center'
 },
 welcome: {
   fontSize: 19,
   color: '#404040',
   marginVertical: 10,
   textAlign: 'center' 
 },
  categories: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#750404',
    paddingVertical: 10,
    borderRadius: 10,
  },
  categoryText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  featuredContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  productCard: {
    backgroundColor: '#660000',
    width: '49%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  productTitle: { color: 'gold', fontSize: 18, fontWeight: 'bold' },
  productDesc: { color: '#fff', marginBottom: 10, textAlign: 'center' },
  productImage: { width: 100, height: 120, resizeMode: 'contain', marginBottom: 10 },
  viewButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 5,
    width: '100', 
    height: '30', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  viewButtonText: { color: '#000', fontWeight: 'bold',  },
});

export default HomeScreen;