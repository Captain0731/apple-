import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A237E', // Deep Blue
    secondary: '#283593', // Indigo
    accent: '#5C6BC0', // Light Indigo
    background: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#757575',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FF9800',
    gradient1: '#1A237E',
    gradient2: '#3949AB',
    card: '#FFFFFF',
    border: '#E0E0E0',
  },
  roundness: 16,
};

export const gradients = {
  primary: ['#1A237E', '#3949AB', '#5C6BC0'],
  secondary: ['#283593', '#3F51B5'],
  card: ['#FFFFFF', '#F8F9FA'],
};

