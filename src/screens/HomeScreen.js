import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

const features = [
  {
    id: 1,
    title: 'Comprehensive Judgment Access',
    subtitle: 'HC & SC Judgments',
    icon: 'file-document-multiple',
    gradient: ['#1A237E', '#3949AB'],
    screen: 'Judgments',
  },
  {
    id: 2,
    title: 'Complete Legal Reference',
    subtitle: 'All Acts & Sections',
    icon: 'book-open-page-variant',
    gradient: ['#283593', '#5C6BC0'],
    screen: 'Library',
  },
  {
    id: 3,
    title: 'Old-to-New Law Mapping',
    subtitle: 'IPC → BNS, CrPC → BNSS',
    icon: 'swap-horizontal',
    gradient: ['#3949AB', '#7986CB'],
    screen: 'LawMapping',
  },
  {
    id: 4,
    title: 'Legal Document Templates',
    subtitle: 'Ready-to-Use Formats',
    icon: 'file-document-edit',
    gradient: ['#5C6BC0', '#9FA8DA'],
    screen: 'Templates',
  },
  {
    id: 5,
    title: 'YouTube Summary',
    subtitle: 'Transcribe & Summarize',
    icon: 'youtube',
    gradient: ['#E53935', '#EF5350'],
    screen: 'YouTubeSummary',
  },
  {
    id: 6,
    title: 'AI Legal Chatbot',
    subtitle: '24/7 Legal Assistant',
    icon: 'robot-excited',
    gradient: ['#43A047', '#66BB6A'],
    screen: 'Chatbot',
  },
];

const FeatureCard = ({ item, index, navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        delay: index * 100,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    navigation.navigate(item.screen);
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <LinearGradient
          colors={item.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color="rgba(255,255,255,0.8)"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A237E', '#3949AB']}
        style={styles.header}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome to</Text>
              <Text style={styles.appName}>Salhakar</Text>
              <Text style={styles.tagline}>Your Legal Assistant</Text>
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => navigation.navigate('Search')}
            >
              <MaterialCommunityIcons name="magnify" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="star-four-points"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.sectionTitle}>Features</Text>
        </View>

        {features.map((item, index) => (
          <FeatureCard
            key={item.id}
            item={item}
            index={index}
            navigation={navigation}
          />
        ))}

        <View style={styles.footer}>
          <View style={styles.voiceAssistantCard}>
            <LinearGradient
              colors={['#7B1FA2', '#9C27B0']}
              style={styles.voiceGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons
                name="microphone"
                size={32}
                color="#FFFFFF"
              />
              <View style={styles.voiceTextContainer}>
                <Text style={styles.voiceTitle}>Voice Enabled</Text>
                <Text style={styles.voiceSubtitle}>
                  Search and navigate using voice commands
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  appName: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 10,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  footer: {
    marginTop: 20,
  },
  voiceAssistantCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  voiceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  voiceTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  voiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  voiceSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
});

