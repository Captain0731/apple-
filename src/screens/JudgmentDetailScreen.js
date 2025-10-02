import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export default function JudgmentDetailScreen({ route, navigation }) {
  const { judgment } = route.params;
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
      <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Judgment Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialCommunityIcons name="share-variant" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.statusCard}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{judgment.status}</Text>
            </View>
          </View>

          <Text style={styles.caseTitle}>{judgment.title}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="gavel" size={20} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Court</Text>
                <Text style={styles.infoValue}>{judgment.court}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account-tie" size={20} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Judge</Text>
                <Text style={styles.infoValue}>{judgment.judge}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Decision Date</Text>
                <Text style={styles.infoValue}>{judgment.date}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="file-document" size={20} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>CNR Number</Text>
                <Text style={styles.infoValue}>{judgment.cnr}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Case Brief</Text>
            <View style={styles.briefCard}>
              <Text style={styles.briefText}>{judgment.caseBrief}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <MaterialCommunityIcons name="download" size={28} color={theme.colors.primary} />
                <Text style={styles.actionText}>Download PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <MaterialCommunityIcons name="bookmark-outline" size={28} color={theme.colors.primary} />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <MaterialCommunityIcons name="file-document-edit" size={28} color={theme.colors.primary} />
                <Text style={styles.actionText}>Cite</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <MaterialCommunityIcons name="text-to-speech" size={28} color={theme.colors.primary} />
                <Text style={styles.actionText}>Read Aloud</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.fullTextButton}>
            <LinearGradient
              colors={['#1A237E', '#3949AB']}
              style={styles.fullTextGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.fullTextButtonText}>View Full Judgment</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
            </LinearGradient>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  caseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    lineHeight: 30,
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  briefCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  briefText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 22,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 8,
  },
  fullTextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  fullTextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  fullTextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

