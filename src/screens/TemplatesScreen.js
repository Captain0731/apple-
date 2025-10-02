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

const TEMPLATE_CATEGORIES = ['All', 'Criminal', 'Civil', 'Corporate', 'Family'];

const TEMPLATES = [
  {
    id: 1,
    title: 'First Information Report (FIR)',
    category: 'Criminal',
    downloads: 1234,
    icon: 'file-alert',
    color: ['#D32F2F', '#F44336'],
  },
  {
    id: 2,
    title: 'Bail Application',
    category: 'Criminal',
    downloads: 987,
    icon: 'gavel',
    color: ['#C62828', '#E53935'],
  },
  {
    id: 3,
    title: 'Power of Attorney',
    category: 'Civil',
    downloads: 2145,
    icon: 'file-document-edit',
    color: ['#1976D2', '#2196F3'],
  },
  {
    id: 4,
    title: 'Sale Deed',
    category: 'Civil',
    downloads: 1876,
    icon: 'home-city',
    color: ['#0288D1', '#03A9F4'],
  },
  {
    id: 5,
    title: 'Divorce Petition',
    category: 'Family',
    downloads: 765,
    icon: 'account-multiple-remove',
    color: ['#7B1FA2', '#9C27B0'],
  },
  {
    id: 6,
    title: 'Partnership Deed',
    category: 'Corporate',
    downloads: 654,
    icon: 'handshake',
    color: ['#388E3C', '#4CAF50'],
  },
  {
    id: 7,
    title: 'Rent Agreement',
    category: 'Civil',
    downloads: 3210,
    icon: 'home-account',
    color: ['#F57C00', '#FF9800'],
  },
  {
    id: 8,
    title: 'Will & Testament',
    category: 'Civil',
    downloads: 1432,
    icon: 'file-certificate',
    color: ['#5D4037', '#795548'],
  },
];

const TemplateCard = ({ item, index }) => {
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
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity activeOpacity={0.85} style={styles.templateCard}>
        <LinearGradient
          colors={item.color}
          style={styles.templateIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name={item.icon} size={32} color="#FFFFFF" />
        </LinearGradient>

        <View style={styles.templateContent}>
          <Text style={styles.templateTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.templateMeta}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <View style={styles.downloadInfo}>
              <MaterialCommunityIcons
                name="download"
                size={14}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.downloadText}>{item.downloads}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <MaterialCommunityIcons
            name="download-circle"
            size={32}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function TemplatesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredTemplates = TEMPLATES.filter(
    (template) =>
      selectedCategory === 'All' || template.category === selectedCategory
  );

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
            <Text style={styles.headerTitle}>Templates</Text>
            <TouchableOpacity style={styles.voiceButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Ready-to-use legal document formats
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
            placeholder="Search templates..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {TEMPLATE_CATEGORIES.map((category) => (
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
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="file-multiple"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.statNumber}>{TEMPLATES.length}</Text>
            <Text style={styles.statLabel}>Templates</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="download"
              size={24}
              color={theme.colors.success}
            />
            <Text style={styles.statNumber}>
              {TEMPLATES.reduce((sum, t) => sum + t.downloads, 0)}
            </Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
        </View>

        {filteredTemplates.map((template, index) => (
          <TemplateCard key={template.id} item={template} index={index} />
        ))}
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
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  templateIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateContent: {
    flex: 1,
    marginLeft: 16,
  },
  templateTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  templateMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  downloadButton: {
    marginLeft: 12,
  },
});

