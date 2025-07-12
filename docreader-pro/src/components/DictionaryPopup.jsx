import React, { useState, useEffect } from 'react';
import { X, Volume2, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import vocabularyManager from '../utils/vocabularyManager';

const DictionaryPopup = ({ word, definition, position, onClose, onLookUp, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (word) {
      setIsVisible(true);
      setIsSaved(vocabularyManager.isSaved(word));
      
      // Calculate popup position to ensure it stays within viewport
      const popupWidth = 320;
      const popupHeight = 200;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let left = position.x - popupWidth / 2;
      let top = position.y - popupHeight - 10; // Position above the selected text
      
      // Adjust horizontal position if popup would go off-screen
      if (left < 10) left = 10;
      if (left + popupWidth > viewportWidth - 10) left = viewportWidth - popupWidth - 10;
      
      // Adjust vertical position if popup would go off-screen
      if (top < 10) top = position.y + 30; // Position below the text instead
      if (top + popupHeight > viewportHeight - 10) top = viewportHeight - popupHeight - 10;
      
      setPopupStyle({
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 1000,
        width: `${popupWidth}px`,
        maxHeight: `${popupHeight}px`
      });
    } else {
      setIsVisible(false);
    }
  }, [word, position]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 150); // Delay to allow animation
  };

  const handleSave = () => {
    if (definition) {
      const success = vocabularyManager.saveWord(word, definition);
      if (success) {
        setIsSaved(true);
        console.log(`Word "${word}" saved to vocabulary`);
        // Show brief confirmation
        setTimeout(() => {
          // Could show a toast notification here
        }, 100);
      }
    }
    onSave();
  };

  const handlePronunciation = () => {
    // In a real app, this would use text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.log(`Pronunciation: ${word}`);
    }
  };

  if (!word || !isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-999"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div 
        style={popupStyle}
        className={`bg-white rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-150 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-2" />
            <h3 className="font-semibold text-sm capitalize">{word}</h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePronunciation}
              className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
              title="Pronounce word"
            >
              <Volume2 size={14} />
            </button>
            <button
              onClick={handleSave}
              className={`p-1 hover:bg-primary-foreground/20 rounded transition-colors ${
                isSaved ? 'text-yellow-400' : ''
              }`}
              title={isSaved ? 'Word saved' : 'Save to vocabulary'}
            >
              <Star size={14} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 max-h-32 overflow-y-auto">
          {definition ? (
            <div>
              <p className="text-sm text-foreground leading-relaxed">
                {definition}
              </p>
              
              {/* Additional info that could be added */}
              <div className="mt-2 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Tap the star to save this word to your vocabulary collection.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Definition not found in offline dictionary
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => console.log(`Search online for: ${word}`)}
              >
                Search Online
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {definition && (
          <div className="px-3 pb-3">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs"
                onClick={() => console.log(`View more about: ${word}`)}
              >
                More Info
              </Button>
              <Button 
                size="sm" 
                className="flex-1 text-xs"
                onClick={handleSave}
              >
                Save Word
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DictionaryPopup;

