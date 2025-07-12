import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Star, Volume2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

const VocabularyScreen = ({ onBack }) => {
  const [savedWords, setSavedWords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  useEffect(() => {
    // Load saved words from localStorage (in a real app, this would be from a database)
    const saved = JSON.parse(localStorage.getItem('docreader_vocabulary') || '[]');
    setSavedWords(saved);
    setFilteredWords(saved);
  }, []);

  useEffect(() => {
    // Filter words based on search query
    if (searchQuery.trim()) {
      const filtered = savedWords.filter(item =>
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(savedWords);
    }
  }, [searchQuery, savedWords]);

  const handlePronunciation = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRemoveWord = (wordToRemove) => {
    const updated = savedWords.filter(item => item.word !== wordToRemove);
    setSavedWords(updated);
    localStorage.setItem('docreader_vocabulary', JSON.stringify(updated));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-3 p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">My Vocabulary</h1>
      </div>

      {/* Search */}
      <div className="p-4 bg-white border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search saved words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          {filteredWords.length} of {savedWords.length} words
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Word List */}
      <div className="flex-1 overflow-y-auto">
        {filteredWords.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredWords.map((item, index) => (
              <div key={index} className="p-4 bg-white hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-foreground capitalize mr-2">
                        {item.word}
                      </h3>
                      <button
                        onClick={() => handlePronunciation(item.word)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                        title="Pronounce"
                      >
                        <Volume2 size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {item.definition}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Saved on {formatDate(item.savedAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveWord(item.word)}
                    className="p-2 hover:bg-red-100 rounded transition-colors"
                    title="Remove from vocabulary"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Star size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No matching words found' : 'No saved words yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `Try adjusting your search for "${searchQuery}"`
                  : 'Start building your vocabulary by saving words while reading documents'
                }
              </p>
              {!searchQuery && (
                <Button variant="outline" onClick={onBack}>
                  Start Reading
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyScreen;

