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

// const LoginScreen = ({ navigation, route }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useAuth();
//   const { onSuccess } = route.params || {};

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos');
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert('Erro', 'Por favor, insira um email válido');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const result = await login(email.trim().toLowerCase(), password);
      
//       if (result.success) {
//         Alert.alert('Sucesso', 'Login realizado com sucesso!', [
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
//         Alert.alert('Erro', result.error || 'Erro ao fazer login');
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

//   const navigateToRegister = () => {
//     navigation.navigate('Register', { onSuccess });
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
//         <Text style={styles.headerTitle}>Entrar</Text>
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
//             <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
//             <Text style={styles.welcomeSubtitle}>
//               Entre na sua conta para continuar
//             </Text>
//           </View>

//           {/* Formulário */}
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Email</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Digite seu email"
//                   placeholderTextColor="#999"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Senha</Text>
//               <View style={styles.inputWrapper}>
//                 <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
//                 <TextInput
//                   style={[styles.textInput, styles.passwordInput]}
//                   placeholder="Digite sua senha"
//                   placeholderTextColor="#999"
//                   value={password}
//                   onChangeText={setPassword}
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

//             {/* Botão de Login */}
//             <Pressable 
//               style={[styles.loginButton, loading && styles.loginButtonDisabled]}
//               onPress={handleLogin}
//               disabled={loading}
//             >
//               {loading ? (
//                 <Text style={styles.loginButtonText}>Entrando...</Text>
//               ) : (
//                 <>
//                   <Text style={styles.loginButtonText}>Entrar</Text>
//                   <Ionicons name="arrow-forward" size={20} color="white" />
//                 </>
//               )}
//             </Pressable>

//             {/* Link para cadastro */}
//             <View style={styles.registerContainer}>
//               <Text style={styles.registerText}>Não tem uma conta? </Text>
//               <Pressable onPress={navigateToRegister}>
//                 <Text style={styles.registerLink}>Cadastre-se</Text>
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
//     marginTop: 40,
//     marginBottom: 40,
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
//     marginBottom: 20,
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
//   loginButton: {
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
//   loginButtonDisabled: {
//     backgroundColor: '#999',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight: 8,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   registerText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   registerLink: {
//     fontSize: 16,
//     color: '#640000',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;

