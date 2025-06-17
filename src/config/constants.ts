
// Configuration pour le déploiement sur Render
export const API_CONFIG = {
  // URL de base pour votre modèle YOLO déployé sur Render
  YOLO_MODEL_URL: process.env.VITE_YOLO_MODEL_URL || 'https://votre-modele-yolo-render.onrender.com',
  
  // Endpoints API
  ENDPOINTS: {
    DETECT: '/api/detect',
    ANALYZE: '/api/analyze',
    STATUS: '/api/status'
  },
  
  // Configuration pour la détection
  DETECTION_CONFIG: {
    CONFIDENCE_THRESHOLD: 0.5,
    POLLING_INTERVAL: 5000, // 5 secondes
    MAX_RETRIES: 3
  }
};

// Configuration pour l'environnement
export const ENV_CONFIG = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || API_CONFIG.YOLO_MODEL_URL
};
