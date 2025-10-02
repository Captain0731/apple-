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

const SAMPLE_SUMMARIES = [
  {
    id: 1,
    title: 'Understanding BNS 2023 - Major Changes',
    url: 'https://youtube.com/watch?v=example1',
    duration: '15:24',
    summary: 'This video covers the major changes in Bhartiya Nyaya Sanhita 2023, replacing the Indian Penal Code. Key topics include section renumbering, new offenses, and updated penalties.',
    transcript: 'Full transcript available...',
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'Supreme Court Landmark Judgment Analysis',
    url: 'https://youtube.com/watch?v=example2',
    duration: '22:18',
    summary: 'Detailed analysis of recent Supreme Court judgment on Article 370. Discussion includes constitutional implications and future impact on legal framework.',
    transcript: 'Full transcript available...',
    date: '1 week ago',
  },
];

const SummaryCard = ({ item, index }) => {
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
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity activeOpacity={0.85} style={styles.summaryCard}>
        <View style={styles.videoThumbnail}>
          <LinearGradient
            colors={['#E53935', '#EF5350']}
            style={styles.thumbnailGradient}
          >
            <MaterialCommunityIcons name="youtube" size={48} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.summaryTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.summaryText} numberOfLines={3}>
            {item.summary}
          </Text>

          <View style={styles.summaryFooter}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="text-box"
                  size={18}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>Transcript</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={18}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function YouTubeSummaryScreen({ navigation }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState(SAMPLE_SUMMARIES);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnalyze = () => {
    if (videoUrl.trim()) {
      setLoading(true);
      // TODO: Call FastAPI endpoint
      // axios.post(`${API_URL}/youtube/analyze`, { url: videoUrl })
      setTimeout(() => {
        setLoading(false);
        // Add new summary to the list
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E53935', '#EF5350']} style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>YouTube Summary</Text>
            <TouchableOpacity style={styles.voiceButton}>
              <MaterialCommunityIcons name="microphone" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            Transcribe & Summarize Legal Videos
          </Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.inputContainer}>
        <View style={styles.inputCard}>
          <MaterialCommunityIcons
            name="youtube"
            size={28}
            color="#E53935"
          />
          <TextInput
            style={styles.urlInput}
            placeholder="Paste YouTube URL here..."
            placeholderTextColor={theme.colors.textSecondary}
            value={videoUrl}
            onChangeText={setVideoUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {videoUrl.length > 0 && (
            <TouchableOpacity onPress={() => setVideoUrl('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.analyzeButton,
            videoUrl.trim() && styles.analyzeButtonActive,
          ]}
          onPress={handleAnalyze}
          disabled={!videoUrl.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <MaterialCommunityIcons name="auto-fix" size={20} color="#FFFFFF" />
              <Text style={styles.analyzeButtonText}>Analyze Video</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featuresBox}>
          <Text style={styles.featuresTitle}>What you'll get:</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={18}
              color={theme.colors.success}
            />
            <Text style={styles.featureText}>Complete video transcript</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={18}
              color={theme.colors.success}
            />
            <Text style={styles.featureText}>Concise summary of key points</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={18}
              color={theme.colors.success}
            />
            <Text style={styles.featureText}>Time-stamped sections</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Summaries</Text>
          <Text style={styles.sectionSubtitle}>{summaries.length} videos</Text>
        </View>

        {summaries.map((summary, index) => (
          <SummaryCard key={summary.id} item={summary} index={index} />
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
    color: 'rgba(255,255,255,0.95)',
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
  inputContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 3,
    marginBottom: 12,
  },
  urlInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
  },
  analyzeButtonActive: {
    backgroundColor: '#E53935',
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  featuresBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 10,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  videoThumbnail: {
    position: 'relative',
  },
  thumbnailGradient: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryContent: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    lineHeight: 22,
  },
  summaryText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginLeft: 4,
  },
});

