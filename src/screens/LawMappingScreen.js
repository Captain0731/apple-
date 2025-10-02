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

const LAW_MAPPINGS = [
  {
    id: 1,
    oldLaw: 'IPC',
    newLaw: 'BNS',
    fullOldName: 'Indian Penal Code',
    fullNewName: 'Bhartiya Nyaya Sanhita',
    color: ['#D32F2F', '#F44336'],
  },
  {
    id: 2,
    oldLaw: 'CrPC',
    newLaw: 'BNSS',
    fullOldName: 'Code of Criminal Procedure',
    fullNewName: 'Bhartiya Nagarik Suraksha Sanhita',
    color: ['#1976D2', '#2196F3'],
  },
  {
    id: 3,
    oldLaw: 'IEA',
    newLaw: 'BSA',
    fullOldName: 'Indian Evidence Act',
    fullNewName: 'Bhartiya Sakshya Adhiniyam',
    color: ['#7B1FA2', '#9C27B0'],
  },
];

const SECTION_MAPPINGS = [
  { old: '302', new: '103', description: 'Punishment for murder', law: 'IPC → BNS' },
  { old: '376', new: '63', description: 'Punishment for rape', law: 'IPC → BNS' },
  { old: '420', new: '318', description: 'Cheating and dishonestly', law: 'IPC → BNS' },
  { old: '304', new: '105', description: 'Culpable homicide', law: 'IPC → BNS' },
  { old: '498A', new: '85', description: 'Cruelty by husband', law: 'IPC → BNS' },
];

const MappingCard = ({ item, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 100,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={item.color}
        style={styles.mappingCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.mappingContent}>
          <View style={styles.lawSection}>
            <View style={styles.lawBox}>
              <Text style={styles.lawLabel}>OLD LAW</Text>
              <Text style={styles.lawCode}>{item.oldLaw}</Text>
              <Text style={styles.lawName}>{item.fullOldName}</Text>
            </View>
            
            <View style={styles.arrowContainer}>
              <MaterialCommunityIcons
                name="arrow-right-bold"
                size={32}
                color="rgba(255,255,255,0.9)"
              />
            </View>

            <View style={styles.lawBox}>
              <Text style={styles.lawLabel}>NEW LAW</Text>
              <Text style={styles.lawCode}>{item.newLaw}</Text>
              <Text style={styles.lawName}>{item.fullNewName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewMappingButton}>
            <Text style={styles.viewMappingText}>View Section Mapping</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const SectionMappingRow = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: index * 60,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.sectionRow, { opacity: fadeAnim }]}>
      <View style={styles.sectionContent}>
        <View style={styles.sectionNumbers}>
          <View style={styles.oldSection}>
            <Text style={styles.sectionLabel}>Old</Text>
            <Text style={styles.sectionNumber}>{item.old}</Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={theme.colors.primary}
          />
          <View style={styles.newSection}>
            <Text style={styles.sectionLabel}>New</Text>
            <Text style={styles.sectionNumber}>{item.new}</Text>
          </View>
        </View>
        <Text style={styles.sectionDescription}>{item.description}</Text>
        <Text style={styles.sectionLaw}>{item.law}</Text>
      </View>
      <TouchableOpacity style={styles.copyButton}>
        <MaterialCommunityIcons name="content-copy" size={18} color={theme.colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function LawMappingScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('laws');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

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
            <Text style={styles.headerTitle}>Law Mapping</Text>
            <TouchableOpacity style={styles.voiceButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Old to New Law Conversion
          </Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'laws' && styles.activeTab]}
          onPress={() => setActiveTab('laws')}
        >
          <Text style={[styles.tabText, activeTab === 'laws' && styles.activeTabText]}>
            Laws
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sections' && styles.activeTab]}
          onPress={() => setActiveTab('sections')}
        >
          <Text style={[styles.tabText, activeTab === 'sections' && styles.activeTabText]}>
            Sections
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === 'laws'
                ? 'Search old law name...'
                : 'Enter old section number...'
            }
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'laws' ? (
          <>
            <View style={styles.infoBox}>
              <MaterialCommunityIcons
                name="information"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>
                The new criminal laws replaced the old British-era laws in 2023
              </Text>
            </View>
            {LAW_MAPPINGS.map((item, index) => (
              <MappingCard key={item.id} item={item} index={index} />
            ))}
          </>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>
                Quick Section Lookup
              </Text>
              <Text style={styles.sectionHeaderSubtext}>
                {SECTION_MAPPINGS.length} sections mapped
              </Text>
            </View>
            {SECTION_MAPPINGS.map((item, index) => (
              <SectionMappingRow key={index} item={item} index={index} />
            ))}
          </>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 12,
    padding: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.text,
    marginLeft: 12,
    lineHeight: 18,
  },
  mappingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  mappingContent: {
    flex: 1,
  },
  lawSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lawBox: {
    flex: 1,
    alignItems: 'center',
  },
  lawLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  lawCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  lawName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  arrowContainer: {
    marginHorizontal: 10,
  },
  viewMappingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  viewMappingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  sectionHeaderSubtext: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  sectionContent: {
    flex: 1,
  },
  sectionNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  oldSection: {
    alignItems: 'center',
    marginRight: 16,
  },
  newSection: {
    alignItems: 'center',
    marginLeft: 16,
  },
  sectionLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  sectionNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  sectionLaw: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

