import React, { useState, useRef } from 'react';
import { ArrowLeft, MoreVertical, Edit3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import DictionaryPopup from '../components/DictionaryPopup';
import AIAssistant from '../components/AIAssistant';
import dictionaryLoader from '../utils/dictionaryLoader';

const DocumentViewer = ({ document, onBack }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // In real app, this would come from user context
  const documentRef = useRef(null);
  const contentRef = useRef(null);

  const handleTextSelection = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && selectedText.split(' ').length === 1) {
      // Only show dictionary for single words
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      
      setSelectedWord(selectedText.toLowerCase().replace(/[^\w]/g, ''));
    } else {
      setSelectedWord(null);
    }
  };

  const handleDictionaryLookup = () => {
    if (selectedWord) {
      const definition = dictionaryLoader.lookup(selectedWord);
      console.log(`Definition for "${selectedWord}":`, definition);
    }
  };

  const handleSaveWord = () => {
    console.log(`Saved word: ${selectedWord}`);
    setSelectedWord(null);
  };

  const handleAIAssistant = () => {
    if (!isPremiumUser) {
      alert('Upgrade to Premium to access AI features like document summarization, Q&A, and translation!');
      return;
    }
    setShowAIAssistant(true);
  };

  const closeDictionary = () => {
    setSelectedWord(null);
    window.getSelection().removeAllRanges();
  };

  const renderDocumentContent = () => {
    // Split content into paragraphs for better rendering
    const paragraphs = document.content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('#')) {
        // Handle headers
        const level = paragraph.match(/^#+/)[0].length;
        const text = paragraph.replace(/^#+\s*/, '');
        const HeaderTag = `h${Math.min(level, 6)}`;
        
        return (
          <HeaderTag 
            key={index} 
            className={`font-bold mb-3 ${
              level === 1 ? 'text-2xl' : 
              level === 2 ? 'text-xl' : 
              level === 3 ? 'text-lg' : 'text-base'
            }`}
          >
            {text}
          </HeaderTag>
        );
      } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        // Handle bullet points
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-foreground">
                {item.replace(/^[-*]\s*/, '')}
              </li>
            ))}
          </ul>
        );
      } else if (paragraph.match(/^\d+\./)) {
        // Handle numbered lists
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-foreground">
                {item.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
        );
      } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        // Handle bold text blocks
        return (
          <p key={index} className="font-semibold text-foreground mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      } else if (paragraph.trim()) {
        // Regular paragraphs
        return (
          <p key={index} className="text-foreground mb-4 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  const getDefinition = () => {
    if (!selectedWord) return null;
    return dictionaryLoader.lookup(selectedWord);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-border">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mr-3 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium text-foreground truncate">
            {document.name}
          </h1>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreVertical size={20} />
        </Button>
      </div>

      {/* Document Content */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto document-viewer"
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        {renderDocumentContent()}
      </div>

      {/* Dictionary Popup */}
      {selectedWord && (
        <DictionaryPopup
          word={selectedWord}
          definition={getDefinition()}
          position={popupPosition}
          onClose={closeDictionary}
          onLookUp={handleDictionaryLookup}
          onSave={handleSaveWord}
        />
      )}

      {/* Floating Action Button */}
      <button 
        className="floating-action-button"
        onClick={() => setShowAIAssistant(!showAIAssistant)}
      >
        <Edit3 size={24} />
      </button>

      {/* AI Assistant Button (Premium Feature) */}
      <button 
        className="floating-action-button"
        style={{ bottom: '140px', background: '#10b981' }}
        onClick={handleAIAssistant}
      >
        <Sparkles size={24} />
      </button>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <AIAssistant
          document={document}
          onClose={() => setShowAIAssistant(false)}
          isPremium={isPremiumUser}
        />
      )}
    </div>
  );
};

export default DocumentViewer;

