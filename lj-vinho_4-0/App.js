//imports
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { FavoritesProvider } from './context/FavoritesContext';

// telas principais (tabs)
import WineListScreen from './screens/WineListScreen'; // Lista vinhos Favorito
import ProfileStacks from './screens/ProfileStacks'; // Perfil do usuario
import HomeScreen from './screens/HomeScreen'; // Tela inicial
import ShopScreen from './screens/ShopScreen' //Carrinho
import EventsScreen from './screens/EventsScreen' // Eventos
import WineCatalogScreen from './screens/WineCatalogScreen' // Catálogo de vinhos

// telas secundárias (stack)
import ProductDetailScreen from './screens/ProductDetailScreen'; // Detalhes do produto
import CommentsScreen from './screens/CommentsScreen'; // Comentários
import MyOrdersScreen from './screens/MyOrdersScreen'; // Meus pedidos
import EventDetailScreen from './screens/EventDetailScreen'; // Detalhes do evento
import OrderConfirmationScreen from './screens/OrderConfirmationScreen'; // Confirmação de pedido

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para telas que não estão no Tab
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigator principal
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#640000',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: { backgroundColor: '#fff5f5' },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/homeIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="Catalogo"
        component={WineCatalogScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/searchIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={WineListScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/heartIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Carinho"
        component={ShopScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/shopIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={EventsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/eventIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStacks}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/Menu/perfilIcon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <FavoritesProvider>
      <OrderProvider>
        <CartProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </CartProvider>
      </OrderProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
