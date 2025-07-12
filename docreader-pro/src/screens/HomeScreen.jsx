import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import DocumentCard from '../components/DocumentCard';

const HomeScreen = ({ onDocumentOpen }) => {
  // Sample recent documents data
  const recentDocuments = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: 1024 * 1024 * 1.2, // 1.2 MB
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      content: `# Project Proposal: DocReader Pro

## Executive Summary

DocReader Pro represents a revolutionary approach to mobile document reading, combining the essential features of established readers like WPS Office and Adobe Reader while maintaining a lightweight, user-focused design philosophy.

## Key Features

### Core Document Reading
- Support for PDF, DOC, DOCX, and TXT formats
- Smooth scrolling and intuitive zoom controls
- Advanced search capabilities within documents
- Bookmark and annotation support

### Offline Dictionary Integration
Our innovative offline dictionary feature allows users to instantly look up word definitions without requiring an internet connection. Simply long-press any word in a document to see its definition in a clean, non-intrusive popup.

### AI-Powered Premium Features
Premium subscribers gain access to cutting-edge AI capabilities:
- **Smart Summarization**: Generate concise summaries of lengthy documents
- **Document Q&A**: Ask questions about document content and receive intelligent answers
- **Real-time Translation**: Translate selected text or entire documents

## Market Opportunity

The mobile document reader market is dominated by feature-heavy applications that often sacrifice performance for functionality. DocReader Pro addresses this gap by focusing on core reading experiences while selectively adding high-value features.

## Technical Architecture

Built using modern React Native technology, DocReader Pro ensures cross-platform compatibility while maintaining native performance. Our lightweight architecture prioritizes:
- Fast startup times (under 2 seconds)
- Minimal memory footprint (under 100MB)
- Efficient battery usage
- Responsive user interface

## Competitive Advantages

1. **Lightweight Design**: Significantly smaller app size compared to competitors
2. **Offline Capabilities**: Full dictionary access without internet dependency
3. **AI Integration**: Modern AI features for enhanced productivity
4. **User Experience**: Clean, intuitive interface designed for mobile-first usage

## Implementation Timeline

- **Phase 1** (Months 1-2): Core document viewing and file management
- **Phase 2** (Months 3-4): Offline dictionary integration and basic annotations
- **Phase 3** (Months 5-6): AI features and premium subscription model
- **Phase 4** (Months 7-8): Testing, optimization, and market launch

## Revenue Model

DocReader Pro employs a freemium model:
- **Free Tier**: Core document reading and offline dictionary
- **Premium Tier** ($4.99/month): AI features, cloud sync, advanced annotations

## Conclusion

DocReader Pro is positioned to capture significant market share by delivering a focused, high-performance document reading experience that respects both user time and device resources.`
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      type: 'doc',
      size: 1024 * 400, // 400 KB
      lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      content: `# Weekly Team Meeting Notes
Date: January 15, 2025

## Attendees
- Sarah Johnson (Product Manager)
- Mike Chen (Lead Developer)
- Lisa Rodriguez (UX Designer)
- David Kim (QA Engineer)

## Agenda Items

### 1. DocReader Pro Development Update
Mike provided an update on the current development status:
- Core PDF rendering engine is 90% complete
- Dictionary integration is in progress
- UI components are finalized and tested

**Action Items:**
- Complete dictionary database optimization by Friday
- Begin AI integration research next week
- Schedule user testing sessions for next month

### 2. Design Review
Lisa presented the latest UI mockups:
- Home screen design approved
- Document viewer layout needs minor adjustments
- Dictionary popup design is excellent

**Feedback:**
- Increase font size for better readability
- Add dark mode support for night reading
- Consider adding reading progress indicators

### 3. Quality Assurance Planning
David outlined the testing strategy:
- Unit tests for core components
- Integration testing for dictionary lookup
- Performance testing on various devices
- User acceptance testing with beta users

**Timeline:**
- Testing phase begins February 1st
- Beta release targeted for February 15th
- Final release planned for March 1st

### 4. Marketing Strategy
Sarah discussed go-to-market plans:
- App store optimization research
- Competitor analysis completion
- Pricing strategy finalization
- Launch campaign planning

## Next Steps
1. Complete current sprint objectives
2. Prepare demo for stakeholder review
3. Finalize beta testing participant list
4. Review and approve marketing materials

## Meeting Conclusion
The team is on track for the planned release timeline. All major components are progressing well, with only minor adjustments needed based on user feedback.

Next meeting scheduled for January 22, 2025.`
    },
    {
      id: 3,
      name: 'User Manual.pdf',
      type: 'pdf',
      size: 1024 * 1024 * 2.1, // 2.1 MB
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      content: `# DocReader Pro User Manual

## Table of Contents
1. Getting Started
2. Basic Navigation
3. Document Management
4. Reading Features
5. Dictionary Usage
6. Premium Features
7. Settings and Preferences
8. Troubleshooting

## 1. Getting Started

Welcome to DocReader Pro, your lightweight and powerful document reading companion. This manual will guide you through all the features and capabilities of the application.

### Installation
DocReader Pro is available for download from:
- Apple App Store (iOS 13.0 and later)
- Google Play Store (Android 5.0 and later)

### First Launch
Upon first opening DocReader Pro, you'll be greeted with a welcome screen that introduces the key features. The app will request permission to access your device's storage to read documents.

## 2. Basic Navigation

### Home Screen
The home screen displays your recently opened documents for quick access. Each document shows:
- File name and type
- File size
- Last modified date
- Quick preview thumbnail

### Bottom Navigation
Four main sections are accessible via the bottom navigation bar:
- **Home**: Recent documents and quick access
- **Browse**: File explorer for finding documents
- **Library**: Bookmarks, favorites, and reading history
- **Settings**: App preferences and account management

## 3. Document Management

### Opening Documents
Documents can be opened in several ways:
- Tap any recent document on the home screen
- Browse and select files using the file explorer
- Import documents from other apps using the share function

### Supported Formats
DocReader Pro supports the following document formats:
- PDF (Portable Document Format)
- DOC/DOCX (Microsoft Word)
- TXT (Plain Text)
- RTF (Rich Text Format)

### File Organization
The browse screen allows you to:
- Navigate folder structures
- Sort files by name, date, or size
- Search for specific documents
- Create and manage bookmarks

## 4. Reading Features

### Navigation Controls
While reading a document, you can:
- Scroll vertically through pages
- Pinch to zoom in and out
- Double-tap to fit content to screen
- Use page navigation controls

### Search Functionality
Find specific content within documents:
- Tap the search icon in the document viewer
- Enter your search term
- Navigate between search results
- Highlight all instances of the search term

### Bookmarks and Annotations
Mark important sections:
- Long-press to create bookmarks
- Add text annotations and notes
- Highlight important passages
- Access all annotations from the library

## 5. Dictionary Usage

### Word Lookup
DocReader Pro includes a comprehensive offline dictionary:
- Long-press any word in a document
- View definition in a popup overlay
- Access pronunciation guides
- Save words to your personal vocabulary list

### Dictionary Features
- Over 50,000 word definitions
- Works completely offline
- Includes synonyms and antonyms
- Etymology and word origins
- Usage examples and context

## 6. Premium Features

### AI-Powered Summarization
Premium subscribers can generate intelligent summaries:
- Tap the AI assistant button while reading
- Select "Summarize Document"
- Choose summary length (brief, detailed, or custom)
- Save summaries for later reference

### Document Q&A
Ask questions about document content:
- Access the AI assistant
- Type your question about the document
- Receive contextual answers based on content
- Follow up with additional questions

### Translation Services
Translate text or entire documents:
- Select text for translation
- Choose target language
- View translations in overlay
- Support for 50+ languages

## 7. Settings and Preferences

### Reading Preferences
Customize your reading experience:
- Adjust font size and type
- Choose between light and dark themes
- Set default zoom levels
- Configure page transition animations

### Dictionary Settings
Personalize dictionary behavior:
- Enable/disable automatic word lookup
- Customize popup appearance
- Manage saved vocabulary lists
- Set pronunciation preferences

### Account Management
For premium subscribers:
- Manage subscription status
- Sync settings across devices
- Access usage statistics
- Configure cloud backup

## 8. Troubleshooting

### Common Issues

**App won't open documents:**
- Ensure the file format is supported
- Check file permissions
- Restart the app if necessary

**Dictionary not working:**
- Verify offline dictionary is downloaded
- Check available storage space
- Reset dictionary database if needed

**Performance issues:**
- Close other running apps
- Clear app cache
- Restart your device
- Update to latest app version

### Getting Help
If you need additional assistance:
- Visit our support website
- Contact customer support
- Check the FAQ section
- Join our user community forum

## Conclusion

DocReader Pro is designed to provide a seamless, efficient document reading experience. This manual covers the essential features, but we encourage you to explore and discover additional capabilities as you use the app.

For the latest updates and feature announcements, follow us on social media or check the app's news section.

Happy reading!`
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <Button size="sm" className="rounded-full w-10 h-10 p-0">
          <Plus size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Documents</h2>
        
        <div className="space-y-3">
          {recentDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={onDocumentOpen}
            />
          ))}
        </div>

        {recentDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No recent documents</p>
            <Button variant="outline">
              Browse Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;

