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

const SAMPLE_SECTIONS = [
  { number: '1', title: 'Short title, extent and commencement', chapter: '1' },
  { number: '2', title: 'Definitions', chapter: '1' },
  { number: '3', title: 'Punishment of offences', chapter: '2' },
  { number: '4', title: 'Extension of Code to extra-territorial offences', chapter: '2' },
  { number: '5', title: 'Certain laws not to be affected', chapter: '2' },
];

const SectionCard = ({ item, index }) => {
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
      <TouchableOpacity activeOpacity={0.85} style={styles.sectionCard}>
        <View style={styles.sectionNumber}>
          <Text style={styles.sectionNumberText}>{item.number}</Text>
        </View>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.chapterText}>Chapter {item.chapter}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ActDetailScreen({ route, navigation }) {
  const { act } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState(SAMPLE_SECTIONS);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={act.color} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.actShortName}>{act.shortName}</Text>
          <Text style={styles.actFullName}>{act.name}</Text>
          <View style={styles.actMeta}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="calendar" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.metaText}>{act.year}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="file-document" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.metaText}>{act.sections} Sections</Text>
            </View>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{act.category}</Text>
            </View>
          </View>
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
            placeholder="Search sections..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="microphone"
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <MaterialCommunityIcons name="download" size={20} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <MaterialCommunityIcons name="share-variant" size={20} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <MaterialCommunityIcons name="text-to-speech" size={20} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Read Aloud</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>Sections</Text>
            <Text style={styles.sectionHeaderSubtitle}>
              Showing {sections.length} of {act.sections} sections
            </Text>
          </View>

          {sections.map((section, index) => (
            <SectionCard key={section.number} item={section} index={index} />
          ))}

          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Sections</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  actShortName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  actFullName: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginBottom: 16,
  },
  actMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  metaText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 6,
    fontWeight: '500',
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
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
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 6,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  sectionHeaderSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  sectionNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  chapterText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 20,
    elevation: 3,
  },
  loadMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary,
    marginRight: 8,
  },
});

