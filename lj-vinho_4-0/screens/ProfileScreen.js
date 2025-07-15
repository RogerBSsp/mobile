import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  });

  const menuItems = [
    {
      id: 'orders',
      title: 'Meus Pedidos',
      icon: 'receipt-outline',
      badge: 3,
    },
    {
      id: 'addresses',
      title: 'Endereços',
      icon: 'location-outline',
    },
    {
      id: 'payment',
      title: 'Métodos de Pagamento',
      icon: 'card-outline',
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'notifications-outline',
      badge: 5,
    },
    {
      id: 'help',
      title: 'Ajuda e Suporte',
      icon: 'help-circle-outline',
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'information-circle-outline',
    },
  ];

  const handleMenuItemPress = (id) => {
    if (id === 'orders') {
      navigation.navigate('MyOrders');  // Navegar para a tela MyOrders
    } else {
      Alert.alert(
        'Funcionalidade em desenvolvimento',
        `A funcionalidade "${menuItems.find(item => item.id === id).title}" estará disponível em breve!`
      );
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
        },
      ]
    );
  };

  const renderMenuItem = (item) => {
    const Component = item.id === 'orders' ? TouchableOpacity : Pressable;
    
    return (
      <Component
        key={item.id}
        style={styles.menuItem}
        onPress={() => handleMenuItemPress(item.id)}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={item.icon} size={22} color="#640000" />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
        <View style={styles.menuItemRight}>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </Component>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={18} color="#640000" />
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Avaliações</Text>
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Configurações da Conta</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#640000',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#640000',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#640000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#640000',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640000',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfileScreen;

