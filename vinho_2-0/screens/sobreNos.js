import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';

const Sobre = ({voltar}) => (
    
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>{'\<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sobre Nós</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          Somos uma vinha familiar dedicada à produção de vinhos de alta qualidade.
          Nossa tradição remonta a várias gerações, cultivando as melhores uvas
          e aplicando técnicas de vinificação que respeitam a natureza e o terroir.
        </Text>
        <Text style={styles.text}>
          Nosso compromisso é trazer para a sua mesa vinhos que expressam a paixão
          e o cuidado que dedicamos em cada etapa do processo, da vinha à garrafa.
        </Text>

      </View>
    </ScrollView>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
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
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    marginTop: 70,
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default Sobre;