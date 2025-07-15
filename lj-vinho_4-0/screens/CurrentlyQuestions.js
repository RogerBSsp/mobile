// Atualizado remover essa tela
//import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Pressable,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const pedidos = [
//   {
//     id: '001',
//     data: '2025-06-01',
//     status: 'Entregue',
//     total: 'R$ 89,90',
//   },
//   {
//     id: '002',
//     data: '2025-05-20',
//     status: 'Em transporte',
//     total: 'R$ 129,50',
//   },
//   {
//     id: '003',
//     data: '2025-05-10',
//     status: 'Cancelado',
//     total: 'R$ 49,99',
//   },
// ];

// const CurrentlyQuestions = ({ navigation }) => {
//   const renderPedido = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
//       <Text style={styles.pedidoInfo}>Data: {item.data}</Text>
//       <Text style={styles.pedidoInfo}>Status: {item.status}</Text>
//       <Text style={styles.pedidoTotal}>Total: {item.total}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#640000" barStyle="light-content" />
//       <View style={styles.header}>
//         <Pressable onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Meus Pedidos</Text>
//       </View>
//       <FlatList
//         data={pedidos}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPedido}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF5F5',
//   },
//   header: {
//     backgroundColor: '#640000',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingBottom: 16,
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 12,
//   },
//   listContent: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   pedidoId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#640000',
//     marginBottom: 4,
//   },
//   pedidoInfo: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 2,
//   },
//   pedidoTotal: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '600',
//     marginTop: 6,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#888',
//     fontSize: 16,
//     marginTop: 40,
//   },
// });

// export default CurrentlyQuestions;
