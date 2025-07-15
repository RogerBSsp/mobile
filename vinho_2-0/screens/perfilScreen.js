import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
 
 
const PerfilScreen = ({voltar}) => (
 
    <View style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>{'\<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Fortune Vine</Text>
        <View style={{ width: 30 }} />
      </View>
 
      <View style={styles.profileBox}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }} // Ícone substituto
          style={styles.profileImage}
        />
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value="Rhaenyra T. dos Santos"
          editable={false}
        />
        <Text style={styles.label}>Endereço de Entrega</Text>
        <TextInput
          style={styles.input}
          value="R. Carlos de Carvalho, 200"
          editable={false}
        />
        <Text style={styles.label}>E-mail Cadastrado</Text>
        <TextInput
          style={styles.input}
          value="rhaenyra.targaryen20@gmail.com"
          editable={false}
        />
        <TouchableOpacity onPress={() => Alert.alert('Senha', 'Alterar senha...')}>
          <Text style={styles.changePassword}>🔑 Alterar Senha</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Tipo de Pagamento</Text>
        
      </View>
 
    </View>
 
 
);
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    backgroundColor: '#640000',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
   backButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  icons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
  },
  profileBox: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    borderColor: '#640000',
    borderWidth: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: '#640000',
    borderWidth: 2,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#640000',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    backgroundColor: '#f8f8f8',
  },
  changePassword: {
    color: '#640000',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
 
export default PerfilScreen;