import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const ACT_CATEGORIES = ['All Acts', 'Criminal', 'Civil', 'Constitutional', 'Commercial'];

const SAMPLE_ACTS = [
  {
    id: 1,
    name: 'Bhartiya Nyaya Sanhita',
    shortName: 'BNS',
    year: '2023',
    sections: 358,
    category: 'Criminal',
    color: ['#D32F2F', '#F44336'],
  },
  {
    id: 2,
    name: 'Bhartiya Nagarik Suraksha Sanhita',
    shortName: 'BNSS',
    year: '2023',
    sections: 533,
    category: 'Criminal',
    color: ['#C62828', '#E53935'],
  },
  {
    id: 3,
    name: 'Indian Penal Code',
    shortName: 'IPC',
    year: '1860',
    sections: 511,
    category: 'Criminal',
    color: ['#1976D2', '#2196F3'],
  },
  {
    id: 4,
    name: 'Code of Criminal Procedure',
    shortName: 'CrPC',
    year: '1973',
    sections: 484,
    category: 'Criminal',
    color: ['#0288D1', '#03A9F4'],
  },
  {
    id: 5,
    name: 'Indian Evidence Act',
    shortName: 'IEA',
    year: '1872',
    sections: 167,
    category: 'Civil',
    color: ['#7B1FA2', '#9C27B0'],
  },
  {
    id: 6,
    name: 'Constitution of India',
    shortName: 'COI',
    year: '1950',
    sections: 395,
    category: 'Constitutional',
    color: ['#F57C00', '#FF9800'],
  },
  {
    id: 7,
    name: 'Indian Contract Act',
    shortName: 'ICA',
    year: '1872',
    sections: 238,
    category: 'Commercial',
    color: ['#388E3C', '#4CAF50'],
  },
  {
    id: 8,
    name: 'Transfer of Property Act',
    shortName: 'TPA',
    year: '1882',
    sections: 137,
    category: 'Civil',
    color: ['#5D4037', '#795548'],
  },
];

const ActCard = ({ item, onPress, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 60,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.actCardContainer, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(item)}>
        <LinearGradient
          colors={item.color}
          style={styles.actCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.actCardHeader}>
            <View style={styles.actIconContainer}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={28}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>

          <Text style={styles.actShortName}>{item.shortName}</Text>
          <Text style={styles.actFullName} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={styles.actFooter}>
            <View style={styles.actInfo}>
              <MaterialCommunityIcons name="calendar" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.actInfoText}>{item.year}</Text>
            </View>
            <View style={styles.actInfo}>
              <MaterialCommunityIcons name="file-document" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.actInfoText}>{item.sections} Sections</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function LegalLibraryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Acts');
  const [acts, setActs] = useState(SAMPLE_ACTS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleActPress = (act) => {
    navigation.navigate('ActDetail', { act });
  };

  const filteredActs = acts.filter((act) =>
    selectedCategory === 'All Acts' || act.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Legal Library</Text>
            <TouchableOpacity style={styles.voiceButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            All State & Central Acts in one place
          </Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search acts, sections, provisions..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {ACT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{acts.length}</Text>
            <Text style={styles.statLabel}>Total Acts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {acts.reduce((sum, act) => sum + act.sections, 0)}
            </Text>
            <Text style={styles.statLabel}>Sections</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>

        <View style={styles.actsGrid}>
          {filteredActs.map((act, index) => (
            <ActCard key={act.id} item={act} index={index} onPress={handleActPress} />
          ))}
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  filterScroll: {
    marginTop: 16,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    elevation: 2,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  actsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actCardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  actCard: {
    borderRadius: 16,
    padding: 16,
    height: 180,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  actIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actShortName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actFullName: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 18,
    flex: 1,
  },
  actFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actInfoText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 4,
    fontWeight: '500',
  },
});

