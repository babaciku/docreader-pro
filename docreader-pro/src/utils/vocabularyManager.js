// Vocabulary manager for handling saved words and user vocabulary
class VocabularyManager {
  constructor() {
    this.storageKey = 'docreader_vocabulary';
    this.savedWords = new Map();
    this.loadSavedWords();
  }

  // Load saved words from localStorage
  loadSavedWords() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      this.savedWords.clear();
      
      saved.forEach(item => {
        this.savedWords.set(item.word, {
          word: item.word,
          definition: item.definition,
          savedAt: item.savedAt,
          lookupCount: item.lookupCount || 1,
          lastAccessed: item.lastAccessed || item.savedAt
        });
      });
      
      console.log(`Loaded ${this.savedWords.size} saved words`);
    } catch (error) {
      console.error('Error loading saved words:', error);
      this.savedWords.clear();
    }
  }

  // Save words to localStorage
  saveToPersistence() {
    try {
      const wordsArray = Array.from(this.savedWords.values());
      localStorage.setItem(this.storageKey, JSON.stringify(wordsArray));
    } catch (error) {
      console.error('Error saving words to storage:', error);
    }
  }

  // Add a word to the vocabulary
  saveWord(word, definition) {
    const cleanWord = word.toLowerCase().trim();
    const timestamp = Date.now();

    if (this.savedWords.has(cleanWord)) {
      // Update existing word
      const existing = this.savedWords.get(cleanWord);
      existing.lookupCount += 1;
      existing.lastAccessed = timestamp;
    } else {
      // Add new word
      this.savedWords.set(cleanWord, {
        word: cleanWord,
        definition: definition,
        savedAt: timestamp,
        lookupCount: 1,
        lastAccessed: timestamp
      });
    }

    this.saveToPersistence();
    return true;
  }

  // Remove a word from vocabulary
  removeWord(word) {
    const cleanWord = word.toLowerCase().trim();
    const removed = this.savedWords.delete(cleanWord);
    
    if (removed) {
      this.saveToPersistence();
    }
    
    return removed;
  }

  // Check if a word is saved
  isSaved(word) {
    const cleanWord = word.toLowerCase().trim();
    return this.savedWords.has(cleanWord);
  }

  // Get a saved word with its metadata
  getSavedWord(word) {
    const cleanWord = word.toLowerCase().trim();
    return this.savedWords.get(cleanWord) || null;
  }

  // Get all saved words
  getAllSavedWords() {
    return Array.from(this.savedWords.values());
  }

  // Search saved words
  searchSavedWords(query, limit = 50) {
    const cleanQuery = query.toLowerCase().trim();
    const results = [];

    for (const wordData of this.savedWords.values()) {
      if (wordData.word.includes(cleanQuery) || 
          wordData.definition.toLowerCase().includes(cleanQuery)) {
        results.push(wordData);
        if (results.length >= limit) break;
      }
    }

    // Sort by relevance (exact word match first, then by lookup count)
    return results.sort((a, b) => {
      const aExact = a.word === cleanQuery ? 1 : 0;
      const bExact = b.word === cleanQuery ? 1 : 0;
      
      if (aExact !== bExact) return bExact - aExact;
      return b.lookupCount - a.lookupCount;
    });
  }

  // Get recently saved words
  getRecentWords(limit = 10) {
    const words = Array.from(this.savedWords.values());
    return words
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice(0, limit);
  }

  // Get frequently looked up words
  getFrequentWords(limit = 10) {
    const words = Array.from(this.savedWords.values());
    return words
      .sort((a, b) => b.lookupCount - a.lookupCount)
      .slice(0, limit);
  }

  // Get vocabulary statistics
  getStats() {
    const words = Array.from(this.savedWords.values());
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    return {
      totalWords: words.length,
      recentWords: words.filter(w => w.savedAt > oneWeekAgo).length,
      monthlyWords: words.filter(w => w.savedAt > oneMonthAgo).length,
      totalLookups: words.reduce((sum, w) => sum + w.lookupCount, 0),
      averageLookups: words.length > 0 ? 
        (words.reduce((sum, w) => sum + w.lookupCount, 0) / words.length).toFixed(1) : 0,
      oldestWord: words.length > 0 ? 
        words.reduce((oldest, w) => w.savedAt < oldest.savedAt ? w : oldest) : null,
      newestWord: words.length > 0 ? 
        words.reduce((newest, w) => w.savedAt > newest.savedAt ? w : newest) : null
    };
  }

  // Export vocabulary data
  exportVocabulary() {
    const words = this.getAllSavedWords();
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      totalWords: words.length,
      words: words
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  // Import vocabulary data
  importVocabulary(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.words || !Array.isArray(data.words)) {
        throw new Error('Invalid vocabulary data format');
      }

      let importedCount = 0;
      
      data.words.forEach(wordData => {
        if (wordData.word && wordData.definition) {
          this.savedWords.set(wordData.word, {
            word: wordData.word,
            definition: wordData.definition,
            savedAt: wordData.savedAt || Date.now(),
            lookupCount: wordData.lookupCount || 1,
            lastAccessed: wordData.lastAccessed || wordData.savedAt || Date.now()
          });
          importedCount++;
        }
      });

      this.saveToPersistence();
      return { success: true, importedCount };
    } catch (error) {
      console.error('Error importing vocabulary:', error);
      return { success: false, error: error.message };
    }
  }

  // Clear all saved words
  clearVocabulary() {
    this.savedWords.clear();
    localStorage.removeItem(this.storageKey);
    return true;
  }
}

// Create singleton instance
const vocabularyManager = new VocabularyManager();

export default vocabularyManager;

