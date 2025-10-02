// API Configuration
// Update this with your FastAPI backend URL

export const API_CONFIG = {
  // Development
  BASE_URL: 'http://localhost:8000', // Replace with your FastAPI server URL
  
  // Production
  // BASE_URL: 'https://your-production-api.com',
  
  ENDPOINTS: {
    // Judgments
    JUDGMENTS_SEARCH: '/api/judgments/search',
    JUDGMENT_DETAIL: '/api/judgments/:id',
    JUDGMENTS_RECENT: '/api/judgments/recent',
    
    // Legal Library
    ACTS_LIST: '/api/acts',
    ACT_DETAIL: '/api/acts/:id',
    SECTIONS_SEARCH: '/api/sections/search',
    
    // Law Mapping
    LAW_MAPPINGS: '/api/mappings',
    SECTION_MAPPING: '/api/mappings/section/:number',
    
    // Templates
    TEMPLATES_LIST: '/api/templates',
    TEMPLATE_DOWNLOAD: '/api/templates/:id/download',
    
    // YouTube
    YOUTUBE_ANALYZE: '/api/youtube/analyze',
    YOUTUBE_TRANSCRIPT: '/api/youtube/transcript',
    YOUTUBE_SUMMARY: '/api/youtube/summary',
    
    // Chatbot
    CHAT_MESSAGE: '/api/chat/message',
    CHAT_HISTORY: '/api/chat/history',
    
    // Search
    GLOBAL_SEARCH: '/api/search',
    
    // Voice
    VOICE_TO_TEXT: '/api/voice/transcribe',
    TEXT_TO_VOICE: '/api/voice/synthesize',
  },
  
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to build complete URL
export const buildUrl = (endpoint, params = {}) => {
  let url = API_CONFIG.BASE_URL + endpoint;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// Example usage:
// import { API_CONFIG, buildUrl } from './config/api';
// const url = buildUrl(API_CONFIG.ENDPOINTS.ACT_DETAIL, { id: '123' });

