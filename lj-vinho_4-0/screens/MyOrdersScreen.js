import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOrders } from '../context/OrderContext';

const MyOrdersScreen = ({ navigation }) => {
  const { orders, updateOrderStatus } = useOrders();

  // Salvar pedidos no AsyncStorage sempre que a lista de pedidos mudar
  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem('userOrders', JSON.stringify(orders));
      } catch (error) {
        console.error('Erro ao salvar pedidos:', error);
      }
    };

    if (orders.length > 0) {
      saveOrders();
    }
  }, [orders]);

  // Carregar pedidos do AsyncStorage na inicialização
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await AsyncStorage.getItem('userOrders');
        if (savedOrders) {
          // Os pedidos já estão sendo carregados pelo contexto
          console.log('Pedidos carregados do AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmado':
        return '#4CAF50';
      case 'Em preparação':
        return '#FF9800';
      case 'Enviado':
        return '#2196F3';
      case 'Entregue':
        return '#8BC34A';
      default:
        return '#666';
    }
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{order.id.slice(-6)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      
      <View style={styles.orderDates}>
        <Text style={styles.orderDate}>
          Realizado em {formatDate(order.date)}
        </Text>
        
        <Text style={styles.deliveryDate}>
          Previsão de entrega: {formatDate(order.deliveryDate)}
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>Itens do pedido ({order.items.length}):</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.thumbnail.path }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBrand}>{item.marca}</Text>
              <Text style={styles.itemQuantity}>Qtd: {item.quantidade}</Text>
            </View>
            <Text style={styles.itemPrice}>R$ {item.preco}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total do pedido:</Text>
        <Text style={styles.totalValue}>R$ {order.total.toFixed(2).replace('.', ',')}</Text>
      </View>
    </View>
  );

  const EmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color="#640000" />
      <Text style={styles.emptyTitle}>Nenhum pedido encontrado</Text>
      <Text style={styles.emptyText}>
        Você ainda não fez nenhuma compra. Explore nossa seleção de vinhos!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        {orders.length > 0 && (
          <View style={styles.ordersBadge}>
            <Text style={styles.ordersBadgeText}>{orders.length}</Text>
          </View>
        )}
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyOrders />
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
    paddingTop: 40,
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
  ordersBadge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  ordersBadgeText: {
    color: '#640000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDates: {
    marginBottom: 16,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemBrand: {
    fontSize: 12,
    color: '#666',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#640000',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#640000',
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
  },
});

export default MyOrdersScreen;

