import axios from 'axios';

// Default to backend on 8000 or relative path if deployed together
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const api = {
  // System Health
  async getHealth() {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Sample Scenarios
  async getSampleScenarios() {
    const response = await apiClient.get('/sample-scenarios');
    return response.data;
  },

  // Run Sample Analysis directly
  async runSampleAnalysis(scenarioKey = 'healthy') {
    const response = await apiClient.post(`/sample-analysis?scenario_key=${scenarioKey}`);
    return response.data;
  },

  // Primary Multi-Agent Ingestion Analysis
  async analyzeEcosystem(ecosystemData) {
    const response = await apiClient.post('/analyze', ecosystemData);
    return response.data;
  },

  // Historical Records
  async getAnalyses(limit = 25) {
    const response = await apiClient.get(`/analyses?limit=${limit}`);
    return response.data;
  },

  // Single Analysis Detail
  async getAnalysisById(id) {
    const response = await apiClient.get(`/analyses/${id}`);
    return response.data;
  },

  // Delete Analysis
  async deleteAnalysis(id) {
    const response = await apiClient.delete(`/analyses/${id}`);
    return response.data;
  },

  // Re-seed DB
  async reseedDatabase() {
    const response = await apiClient.post('/seed');
    return response.data;
  },
};

export default api;
