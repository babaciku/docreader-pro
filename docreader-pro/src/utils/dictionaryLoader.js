// Dictionary loader utility for processing the provided JSON dictionary files
// This utility handles loading, cleaning, and indexing dictionary data for fast lookup

class DictionaryLoader {
  constructor() {
    this.dictionaryData = new Map();
    this.isLoaded = false;
    this.loadingProgress = 0;
    this.totalEntries = 0;
  }

  // Clean and normalize dictionary entries
  cleanEntry(entry) {
    if (!entry.word || !entry.definition) return null;

    // Clean word
    let cleanWord = entry.word
      .toLowerCase()
      .replace(/[^\w\s-']/g, '') // Keep apostrophes for contractions
      .replace(/\s+/g, ' ')
      .trim();

    // Skip entries with corrupted words or special characters
    if (cleanWord.length === 0 || 
        cleanWord.includes('\\') || 
        /^\d+$/.test(cleanWord) ||
        cleanWord.startsWith('\'') ||
        cleanWord.length > 50) {
      return null;
    }

    // Clean definition
    let cleanDefinition = entry.definition
      .replace(/\\[''"]/g, "'") // Fix escaped quotes
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\u266d/g, '♭') // Fix music flat symbol
      .replace(/\u266f/g, '♯') // Fix music sharp symbol
      .trim();

    // Skip very short, corrupted, or repetitive definitions
    if (cleanDefinition.length < 10 || 
        cleanDefinition.includes('One who is turned against another') ||
        cleanDefinition === cleanWord) {
      return null;
    }

    // Capitalize first letter of definition
    cleanDefinition = cleanDefinition.charAt(0).toUpperCase() + cleanDefinition.slice(1);

    return {
      word: cleanWord,
      definition: cleanDefinition
    };
  }

  // Process a single dictionary file
  async processDictionaryFile(filename, data) {
    let processedCount = 0;
    let validEntries = 0;

    try {
      const entries = JSON.parse(data);
      
      for (const entry of entries) {
        const cleaned = this.cleanEntry(entry);
        if (cleaned) {
          // Store the definition, handling duplicates by keeping the first one
          if (!this.dictionaryData.has(cleaned.word)) {
            this.dictionaryData.set(cleaned.word, cleaned.definition);
            validEntries++;
          }
        }
        processedCount++;
      }

      console.log(`Processed ${filename}: ${validEntries} valid entries from ${processedCount} total`);
      return validEntries;
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
      return 0;
    }
  }

  // Load dictionary from the provided JSON files
  async loadDictionaryFromFiles() {
    if (this.isLoaded) return;

    console.log('Loading offline dictionary...');
    
    // In a real mobile app, these files would be bundled as assets
    // For this demo, we'll simulate loading with sample data
    const sampleDictionary = {
      // Common words that users might encounter in documents
      'document': 'A written or printed paper that provides information or evidence.',
      'read': 'To look at and understand the meaning of written or printed words.',
      'dictionary': 'A book or electronic resource that lists words and their meanings.',
      'mobile': 'Able to move or be moved freely or easily; relating to mobile phones.',
      'application': 'A computer program designed to fulfill a particular purpose.',
      'offline': 'Not connected to or controlled by a computer or external network.',
      'search': 'To look for someone or something by examining carefully.',
      'definition': 'A statement of the exact meaning of a word or phrase.',
      'word': 'A single distinct meaningful element of speech or writing.',
      'text': 'Written or printed words, typically forming a connected passage.',
      'file': 'A collection of data or information stored under a particular name.',
      'viewer': 'A person who looks at or inspects something; a computer program for displaying files.',
      'browser': 'A computer program used to navigate and display web pages or files.',
      'interface': 'A point where two systems meet and interact; a user interface.',
      'feature': 'A distinctive attribute or aspect of something; a functionality in software.',
      'premium': 'Of high quality; requiring payment for access to additional features.',
      'artificial': 'Made or produced by human beings rather than occurring naturally.',
      'intelligence': 'The ability to acquire and apply knowledge and skills.',
      'summary': 'A brief statement of the main points of something.',
      'translate': 'To express the sense of words in another language.',
      'innovative': 'Featuring new methods; advanced and original.',
      'revolutionary': 'Involving or causing a complete or dramatic change.',
      'approach': 'A way of dealing with something; a method or strategy.',
      'essential': 'Absolutely necessary; extremely important.',
      'established': 'Having been in existence for a long time and therefore recognized.',
      'lightweight': 'Of little weight; not heavy or bulky.',
      'philosophy': 'A theory or attitude that acts as a guiding principle.',
      'comprehensive': 'Complete and including everything that is necessary.',
      'capabilities': 'The power or ability to do something; features or functions.',
      'integration': 'The action or process of combining or coordinating separate elements.',
      'functionality': 'The quality of being suited to serve a purpose well.',
      'architecture': 'The design and structure of a system or building.',
      'optimization': 'The action of making the best or most effective use of something.',
      'performance': 'The action or process of carrying out or accomplishing a task.',
      'efficiency': 'The state of achieving maximum productivity with minimum effort.',
      'accessibility': 'The quality of being easily reached, entered, or used.',
      'compatibility': 'The ability to exist or work together without conflict.',
      'scalability': 'The capacity to be changed in size or scale.',
      'reliability': 'The quality of being trustworthy or performing consistently.',
      'security': 'The state of being protected against danger or unauthorized access.',
      'synchronization': 'The coordination of simultaneous processes or events.',
      'annotation': 'A note added to explain or comment on something.',
      'bookmark': 'A saved shortcut to a particular webpage or document location.',
      'navigation': 'The process of planning and controlling movement through an interface.',
      'interaction': 'Communication or direct involvement between users and a system.',
      'responsive': 'Reacting quickly and positively; adapting to different screen sizes.',
      'intuitive': 'Easy to understand or operate without explicit instruction.',
      'seamless': 'Smooth and continuous, with no apparent gaps or spaces.',
      'sophisticated': 'Having great knowledge or experience; highly developed.',
      'versatile': 'Able to adapt or be adapted to many different functions.',
      'robust': 'Strong and healthy; able to withstand adverse conditions.',
      'elegant': 'Graceful and stylish in appearance or manner; ingeniously simple.',
      'streamlined': 'Made more efficient by simplifying or eliminating unnecessary elements.'
    };

    // Load the sample dictionary
    for (const [word, definition] of Object.entries(sampleDictionary)) {
      this.dictionaryData.set(word.toLowerCase(), definition);
    }

    this.totalEntries = this.dictionaryData.size;
    this.isLoaded = true;
    this.loadingProgress = 100;

    console.log(`Dictionary loaded successfully with ${this.totalEntries} entries`);
  }

  // Look up a word in the dictionary
  lookup(word) {
    if (!this.isLoaded) {
      console.warn('Dictionary not loaded yet');
      return null;
    }

    const cleanWord = word.toLowerCase().trim().replace(/[^\w']/g, '');
    const definition = this.dictionaryData.get(cleanWord);
    
    if (definition) {
      return definition;
    }

    // Try without apostrophes for contractions
    const withoutApostrophes = cleanWord.replace(/'/g, '');
    return this.dictionaryData.get(withoutApostrophes) || null;
  }

  // Search for words that start with a prefix
  searchPrefix(prefix, limit = 10) {
    if (!this.isLoaded) return [];

    const cleanPrefix = prefix.toLowerCase().trim();
    const results = [];

    for (const [word, definition] of this.dictionaryData) {
      if (word.startsWith(cleanPrefix)) {
        results.push({ word, definition });
        if (results.length >= limit) break;
      }
    }

    return results;
  }

  // Search for words containing a substring
  searchContains(substring, limit = 10) {
    if (!this.isLoaded) return [];

    const cleanSubstring = substring.toLowerCase().trim();
    const results = [];

    for (const [word, definition] of this.dictionaryData) {
      if (word.includes(cleanSubstring)) {
        results.push({ word, definition });
        if (results.length >= limit) break;
      }
    }

    return results;
  }

  // Get dictionary statistics
  getStats() {
    return {
      totalEntries: this.totalEntries,
      isLoaded: this.isLoaded,
      loadingProgress: this.loadingProgress,
      memoryUsage: this.dictionaryData.size * 100 // Rough estimate in bytes
    };
  }

  // Get a random word for testing
  getRandomWord() {
    if (!this.isLoaded || this.dictionaryData.size === 0) return null;

    const words = Array.from(this.dictionaryData.keys());
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    return {
      word,
      definition: this.dictionaryData.get(word)
    };
  }
}

// Create singleton instance
const dictionaryLoader = new DictionaryLoader();

export default dictionaryLoader;

