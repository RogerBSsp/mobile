import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommentsScreen = ({ route, navigation }) => {
  const { vinho } = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Dados simulados de comentários específicos para o produto
    const productComments = [
      {
        id: '1',
        userName: 'João Silva',
        rating: 5,
        comment: 'Excelente vinho! Sabor equilibrado e aroma marcante. Recomendo para ocasiões especiais.',
        date: '2025-01-05',
        helpful: 12,
      },
      {
        id: '2',
        userName: 'Maria Santos',
        rating: 4,
        comment: 'Muito bom! Ótimo custo-benefício. Chegou bem embalado e dentro do prazo. O sabor é suave e agradável.',
        date: '2025-01-03',
        helpful: 8,
      },
      {
        id: '3',
        userName: 'Carlos Oliveira',
        rating: 5,
        comment: 'Superou minhas expectativas! Comprei para um jantar especial e todos elogiaram. Definitivamente vou comprar novamente.',
        date: '2025-01-01',
        helpful: 15,
      },
      {
        id: '4',
        userName: 'Ana Costa',
        rating: 4,
        comment: 'Bom vinho, mas achei um pouco doce para o meu gosto. Mesmo assim, recomendo para quem gosta de vinhos mais suaves.',
        date: '2024-12-28',
        helpful: 6,
      },
      {
        id: '5',
        userName: 'Pedro Ferreira',
        rating: 5,
        comment: 'Produto de excelente qualidade! Entrega rápida e embalagem perfeita. O vinho tem um sabor único e marcante.',
        date: '2024-12-25',
        helpful: 10,
      },
      {
        id: '6',
        userName: 'Lucia Mendes',
        rating: 3,
        comment: 'Vinho ok, mas esperava mais pelo preço. Não é ruim, mas há opções melhores na mesma faixa de preço.',
        date: '2024-12-20',
        helpful: 4,
      },
    ];

    setComments(productComments);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((total, comment) => total + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach(comment => {
      distribution[comment.rating]++;
    });
    return distribution;
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.userName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.commentDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        {renderStars(item.rating)}
      </View>
      
      <Text style={styles.commentText}>{item.comment}</Text>
      
      <View style={styles.commentFooter}>
        <Pressable style={styles.helpfulButton}>
          <Ionicons name="thumbs-up-outline" size={16} color="#666" />
          <Text style={styles.helpfulText}>Útil ({item.helpful})</Text>
        </Pressable>
      </View>
    </View>
  );

  const RatingOverview = () => {
    const averageRating = calculateAverageRating();
    const distribution = getRatingDistribution();
    const totalComments = comments.length;

    return (
      <View style={styles.ratingOverview}>
        <Text style={styles.sectionTitle}>Resumo das Avaliações</Text>
        
        <View style={styles.ratingHeader}>
          <View style={styles.averageRating}>
            <Text style={styles.averageNumber}>{averageRating}</Text>
            {renderStars(Math.round(averageRating))}
            <Text style={styles.totalReviews}>({totalComments} avaliações)</Text>
          </View>
        </View>

        <View style={styles.ratingBars}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <View key={rating} style={styles.ratingBar}>
              <Text style={styles.ratingLabel}>{rating}</Text>
              <Ionicons name="star" size={12} color="#FFD700" />
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.barFill, 
                    { width: `${totalComments > 0 ? (distribution[rating] / totalComments) * 100 : 0}%` }
                  ]} 
                />
              </View>
              <Text style={styles.ratingCount}>{distribution[rating]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Avaliações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{vinho.name}</Text>
          <Text style={styles.productBrand}>{vinho.marca}</Text>
        </View>

        {/* Rating Overview */}
        <RatingOverview />

        {/* Comments List */}
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Comentários dos Clientes</Text>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        
        {/* Spacing for bottom */}
        <View style={{ height: 50 }} />
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
  productInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 16,
    color: '#666',
  },
  ratingOverview: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  ratingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    alignItems: 'center',
  },
  averageNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#640000',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  ratingBars: {
    marginTop: 16,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#333',
    width: 12,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    width: 20,
    textAlign: 'right',
  },
  commentsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  commentCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#640000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  helpfulText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default CommentsScreen;

