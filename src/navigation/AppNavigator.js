import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import JudgmentsScreen from '../screens/JudgmentsScreen';
import LegalLibraryScreen from '../screens/LegalLibraryScreen';
import LawMappingScreen from '../screens/LawMappingScreen';
import TemplatesScreen from '../screens/TemplatesScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import YouTubeSummaryScreen from '../screens/YouTubeSummaryScreen';
import JudgmentDetailScreen from '../screens/JudgmentDetailScreen';
import ActDetailScreen from '../screens/ActDetailScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Judgments"
        component={JudgmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gavel" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LegalLibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={HomeTabs} />
      <Stack.Screen name="LawMapping" component={LawMappingScreen} />
      <Stack.Screen name="Templates" component={TemplatesScreen} />
      <Stack.Screen name="YouTubeSummary" component={YouTubeSummaryScreen} />
      <Stack.Screen name="JudgmentDetail" component={JudgmentDetailScreen} />
      <Stack.Screen name="ActDetail" component={ActDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

