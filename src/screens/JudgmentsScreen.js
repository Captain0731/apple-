import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const COURT_TYPES = ['All', 'Supreme Court', 'High Court'];

const SAMPLE_JUDGMENTS = [
  {
    id: 1,
    title: 'WP/12923/2016 of M. SEENAPPA, CHITTOOR DIST',
    court: 'High Court of Andhra Pradesh',
    judge: 'TARLADA RAJASEKHAR RAO',
    date: '01-12-5000',
    cnr: 'APHC010460892016',
    status: 'DISPOSED OF NO COSTS',
    caseBrief: 'ANDHRA PRADESH AT AMARAVATHI MAIN CASE: W.P.No.12923 of 2016',
  },
  {
    id: 2,
    title: 'WP(C)/1506/2023 of KEFAYAT AHMAD SOFI',
    court: 'High Court of Jammu and Kashmir',
    judge: "HON'BLE MR. JUSTICE RAJNESH OSWAL",
    date: '29-08-5000',
    cnr: 'JKHC010028062023',
    status: 'Disposed Off',
    caseBrief: '51 Regular IN THE HIGH COURT OF JAMMU & KASHMIR AND LADAKH',
  },
  {
    id: 3,
    title: 'WP(C)/2394/2023 of KEFAYAT AHMAD SOFI',
    court: 'High Court of Jammu and Kashmir',
    judge: "HON'BLE MR. JUSTICE RAJNESH OSWAL",
    date: '29-08-5000',
    cnr: 'JKHC010046592023',
    status: 'Disposed Off',
    caseBrief: '97 Regular IN THE HIGH COURT OF JAMMU & KASHMIR AND LADAKH',
  },
];

const JudgmentCard = ({ item, onPress, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 80,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.judgmentCard, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        style={styles.cardTouchable}
      >
        <View style={styles.cardHeader}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.judgmentTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="gavel" size={16} color={theme.colors.primary} />
          <Text style={styles.infoText}>{item.court}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="account-tie" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText} numberOfLines={1}>
            Judge: {item.judge}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="calendar" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.footerText}>{item.date}</Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="file-document" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.footerText}>{item.cnr}</Text>
          </View>
        </View>

        <View style={styles.viewMoreContainer}>
          <Text style={styles.viewMoreText}>View Details</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={16}
            color={theme.colors.primary}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function JudgmentsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('All');
  const [loading, setLoading] = useState(false);
  const [judgments, setJudgments] = useState(SAMPLE_JUDGMENTS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    // TODO: Call FastAPI endpoint
    // axios.get(`${API_URL}/judgments?query=${searchQuery}&court=${selectedCourt}`)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleJudgmentPress = (judgment) => {
    navigation.navigate('JudgmentDetail', { judgment });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Judgments & Orders</Text>
            <TouchableOpacity
              style={styles.voiceButton}
              onPress={() => {
                // TODO: Implement voice search
              }}
            >
              <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Access HC & SC judgments from last 1 year
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
            placeholder="Search judgments, case number, CNR..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
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
          {COURT_TYPES.map((court) => (
            <TouchableOpacity
              key={court}
              style={[
                styles.filterChip,
                selectedCourt === court && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCourt(court)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCourt === court && styles.filterTextActive,
                ]}
              >
                {court}
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
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {judgments.length.toLocaleString()} Results
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <MaterialCommunityIcons
              name="sort"
              size={18}
              color={theme.colors.primary}
            />
            <Text style={styles.sortText}>Sort by Date</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading judgments...</Text>
          </View>
        ) : (
          judgments.map((judgment, index) => (
            <JudgmentCard
              key={judgment.id}
              item={judgment}
              index={index}
              onPress={handleJudgmentPress}
            />
          ))
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginLeft: 4,
  },
  judgmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardTouchable: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2E7D32',
  },
  judgmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginRight: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 12,
  },
});

