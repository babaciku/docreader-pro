import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Languages, 
  BarChart3,
  Loader2,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import aiService from '../utils/aiService';

const AIAssistant = ({ document, onClose, isPremium = false }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        type: 'assistant',
        content: isPremium 
          ? 'Hello! I\'m your AI assistant. I can help you summarize documents, answer questions, translate text, and analyze content. What would you like to know about this document?'
          : 'Hello! I\'m your AI assistant. Upgrade to Premium to unlock AI features like document summarization, Q&A, and translation.',
        timestamp: new Date()
      }]);
    }
  }, [isPremium, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!isPremium) {
      alert('Please upgrade to Premium to use AI features');
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.askQuestion(document.content, inputMessage);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.success ? response.data.answer : response.fallback?.answer || 'I apologize, but I couldn\'t process your question at the moment.',
        confidence: response.success ? response.data.confidence : response.fallback?.confidence,
        timestamp: new Date(),
        demoMode: response.fallback?.demo_mode || false
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your question. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!isPremium) {
      alert('Please upgrade to Premium to use AI summarization');
      return;
    }

    setIsLoading(true);
    try {
      const response = await aiService.summarizeDocument(document.content, { length: 'brief' });
      setSummary(response.success ? response.data : response.fallback);
    } catch (error) {
      console.error('Summarization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!isPremium) {
      alert('Please upgrade to Premium to use AI analysis');
      return;
    }

    setIsLoading(true);
    try {
      const response = await aiService.analyzeDocument(document.content);
      setAnalysis(response.success ? response.data : response.fallback);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!isPremium) {
      alert('Please upgrade to Premium to use AI translation');
      return;
    }

    setIsLoading(true);
    try {
      const response = await aiService.translateText(
        document.content.substring(0, 500), // Translate first 500 characters for demo
        { targetLanguage }
      );
      setTranslation(response.success ? response.data : response.fallback);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChatTab = () => (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.confidence && (
                <p className="text-xs opacity-70 mt-1">
                  Confidence: {Math.round(message.confidence * 100)}%
                  {message.demoMode && ' (Demo Mode)'}
                </p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <Loader2 className="animate-spin" size={16} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            placeholder={isPremium ? "Ask a question about this document..." : "Upgrade to Premium to ask questions"}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!isPremium || isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!isPremium || !inputMessage.trim() || isLoading}
            size="sm"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSummaryTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Document Summary</h3>
        <Button 
          onClick={handleSummarize} 
          disabled={!isPremium || isLoading}
          size="sm"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Generate'}
        </Button>
      </div>

      {!isPremium && (
        <div className="bg-muted p-4 rounded-lg text-center">
          <Crown className="mx-auto mb-2 text-yellow-500" size={24} />
          <p className="text-sm text-muted-foreground">
            Upgrade to Premium to generate AI-powered document summaries
          </p>
        </div>
      )}

      {summary && (
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-sm leading-relaxed">{summary.summary}</p>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Words: {summary.word_count}</span>
              <span>Confidence: {Math.round(summary.confidence * 100)}%</span>
              {summary.demo_mode && <span>Demo Mode</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTranslationTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Translation</h3>
        <div className="flex items-center space-x-2">
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1"
            disabled={!isPremium}
          >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
          <Button 
            onClick={handleTranslate} 
            disabled={!isPremium || isLoading}
            size="sm"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Translate'}
          </Button>
        </div>
      </div>

      {!isPremium && (
        <div className="bg-muted p-4 rounded-lg text-center">
          <Crown className="mx-auto mb-2 text-yellow-500" size={24} />
          <p className="text-sm text-muted-foreground">
            Upgrade to Premium to translate documents into multiple languages
          </p>
        </div>
      )}

      {translation && (
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-sm leading-relaxed">{translation.translated_text}</p>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>From: {translation.detected_language}</span>
              <span>To: {translation.target_language}</span>
              <span>Confidence: {Math.round(translation.confidence * 100)}%</span>
              {translation.demo_mode && <span>Demo Mode</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalysisTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Document Analysis</h3>
        <Button 
          onClick={handleAnalyze} 
          disabled={!isPremium || isLoading}
          size="sm"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Analyze'}
        </Button>
      </div>

      {!isPremium && (
        <div className="bg-muted p-4 rounded-lg text-center">
          <Crown className="mx-auto mb-2 text-yellow-500" size={24} />
          <p className="text-sm text-muted-foreground">
            Upgrade to Premium to get detailed document analysis and insights
          </p>
        </div>
      )}

      {analysis && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Word Count</p>
              <p className="text-lg font-semibold">{analysis.analysis.word_count}</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Reading Time</p>
              <p className="text-lg font-semibold">{analysis.analysis.reading_time_minutes} min</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Complexity</p>
              <p className="text-lg font-semibold">{analysis.analysis.complexity_level}</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Sentiment</p>
              <p className="text-lg font-semibold">{analysis.analysis.sentiment}</p>
            </div>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-2">Key Topics</p>
            <div className="flex flex-wrap gap-1">
              {analysis.analysis.key_topics.map((topic, index) => (
                <span 
                  key={index}
                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'chat', label: 'Q&A', icon: MessageSquare, component: renderChatTab },
    { id: 'summary', label: 'Summary', icon: FileText, component: renderSummaryTab },
    { id: 'translate', label: 'Translate', icon: Languages, component: renderTranslationTab },
    { id: 'analyze', label: 'Analyze', icon: BarChart3, component: renderAnalysisTab }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center">
            <Sparkles className="text-primary mr-2" size={20} />
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            {!isPremium && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                Premium Required
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center p-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon size={16} className="mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {tabs.find(tab => tab.id === activeTab)?.component()}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

