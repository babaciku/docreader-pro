import { useState, useEffect } from 'react';
import './App.css';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import BrowseScreen from './screens/BrowseScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import DocumentViewer from './screens/DocumentViewer';
import ErrorBoundary from './components/ErrorBoundary';
import dictionaryLoader from './utils/dictionaryLoader';
import performanceOptimizer from './utils/performanceOptimizer';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the dictionary on app start
    const initializeApp = async () => {
      const startTime = performance.now();
      await dictionaryLoader.loadDictionaryFromFiles();
      const loadTime = performance.now() - startTime;
      
      // Log performance metrics
      performanceOptimizer.metrics.dictionaryLoadTime = loadTime;
      console.log(`Dictionary loaded in ${loadTime.toFixed(2)}ms`);
      
      setIsLoading(false);
      
      // Measure total app load time
      const totalLoadTime = performanceOptimizer.measureLoadTime();
      console.log(`Total app load time: ${totalLoadTime.toFixed(2)}ms`);
    };
    
    initializeApp();
  }, []);

  const handleDocumentOpen = (document) => {
    setCurrentDocument(document);
  };

  const handleBackToHome = () => {
    setCurrentDocument(null);
    setActiveTab('home');
  };

  if (isLoading) {
    return (
      <div className="mobile-container">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading DocReader Pro...</p>
            <p className="text-sm text-muted-foreground mt-2">Initializing offline dictionary...</p>
          </div>
        </div>
      </div>
    );
  }

  // If a document is open, show the document viewer
  if (currentDocument) {
    return (
      <div className="mobile-container">
        <DocumentViewer 
          document={currentDocument} 
          onBack={handleBackToHome}
        />
      </div>
    );
  }

  // Main app navigation
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onDocumentOpen={handleDocumentOpen} />;
      case 'browse':
        return <BrowseScreen onDocumentOpen={handleDocumentOpen} />;
      case 'library':
        return <LibraryScreen onDocumentOpen={handleDocumentOpen} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onDocumentOpen={handleDocumentOpen} />;
    }
  };

  return (
    <ErrorBoundary onNavigateHome={() => {
      setCurrentDocument(null);
      setActiveTab('home');
    }}>
      <div className="mobile-container">
        {renderScreen()}
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

