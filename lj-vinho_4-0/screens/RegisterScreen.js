// IMPLEMENTAÇÃO FUTURA?
// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   StatusBar,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../context/AuthContext';

// const RegisterScreen = ({ navigation, route }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const { register } = useAuth();
//   const { onSuccess } = route.params || {};

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleRegister = async () => {
//     // Validações
//     if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
//       return;
//     }

//     if (!isValidEmail(formData.email)) {
//       Alert.alert('Erro', 'Por favor, insira um email válido');
//       return;
//     }

//     if (formData.password.length < 6) {
//       Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       Alert.alert('Erro', 'As senhas não coincidem');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const userData = {
//         name: formData.name.trim(),
//         email: formData.email.trim().toLowerCase(),
//         phone: formData.phone.trim(),
//         password: formData.password,
//       };

//       const result = await register(userData);
      
//       if (result.success) {
//         Alert.alert('Sucesso', 'Conta criada com sucesso!', [
//           {
//             text: 'OK',
//             onPress: () => {
//               if (onSuccess) {
//                 onSuccess();
//               } else {
//                 navigation.goBack();
//               }
//             }
//           }
//         ]);
//       } else {
//         Alert.alert('Erro', result.error || 'Erro ao criar conta');
//       }
//     } catch (error) {
//       Alert.alert('Erro', 'Erro interno. Tente novamente.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const navigateToLogin = () => {
//     navigation.navigate('Login', { onSuccess });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#640000" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Pressable 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Cadastrar</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <KeyboardAvoidingView 
//         style={styles.content}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView 
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Logo/Título */}
//           <View style={styles.logoContainer}>
//             <Ionicons name="wine" size={60} color="#640000" />
//             <Text style={styles.welcomeTitle}>Criar Conta</Text>
//             <Text style={styles.welcomeSubtitle}>
//               Preencha os dados para criar sua conta
//             </Text>
//           </View>

//           {/* Formulário */}
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Nome Completo *</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Digite seu nome completo"
//                   placeholderTextColor="#999"
//                   value={formData.name}
//                   onChangeText={(value) => handleInputChange('name', value)}
//                   autoCapitalize="words"
//                   autoCorrect={false}
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Email *</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Digite seu email"
//                   placeholderTextColor="#999"
//                   value={formData.email}
//                   onChangeText={(value) => handleInputChange('email', value)}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Telefone</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="(11) 99999-9999"
//                   placeholderTextColor="#999"
//                   value={formData.phone}
//                   onChangeText={(value) => handleInputChange('phone', value)}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Senha *</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={[styles.textInput, styles.passwordInput]}
//                   placeholder="Digite sua senha (mín. 6 caracteres)"
//                   placeholderTextColor="#999"
//                   value={formData.password}
//                   onChangeText={(value) => handleInputChange('password', value)}
//                   secureTextEntry={!showPassword}
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//                 <Pressable
//                   style={styles.eyeButton}
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons 
//                     name={showPassword ? "eye-off-outline" : "eye-outline"} 
//                     size={20} 
//                     color="#666" 
//                   />
//                 </Pressable>
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Confirmar Senha *</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={[styles.textInput, styles.passwordInput]}
//                   placeholder="Confirme sua senha"
//                   placeholderTextColor="#999"
//                   value={formData.confirmPassword}
//                   onChangeText={(value) => handleInputChange('confirmPassword', value)}
//                   secureTextEntry={!showConfirmPassword}
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//                 <Pressable
//                   style={styles.eyeButton}
//                   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   <Ionicons 
//                     name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
//                     size={20} 
//                     color="#666" 
//                   />
//                 </Pressable>
//               </View>
//             </View>

//             {/* Botão de Cadastro */}
//             <Pressable 
//               style={[styles.registerButton, loading && styles.registerButtonDisabled]}
//               onPress={handleRegister}
//               disabled={loading}
//             >
//               {loading ? (
//                 <Text style={styles.registerButtonText}>Criando conta...</Text>
//               ) : (
//                 <>
//                   <Text style={styles.registerButtonText}>Criar Conta</Text>
//                   <Ionicons name="arrow-forward" size={20} color="white" />
//                 </>
//               )}
//             </Pressable>

//             {/* Link para login */}
//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>Já tem uma conta? </Text>
//               <Pressable onPress={navigateToLogin}>
//                 <Text style={styles.loginLink}>Entrar</Text>
//               </Pressable>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
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
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 40,
//     paddingBottom: 16,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   placeholder: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   welcomeSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   formContainer: {
//     flex: 1,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingHorizontal: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     paddingVertical: 16,
//   },
//   passwordInput: {
//     paddingRight: 40,
//   },
//   eyeButton: {
//     position: 'absolute',
//     right: 16,
//     padding: 4,
//   },
//   registerButton: {
//     backgroundColor: '#640000',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 4,
//   },
//   registerButtonDisabled: {
//     backgroundColor: '#999',
//   },
//   registerButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight: 8,
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   loginText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   loginLink: {
//     fontSize: 16,
//     color: '#640000',
//     fontWeight: 'bold',
//   },
// });

// export default RegisterScreen;

