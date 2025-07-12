// AI Service utility for communicating with the AI backend
class AIService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api/ai';
    this.isAvailable = false;
    this.checkAvailability();
  }

  // Check if AI service is available
  async checkAvailability() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        timeout: 5000
      });
      this.isAvailable = response.ok;
    } catch (error) {
      this.isAvailable = false;
      console.log('AI service not available - using demo mode');
    }
  }

  // Summarize document content
  async summarizeDocument(content, options = {}) {
    const {
      length = 'brief',
      maxWords = 200
    } = options;

    try {
      if (!this.isAvailable) {
        return this.generateDemoSummary(content, length);
      }

      const response = await fetch(`${this.baseURL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          length,
          max_words: maxWords
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Summarization error:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.generateDemoSummary(content, length)
      };
    }
  }

  // Ask questions about document content
  async askQuestion(content, question, options = {}) {
    const {
      contextLength = 500
    } = options;

    try {
      if (!this.isAvailable) {
        return this.generateDemoAnswer(question);
      }

      const response = await fetch(`${this.baseURL}/qa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          question,
          context_length: contextLength
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Q&A error:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.generateDemoAnswer(question)
      };
    }
  }

  // Translate text content
  async translateText(text, options = {}) {
    const {
      sourceLanguage = 'auto',
      targetLanguage = 'es'
    } = options;

    try {
      if (!this.isAvailable) {
        return this.generateDemoTranslation(text, targetLanguage);
      }

      const response = await fetch(`${this.baseURL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          source_language: sourceLanguage,
          target_language: targetLanguage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Translation error:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.generateDemoTranslation(text, targetLanguage)
      };
    }
  }

  // Analyze document for insights
  async analyzeDocument(content) {
    try {
      if (!this.isAvailable) {
        return this.generateDemoAnalysis(content);
      }

      const response = await fetch(`${this.baseURL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.generateDemoAnalysis(content)
      };
    }
  }

  // Demo/fallback functions for when AI service is not available

  generateDemoSummary(content, length) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    let summary;

    if (length === 'brief') {
      summary = sentences.slice(0, 2).join('. ') + '.';
    } else if (length === 'detailed') {
      summary = sentences.slice(0, 4).join('. ') + '.';
    } else {
      summary = sentences.slice(0, 3).join('. ') + '.';
    }

    return {
      summary: summary || 'This document contains important information about the topic.',
      word_count: summary.split(' ').length,
      confidence: 0.85,
      processing_time: 0.5,
      timestamp: new Date().toISOString(),
      demo_mode: true
    };
  }

  generateDemoAnswer(question) {
    const questionLower = question.toLowerCase();
    let answer;

    if (questionLower.includes('what')) {
      answer = 'Based on the document content, this appears to be related to document reading and mobile application features.';
    } else if (questionLower.includes('how')) {
      answer = 'The process involves using advanced technology to provide an enhanced user experience with AI-powered features.';
    } else if (questionLower.includes('why')) {
      answer = 'This approach offers benefits such as improved efficiency, better user experience, and innovative functionality.';
    } else {
      answer = 'The document provides relevant information about this topic. For more detailed answers, please upgrade to premium.';
    }

    return {
      answer,
      confidence: 0.80,
      source_pages: [1],
      context_used: 500,
      processing_time: 0.3,
      timestamp: new Date().toISOString(),
      demo_mode: true
    };
  }

  generateDemoTranslation(text, targetLanguage) {
    const translations = {
      'es': `[ES] ${text.toLowerCase().replace(/document/g, 'documento').replace(/mobile/g, 'móvil')}`,
      'fr': `[FR] ${text.toLowerCase().replace(/document/g, 'document').replace(/mobile/g, 'mobile')}`,
      'de': `[DE] ${text.toLowerCase().replace(/document/g, 'dokument').replace(/mobile/g, 'mobil')}`
    };

    return {
      translated_text: translations[targetLanguage] || `[${targetLanguage.toUpperCase()}] ${text}`,
      detected_language: 'en',
      target_language: targetLanguage,
      confidence: 0.90,
      character_count: text.length,
      processing_time: 0.2,
      timestamp: new Date().toISOString(),
      demo_mode: true
    };
  }

  generateDemoAnalysis(content) {
    const wordCount = content.split(' ').length;
    const sentenceCount = content.split(/[.!?]+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    return {
      analysis: {
        word_count: wordCount,
        sentence_count: sentenceCount,
        paragraph_count: content.split('\n\n').length,
        reading_time_minutes: readingTime,
        complexity_level: wordCount > 500 ? 'Complex' : 'Moderate',
        key_topics: ['Document', 'Technology', 'Mobile', 'Application'],
        document_type: 'General Document',
        sentiment: 'Positive',
        language_detected: 'English'
      },
      processing_time: 0.8,
      timestamp: new Date().toISOString(),
      demo_mode: true
    };
  }

  // Utility methods

  isServiceAvailable() {
    return this.isAvailable;
  }

  getServiceStatus() {
    return {
      available: this.isAvailable,
      baseURL: this.baseURL,
      mode: this.isAvailable ? 'live' : 'demo'
    };
  }
}

// Create singleton instance
const aiService = new AIService();

export default aiService;

