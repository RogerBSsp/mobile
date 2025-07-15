import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes do Evento</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Imagem principal do evento */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.imageOverlay}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          {/* Título */}
          <View style={styles.titleSection}>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>

          {/* Informações básicas */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#640000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Data e Horário</Text>
                <Text style={styles.infoText}>
                  {formatDate(event.date)} às {event.time}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#640000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Local</Text>
                <Text style={styles.infoText}>{event.location}</Text>
                <Text style={styles.infoSubtext}>{event.address}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="people" size={20} color="#640000" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Categoria</Text>
                <Text style={styles.infoText}>{event.category}</Text>
              </View>
            </View>
          </View>

          {/* Descrição completa */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Sobre o Evento</Text>
            <Text style={styles.description}>{event.description}</Text>
            
            {/* Descrição adicional baseada na categoria */}
            {event.category === 'Degustação' && (
              <Text style={styles.additionalInfo}>
                {'\n'}Durante este evento de degustação, você terá a oportunidade de experimentar uma seleção cuidadosamente curada de vinhos, acompanhada por especialistas que compartilharão conhecimentos sobre as características únicas de cada rótulo, técnicas de produção e harmonizações ideais.
              </Text>
            )}
            
            {event.category === 'Workshop' && (
              <Text style={styles.additionalInfo}>
                {'\n'}Este workshop prático oferece uma experiência hands-on onde você aprenderá técnicas profissionais de harmonização, descobrindo os segredos por trás das combinações perfeitas entre vinhos e alimentos, com degustações guiadas e material didático incluso.
              </Text>
            )}
            
            {event.category === 'Tour' && (
              <Text style={styles.additionalInfo}>
                {'\n'}Nosso tour exclusivo leva você pelos bastidores da produção vinícola, desde os vinhedos até as adegas, com explicações detalhadas sobre o processo de vinificação, degustação de vinhos direto dos tanques e barris, e a oportunidade de conhecer os enólogos responsáveis.
              </Text>
            )}
            
            {event.category === 'Celebração' && (
              <Text style={styles.additionalInfo}>
                {'\n'}Uma noite especial de celebração com os melhores rótulos, ambiente sofisticado, música ao vivo e petiscos gourmet especialmente selecionados para harmonizar com cada vinho servido. Uma experiência inesquecível para os amantes da boa vida.
              </Text>
            )}
          </View>

          {/* O que está incluído */}
          <View style={styles.includesSection}>
            <Text style={styles.sectionTitle}>O que está incluído</Text>
            <View style={styles.includesList}>
              <View style={styles.includeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.includeText}>Degustação de vinhos selecionados</Text>
              </View>
              <View style={styles.includeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.includeText}>Material didático</Text>
              </View>
              <View style={styles.includeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.includeText}>Acompanhamento de especialista</Text>
              </View>
              <View style={styles.includeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.includeText}>Certificado de participação</Text>
              </View>
            </View>
          </View>

          {/* Informações importantes */}
          <View style={styles.importantSection}>
            <Text style={styles.sectionTitle}>Informações Importantes</Text>
            <View style={styles.importantList}>
              <View style={styles.importantItem}>
                <Ionicons name="information-circle" size={16} color="#FF9800" />
                <Text style={styles.importantText}>Idade mínima: 18 anos</Text>
              </View>
              <View style={styles.importantItem}>
                <Ionicons name="information-circle" size={16} color="#FF9800" />
                <Text style={styles.importantText}>Vagas limitadas</Text>
              </View>
              <View style={styles.importantItem}>
                <Ionicons name="information-circle" size={16} color="#FF9800" />
                <Text style={styles.importantText}>Cancelamento até 24h antes</Text>
              </View>
            </View>
          </View>
        </View>
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
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainContent: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  infoSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  includesSection: {
    marginBottom: 24,
  },
  includesList: {
    marginTop: 8,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  importantSection: {
    marginBottom: 24,
  },
  importantList: {
    marginTop: 8,
  },
  importantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  importantText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default EventDetailScreen;

