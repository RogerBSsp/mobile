import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const OrderConfirmationScreen = ({ navigation, route }) => {
  const { cartItems, totalPrice, totalItems, clearCart } = route.params;
  const { addOrder } = useOrders();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome');
      return false;
    }
    if (!customerInfo.phone.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu telefone');
      return false;
    }
    if (!customerInfo.address.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu endereço');
      return false;
    }
    if (!customerInfo.city.trim()) {
      Alert.alert('Erro', 'Por favor, informe sua cidade');
      return false;
    }
    return true;
  };

  const confirmOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Adicionar pedido à lista
      addOrder(cartItems, totalPrice + 15);

      // Limpar carrinho
      clearCart();

      Alert.alert(
        'Pedido Confirmado!',
        `Obrigado ${customerInfo.name}! Seu pedido foi confirmado com sucesso.\n\nVocê receberá um email de confirmação em breve.\n\nPrazo de entrega: 5-7 dias úteis`,
        [
          {
            text: 'Ver Meus Pedidos',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [
                  { name: 'MainTabs' },
                  { name: 'MyOrders' }
                ],
              });
            }
          },
          {
            text: 'Continuar Comprando',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar seu pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Finalizar Pedido</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resumo do Pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.orderSummary}>
            {cartItems.map((item, index) => (
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
            
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>R$ {formatPrice(totalPrice)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Frete:</Text>
                <Text style={styles.totalValue}>R$ 15,00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.finalTotalLabel}>Total:</Text>
                <Text style={styles.finalTotalValue}>R$ {formatPrice(totalPrice + 15)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Entrega</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#999"
              value={customerInfo.name}
              onChangeText={(value) => handleInputChange('name', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu email (opcional)"
              placeholderTextColor="#999"
              value={customerInfo.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="(11) 99999-9999"
              placeholderTextColor="#999"
              value={customerInfo.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Endereço *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Rua, número, complemento"
              placeholderTextColor="#999"
              value={customerInfo.address}
              onChangeText={(value) => handleInputChange('address', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.inputLabel}>Cidade *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Sua cidade"
                placeholderTextColor="#999"
                value={customerInfo.city}
                onChangeText={(value) => handleInputChange('city', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={[styles.inputContainer, styles.flex1, styles.marginLeft]}>
              <Text style={styles.inputLabel}>CEP</Text>
              <TextInput
                style={styles.textInput}
                placeholder="00000-000"
                placeholderTextColor="#999"
                value={customerInfo.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Informações de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          <View style={styles.paymentInfo}>
            <Ionicons name="card" size={24} color="#640000" />
            <Text style={styles.paymentText}>Pagamento na Entrega</Text>
          </View>
          <Text style={styles.paymentSubtext}>
            Você pode pagar em dinheiro, cartão de débito ou crédito no momento da entrega.
          </Text>
        </View>

        {/* Espaçamento para o botão fixo */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botão de Confirmar Pedido */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
          onPress={confirmOrder}
          disabled={loading}
        >
          {loading ? (
            <>
              <Text style={styles.confirmButtonText}>Processando...</Text>
              <Ionicons name="hourglass" size={20} color="white" />
            </>
          ) : (
            <>
              <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </>
          )}
        </Pressable>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderSummary: {
    marginTop: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 50,
    height: 50,
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
  totalSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  finalTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#640000',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  confirmButton: {
    backgroundColor: '#640000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#999',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default OrderConfirmationScreen;

