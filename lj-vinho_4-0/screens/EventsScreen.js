import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);

  useEffect(() => {
    // Dados simulados de eventos
    const eventsData = [
      {
        id: '1',
        title: 'Festival de Vinhos de Inverno',
        description: 'Degustação especial de vinhos tintos e brancos selecionados para a estação.',
        date: '2025-07-15',
        time: '19:00',
        location: 'Vinícola Serra Gaúcha',
        address: 'Rua das Parreiras, 123 - Bento Gonçalves, RS',
        price: 'R$ 85,00',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500',
        category: 'Degustação',
        featured: true,
      },
      {
        id: '2',
        title: 'Harmonização Vinho & Queijos',
        description: 'Aprenda a harmonizar vinhos com queijos artesanais da região.',
        date: '2025-07-22',
        time: '15:00',
        location: 'Casa do Vinho',
        address: 'Av. Principal, 456 - Gramado, RS',
        price: 'R$ 120,00',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        category: 'Workshop',
        featured: false,
      },
      {
        id: '3',
        title: 'Tour pelas Vinícolas',
        description: 'Conheça os bastidores da produção de vinhos em um tour exclusivo.',
        date: '2025-08-05',
        time: '09:00',
        location: 'Vale dos Vinhedos',
        address: 'Estrada do Vinho, 789 - Bento Gonçalves, RS',
        price: 'R$ 150,00',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
        category: 'Tour',
        featured: false,
      },
      {
        id: '4',
        title: 'Noite dos Espumantes',
        description: 'Celebre com os melhores espumantes nacionais e internacionais.',
        date: '2025-08-12',
        time: '20:00',
        location: 'Adega Premium',
        address: 'Rua dos Espumantes, 321 - Garibaldi, RS',
        price: 'R$ 95,00',
        image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=500',
        category: 'Celebração',
        featured: false,
      },
    ];

    setEvents(eventsData);
    setFeaturedEvent(eventsData.find(event => event.featured));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Degustação':
        return '#8E24AA';
      case 'Workshop':
        return '#1976D2';
      case 'Tour':
        return '#388E3C';
      case 'Celebração':
        return '#F57C00';
      default:
        return '#640000';
    }
  };

  const renderEventItem = ({ item }) => (
    <Pressable 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{formatDate(item.date)} às {item.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="card-outline" size={16} color="#666" />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
        
        <Pressable 
          style={styles.joinButton}
          onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
          <Text style={styles.joinButtonText}>Detalhes</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </Pressable>
      </View>
    </Pressable>
  );

  const FeaturedEvent = () => {
    if (!featuredEvent) return null;

    return (
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Evento em Destaque</Text>
        <View style={styles.featuredCard}>
          <Image source={{ uri: featuredEvent.image }} style={styles.featuredImage} />
          <View style={styles.featuredOverlay}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(featuredEvent.category) }]}>
              <Text style={styles.categoryText}>{featuredEvent.category}</Text>
            </View>
            <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
            <Text style={styles.featuredDescription}>{featuredEvent.description}</Text>
            
            <View style={styles.featuredDetails}>
              <View style={styles.featuredDetailRow}>
                <Ionicons name="calendar" size={18} color="white" />
                <Text style={styles.featuredDetailText}>
                  {formatDate(featuredEvent.date)} às {featuredEvent.time}
                </Text>
              </View>
              
              <View style={styles.featuredDetailRow}>
                <Ionicons name="location" size={18} color="white" />
                <Text style={styles.featuredDetailText}>{featuredEvent.location}</Text>
              </View>
            </View>
            
            <Pressable 
              style={styles.featuredButton}
              onPress={() => navigation.navigate('EventDetail', { event: featuredEvent })}
            >
              <Text style={styles.featuredButtonText}>Saiba Mais</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eventos</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FeaturedEvent />
        
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          <FlatList
            data={events.filter(event => !event.featured)}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        
        {/* Spacing for bottom navigation Participar */}
        <View style={{ height: 100 }} />
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
    alignItems:'center',
    
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  content: {
    flex: 1,
  },
  featuredContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 280,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  featuredTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredDetails: {
    marginBottom: 16,
  },
  featuredDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredDetailText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  featuredButton: {
    backgroundColor: '#640000',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  featuredButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsSection: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#640000',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: '#640000',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default EventsScreen;

