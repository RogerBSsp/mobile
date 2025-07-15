import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ShopScreen = ({ navigation }) => {
  const { 
    items: cartItems, 
    totalPrice, 
    totalItems, 
    removeItem, 
    updateQuantity,
    clearCart
  } = useCart();

  const aumentarQuantidade = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantidade + 1);
    }
  };

  const diminuirQuantidade = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantidade > 1) {
      updateQuantity(id, item.quantidade - 1);
    }
  };

  const removerItem = (id) => {
    Alert.alert(
      'Remover item',
      'Tem certeza que deseja remover este item do carrinho?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            removeItem(id);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const calcularTotal = () => {
    return totalPrice.toFixed(2).replace('.', ',');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.thumbnail.path }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemBrand}>{item.marca}</Text>
        <Text style={styles.itemPrice}>R$ {item.preco}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => diminuirQuantidade(item.id)}>
          <Ionicons name="remove" size={18} color="#640000" />
        </Pressable>
        <Text style={styles.quantityText}>{item.quantidade}</Text>
        <Pressable
          style={styles.quantityButton}
          onPress={() => aumentarQuantidade(item.id)}>
          <Ionicons name="add" size={18} color="#640000" />
        </Pressable>
      </View>
      <Pressable
        style={styles.removeButton}
        onPress={() => removerItem(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#640000" />
      </Pressable>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#640000" />
      <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
      <Text style={styles.emptyText}>
        Adicione alguns vinhos para começar suas compras.
      </Text>
      <Pressable
        style={styles.shopButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopButtonText}>Ir para a loja</Text>
      </Pressable>
    </View>
  );

  const finalizarCompra = () => {
    // Navegar diretamente para a tela de confirmação de pedido
    navigation.navigate('OrderConfirmation', {
      cartItems: [...cartItems],
      totalPrice,
      totalItems,
      clearCart
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        {totalItems > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </View>
        )}
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>R$ {calcularTotal()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete:</Text>
              <Text style={styles.summaryValue}>R$ 15,00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>
                R$ {(totalPrice + 15).toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <Pressable style={styles.checkoutButton} onPress={finalizarCompra}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </Pressable>
          </View>
        </>
      ) : (
        <EmptyCart />
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
    backgroundColor: '#640000',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartBadge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  cartBadgeText: {
    color: '#640000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#640000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#640000',
  },
  checkoutButton: {
    backgroundColor: '#640000',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
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

export default ShopScreen;

