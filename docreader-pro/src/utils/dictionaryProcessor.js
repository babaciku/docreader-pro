// Dictionary data processor for DocReader Pro
// Handles loading, cleaning, and querying dictionary data

class DictionaryProcessor {
  constructor() {
    this.dictionaryData = new Map();
    this.isLoaded = false;
  }

  // Clean and normalize dictionary entries
  cleanEntry(entry) {
    if (!entry.word || !entry.definition) return null;

    // Clean word
    let cleanWord = entry.word
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
      .trim();

    // Skip entries with corrupted words
    if (cleanWord.length === 0 || cleanWord.includes('\\') || /^\d+$/.test(cleanWord)) {
      return null;
    }

    // Clean definition
    let cleanDefinition = entry.definition
      .replace(/\\[''"]/g, "'") // Fix escaped quotes
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Skip very short or corrupted definitions
    if (cleanDefinition.length < 10) return null;

    return {
      word: cleanWord,
      definition: cleanDefinition
    };
  }

  // Load dictionary data from JSON files
  async loadDictionary() {
    if (this.isLoaded) return;

    try {
      // In a real mobile app, these would be bundled assets
      // For demo purposes, we'll use a subset of sample data
      const sampleData = [
        { word: "document", definition: "A written or printed paper that provides information or evidence." },
        { word: "read", definition: "To look at and understand the meaning of written or printed words." },
        { word: "dictionary", definition: "A book or electronic resource that lists words and their meanings." },
        { word: "mobile", definition: "Able to move or be moved freely or easily; relating to mobile phones." },
        { word: "application", definition: "A computer program designed to fulfill a particular purpose." },
        { word: "offline", definition: "Not connected to or controlled by a computer or external network." },
        { word: "search", definition: "To look for someone or something by examining carefully." },
        { word: "definition", definition: "A statement of the exact meaning of a word or phrase." },
        { word: "word", definition: "A single distinct meaningful element of speech or writing." },
        { word: "text", definition: "Written or printed words, typically forming a connected passage." },
        { word: "file", definition: "A collection of data or information stored under a particular name." },
        { word: "viewer", definition: "A person who looks at or inspects something; a computer program for displaying files." },
        { word: "browser", definition: "A computer program used to navigate and display web pages or files." },
        { word: "interface", definition: "A point where two systems meet and interact; a user interface." },
        { word: "feature", definition: "A distinctive attribute or aspect of something; a functionality in software." },
        { word: "premium", definition: "Of high quality; requiring payment for access to additional features." },
        { word: "artificial", definition: "Made or produced by human beings rather than occurring naturally." },
        { word: "intelligence", definition: "The ability to acquire and apply knowledge and skills." },
        { word: "summary", definition: "A brief statement of the main points of something." },
        { word: "translate", definition: "To express the sense of words in another language." }
      ];

      // Process and store the sample data
      sampleData.forEach(entry => {
        const cleaned = this.cleanEntry(entry);
        if (cleaned) {
          this.dictionaryData.set(cleaned.word, cleaned.definition);
        }
      });

      this.isLoaded = true;
      console.log(`Dictionary loaded with ${this.dictionaryData.size} entries`);
    } catch (error) {
      console.error('Failed to load dictionary:', error);
    }
  }

  // Look up a word in the dictionary
  lookup(word) {
    if (!this.isLoaded) {
      console.warn('Dictionary not loaded yet');
      return null;
    }

    const cleanWord = word.toLowerCase().trim();
    return this.dictionaryData.get(cleanWord) || null;
  }

  // Search for words that start with a prefix
  searchPrefix(prefix) {
    if (!this.isLoaded) return [];

    const cleanPrefix = prefix.toLowerCase().trim();
    const results = [];

    for (const [word, definition] of this.dictionaryData) {
      if (word.startsWith(cleanPrefix)) {
        results.push({ word, definition });
      }
    }

    return results.slice(0, 10); // Limit to 10 results
  }

  // Get dictionary statistics
  getStats() {
    return {
      totalEntries: this.dictionaryData.size,
      isLoaded: this.isLoaded
    };
  }
}

// Create singleton instance
const dictionaryProcessor = new DictionaryProcessor();

export default dictionaryProcessor;

