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

const SEARCH_CATEGORIES = ['All', 'Judgments', 'Acts', 'Sections'];

const RECENT_SEARCHES = [
  'Section 302 IPC',
  'Supreme Court judgments 2024',
  'Bail application format',
  'BNS changes',
];

const TRENDING_TOPICS = [
  { id: 1, title: 'New Criminal Laws 2023', icon: 'trending-up', color: '#E53935' },
  { id: 2, title: 'Bail Provisions', icon: 'gavel', color: '#1976D2' },
  { id: 3, title: 'Article 370 Judgment', icon: 'file-document', color: '#7B1FA2' },
  { id: 4, title: 'Electronic Evidence', icon: 'laptop', color: '#388E3C' },
];

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // TODO: Call FastAPI search endpoint
      // axios.get(`${API_URL}/search?q=${searchQuery}&category=${selectedCategory}`)
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search</Text>
            <View style={{ width: 40 }} />
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.primary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search judgments, acts, sections..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus
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
          <TouchableOpacity style={styles.voiceSearchButton}>
            <MaterialCommunityIcons
              name="microphone"
              size={22}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {SEARCH_CATEGORIES.map((category) => (
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
        <Animated.View
          style={[
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {!searchQuery && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons
                    name="history"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                </View>
                {RECENT_SEARCHES.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentItem}
                    onPress={() => setSearchQuery(search)}
                  >
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={18}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={styles.recentText}>{search}</Text>
                    <MaterialCommunityIcons
                      name="arrow-top-left"
                      size={18}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={20}
                    color="#FF9800"
                  />
                  <Text style={styles.sectionTitle}>Trending Topics</Text>
                </View>
                <View style={styles.trendingGrid}>
                  {TRENDING_TOPICS.map((topic, index) => (
                    <TouchableOpacity
                      key={topic.id}
                      style={styles.trendingCard}
                    >
                      <View
                        style={[
                          styles.trendingIcon,
                          { backgroundColor: topic.color + '20' },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={topic.icon}
                          size={24}
                          color={topic.color}
                        />
                      </View>
                      <Text style={styles.trendingText} numberOfLines={2}>
                        {topic.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons
                    name="lightbulb-on"
                    size={20}
                    color={theme.colors.warning}
                  />
                  <Text style={styles.sectionTitle}>Search Tips</Text>
                </View>
                <View style={styles.tipsCard}>
                  <View style={styles.tipItem}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={16}
                      color={theme.colors.success}
                    />
                    <Text style={styles.tipText}>
                      Use section numbers for quick lookup
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={16}
                      color={theme.colors.success}
                    />
                    <Text style={styles.tipText}>
                      Search by CNR number for specific judgments
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={16}
                      color={theme.colors.success}
                    />
                    <Text style={styles.tipText}>
                      Use voice search for hands-free operation
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {searchQuery && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsText}>
                Search results will appear here
              </Text>
            </View>
          )}
        </Animated.View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  voiceSearchButton: {
    marginLeft: 12,
    padding: 4,
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
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 12,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trendingCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
  },
  trendingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendingText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 10,
    lineHeight: 20,
  },
  resultsSection: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  resultsText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
});

