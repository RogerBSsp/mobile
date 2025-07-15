import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AvaliacoesScreen = ({ voltar }) => {
  const avaliacoesTinto = [
    {
      nomeUsuario: 'Jonathan Callery',
      classificacao: 5,
      titulo: 'Otimo vinho',
      comentario:
        "Vinho de corpo leve a médio, com aromas delicados de frutas frescas e toques florais Na boca, apresenta boa acidez e equilíbrio, ideal para momentos descontraídos.Final suave e prazeroso, que convida ao próximo gole.",
    },
    {
      nomeUsuario: 'Robert Arboleda',
      classificacao: 4,
      titulo: 'Bom vinho',
      comentario: 'Refrescante, equilibrado e fácil de apreciar, com notas sutis de frutas e final agradável..',
    },
  ];

  const renderEstrelas = (classificacao) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <FontAwesome
          key={i}
          name={i <= classificacao ? 'star' : 'star-o'}
          size={20}
          color="#800080"
        />
      );
    }
    return <View style={styles.estrelasContainer}>{estrelas}</View>;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>{'\<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Avaliações</Text>
        <View style={{ width: 30 }} />
      </View>

      {avaliacoesTinto.map((avaliacao) => (
        <View key={avaliacao.id} style={styles.reviewCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{avaliacao.nomeUsuario}</Text>
          </View>
          {renderEstrelas(avaliacao.classificacao)}
          {avaliacao.titulo && (
            <Text style={styles.reviewTitle}>{avaliacao.titulo}</Text>
          )}
          <Text style={styles.reviewText}>{avaliacao.comentario}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 70,
    alignItems: 'center',
    alignContent: 'center'
  },

  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  estrelasContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AvaliacoesScreen;