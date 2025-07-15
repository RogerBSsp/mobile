// Atualizado para CommentsScreen Remover depois
//import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   Pressable,
//   StatusBar,
//   TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const AvaliacoesScreen = ({ navigation }) => {
//   const [avaliacoes, setAvaliacoes] = useState([
//     {
//       id: '1',
//       vinho: 'Vinho tinto seco bordô',
//       marca: 'San Martin',
//       nota: 4.5,
//       comentario: 'Excelente vinho para o dia a dia, ótimo custo-benefício!',
//       data: '15/05/2025',
//       usuario: 'Maria Silva',
//       usuarioImagem: 'https://randomuser.me/api/portraits/women/44.jpg',
//       vinhoImagem: 'https://m.media-amazon.com/images/I/41AKNFBwdtL._AC_SL1000_.jpg',
//     },
//     {
//       id: '2',
//       vinho: 'Vinho Tinto Carmenere',
//       marca: 'Casas Patronales',
//       nota: 5,
//       comentario: 'Um dos melhores vinhos chilenos que já experimentei. Aroma intenso e sabor marcante.',
//       data: '02/06/2025',
//       usuario: 'Maria Silva',
//       usuarioImagem: 'https://randomuser.me/api/portraits/women/44.jpg',
//       vinhoImagem: 'https://m.media-amazon.com/images/I/41AKNFBwdtL._AC_SL1000_.jpg',
//     },
//     {
//       id: '3',
//       vinho: 'Vinho Branco Fino Seco',
//       marca: 'Monte de Sabóia',
//       nota: 3.5,
//       comentario: 'Bom vinho, mas esperava um pouco mais pelo preço. Sabor agradável, mas não excepcional.',
//       data: '28/05/2025',
//       usuario: 'Maria Silva',
//       usuarioImagem: 'https://randomuser.me/api/portraits/women/44.jpg',
//       vinhoImagem: 'https://m.media-amazon.com/images/I/41AKNFBwdtL._AC_SL1000_.jpg',
//     },
//   ]);

//   const [comentario, setComentario] = useState('');

//   const renderEstrelas = (nota) => {
//     const estrelas = [];
//     const notaInteira = Math.floor(nota);
//     const temMeia = nota % 1 >= 0.5;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= notaInteira) {
//         estrelas.push(
//           <Ionicons key={i} name="star" size={16} color="#FFD700" />
//         );
//       } else if (i === notaInteira + 1 && temMeia) {
//         estrelas.push(
//           <Ionicons key={i} name="star-half" size={16} color="#FFD700" />
//         );
//       } else {
//         estrelas.push(
//           <Ionicons key={i} name="star-outline" size={16} color="#FFD700" />
//         );
//       }
//     }

//     return (
//       <View style={styles.estrelasContainer}>
//         {estrelas}
//         <Text style={styles.notaTexto}>{nota.toFixed(1)}</Text>
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.avaliacaoCard}>
//       <View style={styles.avaliacaoHeader}>
//         <Image source={{ uri: item.usuarioImagem }} style={styles.usuarioImagem} />
//         <View style={styles.avaliacaoHeaderInfo}>
//           <Text style={styles.usuarioNome}>{item.usuario}</Text>
//           <Text style={styles.avaliacaoData}>{item.data}</Text>
//         </View>
//         {renderEstrelas(item.nota)}
//       </View>

//       <View style={styles.vinhoInfo}>
//         <Image source={{ uri: item.vinhoImagem }} style={styles.vinhoImagem} />
//         <View style={styles.vinhoTexto}>
//           <Text style={styles.vinhoNome}>{item.vinho}</Text>
//           <Text style={styles.vinhoMarca}>{item.marca}</Text>
//         </View>
//       </View>

//       <Text style={styles.comentario}>{item.comentario}</Text>

//       <View style={styles.avaliacaoFooter}>
//         <Pressable style={styles.footerButton}>
//           <Ionicons name="heart-outline" size={18} color="#640000" />
//           <Text style={styles.footerButtonText}>Curtir</Text>
//         </Pressable>
//         <Pressable style={styles.footerButton}>
//           <Ionicons name="chatbubble-outline" size={18} color="#640000" />
//           <Text style={styles.footerButtonText}>Comentar</Text>
//         </Pressable>
//         <Pressable style={styles.footerButton}>
//           <Ionicons name="share-social-outline" size={18} color="#640000" />
//           <Text style={styles.footerButtonText}>Compartilhar</Text>
//         </Pressable>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#640000" />
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Minhas Avaliações</Text>
//       </View>

//       <FlatList
//         data={avaliacoes}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.avaliacoesList}
//         ListHeaderComponent={
//           <View style={styles.novaAvaliacaoContainer}>
//             <Text style={styles.novaAvaliacaoTitulo}>Nova Avaliação</Text>
//             <View style={styles.novaAvaliacaoForm}>
//               <TextInput
//                 style={styles.comentarioInput}
//                 placeholder="Escreva sua avaliação sobre um vinho..."
//                 multiline
//                 value={comentario}
//                 onChangeText={setComentario}
//               />
//               <View style={styles.novaAvaliacaoFooter}>
//                 <View style={styles.avaliacaoEstrelas}>
//                   <Ionicons name="star" size={24} color="#FFD700" />
//                   <Ionicons name="star" size={24} color="#FFD700" />
//                   <Ionicons name="star" size={24} color="#FFD700" />
//                   <Ionicons name="star" size={24} color="#FFD700" />
//                   <Ionicons name="star-outline" size={24} color="#FFD700" />
//                 </View>
//                 <Pressable style={styles.enviarButton}>
//                   <Text style={styles.enviarButtonText}>Publicar</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>
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
//     padding: 20,
//     paddingTop: 40,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   avaliacoesList: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   novaAvaliacaoContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   novaAvaliacaoTitulo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 12,
//   },
//   novaAvaliacaoForm: {},
//   comentarioInput: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     padding: 12,
//     minHeight: 100,
//     textAlignVertical: 'top',
//     fontSize: 16,
//   },
//   novaAvaliacaoFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   avaliacaoEstrelas: {
//     flexDirection: 'row',
//   },
//   enviarButton: {
//     backgroundColor: '#640000',
//     borderRadius: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   enviarButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   avaliacaoCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   avaliacaoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   usuarioImagem: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   avaliacaoHeaderInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   usuarioNome: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   avaliacaoData: {
//     fontSize: 12,
//     color: '#999',
//   },
//   estrelasContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   notaTexto: {
//     marginLeft: 4,
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   vinhoInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9F9F9',
//     borderRadius: 12,
//     padding: 8,
//     marginBottom: 12,
//   },
//   vinhoImagem: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   vinhoTexto: {
//     marginLeft: 12,
//   },
//   vinhoNome: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   vinhoMarca: {
//     fontSize: 12,
//     color: '#666',
//   },
//   comentario: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   avaliacaoFooter: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   footerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   footerButtonText: {
//     marginLeft: 4,
//     fontSize: 14,
//     color: '#640000',
//   },
// });

// export default AvaliacoesScreen;

