import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen';
import CurrentlyQuestions from './CurrentlyQuestions'; // importe sua tela MeusPedidos

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrentlyQuestions"
        component={CurrentlyQuestions}
        options={{ title: 'Meus Pedidos' }}
      />
    </Stack.Navigator>
  );
}
