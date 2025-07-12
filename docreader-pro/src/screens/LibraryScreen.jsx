import React, { useState } from 'react';
import { Star, Bookmark, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import DocumentCard from '../components/DocumentCard';

const LibraryScreen = ({ onDocumentOpen }) => {
  const [activeSection, setActiveSection] = useState('favorites');

  // Sample library data
  const libraryData = {
    favorites: [
      {
        id: 7,
        name: 'Design Guidelines.pdf',
        type: 'pdf',
        size: 1024 * 1024 * 1.8,
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        content: `# DocReader Pro Design Guidelines

## Introduction
This document outlines the design principles and guidelines for DocReader Pro, ensuring consistency and quality across all user interface elements.

## Design Philosophy

### Minimalism
- Remove unnecessary elements that don't serve a clear purpose
- Use white space effectively to create breathing room
- Focus on content hierarchy and readability
- Avoid visual clutter that distracts from the primary task

### Mobile-First Approach
- Design for touch interactions with appropriate target sizes
- Consider thumb-friendly navigation patterns
- Optimize for various screen sizes and orientations
- Ensure accessibility across different devices

### Performance-Conscious Design
- Minimize the use of heavy graphics and animations
- Optimize images and assets for fast loading
- Use system fonts when possible to reduce bundle size
- Implement progressive loading for better perceived performance

## Visual Design System

### Color Palette
Primary Colors:
- Blue 600 (#2563EB) - Primary actions and branding
- Slate 800 (#1E293B) - Primary text and headings
- Slate 50 (#F8FAFC) - Background and neutral areas

Secondary Colors:
- Emerald 500 (#10B981) - Success states and positive actions
- Red 500 (#EF4444) - Error states and destructive actions
- Slate 500 (#64748B) - Secondary text and subtle elements

### Typography
Font Family: Inter (system fallback)
- Heading 1: 24px, Bold, 1.2 line height
- Heading 2: 20px, Bold, 1.3 line height
- Heading 3: 18px, Semibold, 1.4 line height
- Body Text: 16px, Regular, 1.6 line height
- Caption: 14px, Medium, 1.5 line height
- Small Text: 12px, Regular, 1.4 line height

### Spacing System
Based on 8px grid:
- Extra Small: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px
- XXL: 48px

### Border Radius
- Small: 4px (buttons, inputs)
- Medium: 8px (cards, containers)
- Large: 12px (modals, overlays)
- Extra Large: 16px (major containers)

## Component Guidelines

### Buttons
Primary Button:
- Background: Blue 600
- Text: White
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: Medium

Secondary Button:
- Background: Transparent
- Border: 1px solid Slate 300
- Text: Slate 700
- Same padding and radius as primary

### Cards
- Background: White
- Border: 1px solid Slate 200
- Border Radius: 8px
- Padding: 16px
- Shadow: Subtle (0 1px 3px rgba(0,0,0,0.1))

### Navigation
Bottom Navigation:
- Height: 64px
- Background: White
- Border Top: 1px solid Slate 200
- Icons: 20px, Slate 500 (inactive), Blue 600 (active)
- Labels: 12px, Medium weight

### Forms
Input Fields:
- Height: 44px (minimum touch target)
- Border: 1px solid Slate 300
- Border Radius: 8px
- Padding: 12px 16px
- Focus state: Blue 600 border

## Interaction Design

### Touch Targets
- Minimum size: 44px x 44px
- Recommended size: 48px x 48px for primary actions
- Spacing between targets: minimum 8px

### Animations
- Duration: 200ms for micro-interactions
- Easing: ease-in-out for natural feel
- Use sparingly to avoid performance impact
- Focus on functional animations over decorative

### Feedback
- Visual feedback for all interactive elements
- Loading states for operations taking >200ms
- Error states with clear messaging
- Success confirmations for important actions

## Accessibility

### Color Contrast
- Text on background: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: minimum 3:1 ratio

### Typography
- Minimum font size: 12px
- Recommended minimum: 14px for body text
- Support for system font scaling
- Clear hierarchy with appropriate contrast

### Navigation
- Logical tab order for keyboard navigation
- Clear focus indicators
- Descriptive labels for screen readers
- Alternative text for images and icons

## Platform Considerations

### iOS Specific
- Respect safe area insets
- Use iOS-style navigation patterns
- Follow Apple's Human Interface Guidelines
- Support dark mode

### Android Specific
- Follow Material Design principles where appropriate
- Support Android's back button behavior
- Adapt to various screen densities
- Consider Android-specific navigation patterns

## Implementation Notes

### Performance
- Lazy load components when possible
- Optimize images for different screen densities
- Use CSS transforms for animations
- Minimize re-renders with proper state management

### Maintenance
- Document all design decisions
- Maintain a living style guide
- Regular design reviews and updates
- Gather user feedback for continuous improvement

## Conclusion
These guidelines serve as the foundation for creating a consistent, accessible, and performant user experience in DocReader Pro. Regular review and updates ensure the design system evolves with user needs and platform capabilities.`
      }
    ],
    bookmarks: [
      {
        id: 8,
        name: 'API Documentation.pdf',
        type: 'pdf',
        size: 1024 * 1024 * 2.5,
        lastModified: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        content: `# DocReader Pro API Documentation

## Overview
The DocReader Pro API provides programmatic access to document processing and AI-powered features for premium subscribers.

## Authentication
All API requests require authentication using API keys:

\`\`\`
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

## Endpoints

### Document Processing

#### Upload Document
\`POST /api/v1/documents\`

Upload a document for processing.

Request:
\`\`\`json
{
  "file": "base64_encoded_content",
  "filename": "document.pdf",
  "type": "pdf"
}
\`\`\`

Response:
\`\`\`json
{
  "document_id": "doc_123456",
  "status": "processing",
  "created_at": "2025-01-15T10:30:00Z"
}
\`\`\`

#### Get Document Status
\`GET /api/v1/documents/{document_id}\`

Check the processing status of a document.

Response:
\`\`\`json
{
  "document_id": "doc_123456",
  "status": "completed",
  "text_content": "extracted text...",
  "page_count": 15,
  "file_size": 1048576
}
\`\`\`

### AI Features

#### Generate Summary
\`POST /api/v1/documents/{document_id}/summarize\`

Generate an AI-powered summary of the document.

Request:
\`\`\`json
{
  "length": "brief|detailed|custom",
  "max_words": 200
}
\`\`\`

Response:
\`\`\`json
{
  "summary": "This document discusses...",
  "word_count": 150,
  "confidence": 0.95
}
\`\`\`

#### Document Q&A
\`POST /api/v1/documents/{document_id}/qa\`

Ask questions about document content.

Request:
\`\`\`json
{
  "question": "What are the main conclusions?",
  "context_length": 500
}
\`\`\`

Response:
\`\`\`json
{
  "answer": "The main conclusions are...",
  "confidence": 0.88,
  "source_pages": [3, 7, 12]
}
\`\`\`

#### Translate Text
\`POST /api/v1/translate\`

Translate text or document content.

Request:
\`\`\`json
{
  "text": "Hello, world!",
  "source_language": "en",
  "target_language": "es"
}
\`\`\`

Response:
\`\`\`json
{
  "translated_text": "¡Hola, mundo!",
  "confidence": 0.99,
  "detected_language": "en"
}
\`\`\`

## Error Handling

All errors return appropriate HTTP status codes with detailed error messages:

\`\`\`json
{
  "error": {
    "code": "INVALID_DOCUMENT",
    "message": "The uploaded file is not a valid PDF document",
    "details": "File format not supported"
  }
}
\`\`\`

Common error codes:
- \`INVALID_API_KEY\`: Authentication failed
- \`QUOTA_EXCEEDED\`: API usage limit reached
- \`INVALID_DOCUMENT\`: Document format not supported
- \`PROCESSING_FAILED\`: Document processing error
- \`RATE_LIMITED\`: Too many requests

## Rate Limits

API usage is limited based on subscription tier:
- Free tier: 10 requests/hour
- Premium tier: 1000 requests/hour
- Enterprise tier: 10000 requests/hour

## SDKs and Libraries

Official SDKs are available for:
- JavaScript/Node.js
- Python
- Swift (iOS)
- Kotlin (Android)
- React Native

Example usage (JavaScript):
\`\`\`javascript
import DocReaderAPI from 'docreader-pro-sdk';

const client = new DocReaderAPI('your-api-key');

// Upload and process document
const document = await client.uploadDocument('path/to/file.pdf');

// Generate summary
const summary = await client.summarize(document.id, {
  length: 'brief',
  max_words: 100
});

console.log(summary.text);
\`\`\`

## Webhooks

Configure webhooks to receive notifications about document processing:

\`POST /api/v1/webhooks\`

\`\`\`json
{
  "url": "https://your-app.com/webhook",
  "events": ["document.completed", "document.failed"]
}
\`\`\`

Webhook payload:
\`\`\`json
{
  "event": "document.completed",
  "document_id": "doc_123456",
  "timestamp": "2025-01-15T10:35:00Z",
  "data": {
    "status": "completed",
    "page_count": 15
  }
}
\`\`\`

## Best Practices

1. **Caching**: Cache API responses when possible to reduce usage
2. **Error Handling**: Implement proper retry logic for transient errors
3. **Security**: Never expose API keys in client-side code
4. **Optimization**: Batch requests when processing multiple documents
5. **Monitoring**: Track API usage to avoid quota limits

## Support

For API support and questions:
- Documentation: https://docs.docreaderpro.com
- Support Email: api-support@docreaderpro.com
- Developer Forum: https://forum.docreaderpro.com
- Status Page: https://status.docreaderpro.com`
      }
    ],
    recent: [
      {
        id: 9,
        name: 'Team Presentation.pptx',
        type: 'ppt',
        size: 1024 * 1024 * 4.2,
        lastModified: new Date(Date.now() - 6 * 60 * 60 * 1000),
        content: `# DocReader Pro: Revolutionizing Mobile Document Reading

## Slide 1: Title Slide
**DocReader Pro**
*Lightweight. Powerful. Intelligent.*

Transforming how you read documents on mobile devices

---

## Slide 2: The Problem
Current mobile document readers are:
- **Bloated** with unnecessary features
- **Slow** to load and navigate
- **Resource-intensive** draining battery
- **Complex** with confusing interfaces
- **Limited** offline capabilities

---

## Slide 3: Our Solution
DocReader Pro delivers:
✅ **Lightning-fast** performance
✅ **Minimal** resource usage
✅ **Intuitive** mobile-first design
✅ **Comprehensive** offline features
✅ **AI-powered** premium capabilities

---

## Slide 4: Key Features

### Core Features (Free)
- Multi-format document support (PDF, DOC, TXT)
- Smooth scrolling and zoom
- Offline dictionary with 50,000+ words
- Search and bookmarks
- Clean, distraction-free interface

### Premium Features
- AI document summarization
- Intelligent Q&A with documents
- Real-time translation (50+ languages)
- Cloud sync and backup
- Advanced annotations

---

## Slide 5: Competitive Advantage

| Feature | DocReader Pro | Adobe Reader | WPS Office |
|---------|---------------|--------------|------------|
| App Size | 50MB | 150MB+ | 200MB+ |
| Startup Time | <2 seconds | 5-8 seconds | 6-10 seconds |
| Offline Dictionary | ✅ | ❌ | ❌ |
| AI Features | ✅ | Limited | ❌ |
| Mobile-First UI | ✅ | ❌ | ❌ |

---

## Slide 6: Target Market

### Primary Users
- **Business Professionals** (35%)
- **Students** (30%)
- **Researchers** (20%)
- **General Consumers** (15%)

### Market Size
- Total Addressable Market: $2.1B
- Serviceable Market: $450M
- Target Market Share: 2-3% in Year 3

---

## Slide 7: Technology Stack

### Frontend
- React Native for cross-platform development
- Redux for state management
- SQLite for offline data storage

### Backend
- Node.js API services
- Cloud AI integration (OpenAI, Google)
- AWS infrastructure for scalability

### Performance
- Optimized rendering engine
- Lazy loading architecture
- Efficient memory management

---

## Slide 8: Monetization Strategy

### Freemium Model
- **Free Tier**: Core reading features + offline dictionary
- **Premium Tier**: $4.99/month or $39.99/year
  - AI summarization and Q&A
  - Translation services
  - Cloud sync
  - Priority support

### Revenue Projections
- Year 1: $125K (2,500 premium users)
- Year 2: $750K (15,000 premium users)
- Year 3: $2.1M (42,000 premium users)

---

## Slide 9: Development Roadmap

### Phase 1 (Q1 2025) - MVP
- Core document viewing
- Offline dictionary
- Basic file management

### Phase 2 (Q2 2025) - Enhanced Features
- Advanced annotations
- Search improvements
- Performance optimization

### Phase 3 (Q3 2025) - AI Integration
- Document summarization
- Q&A capabilities
- Translation services

### Phase 4 (Q4 2025) - Scale & Polish
- Enterprise features
- Advanced analytics
- Market expansion

---

## Slide 10: Team & Expertise

### Core Team
- **Sarah Johnson** - Product Manager (5 years mobile apps)
- **Mike Chen** - Lead Developer (8 years React Native)
- **Lisa Rodriguez** - UX Designer (6 years mobile UX)
- **David Kim** - QA Engineer (4 years mobile testing)

### Advisors
- Former Adobe product executive
- Mobile app monetization expert
- AI/ML technology consultant

---

## Slide 11: Market Validation

### User Research
- 500+ interviews with target users
- 85% expressed interest in lightweight alternative
- 72% willing to pay for AI features
- 91% value offline capabilities

### Beta Testing
- 100 beta users recruited
- 4.7/5 average rating
- 89% completion rate for onboarding
- 67% daily active usage

---

## Slide 12: Financial Projections

### Revenue Growth
- Year 1: $125,000
- Year 2: $750,000
- Year 3: $2,100,000

### Key Metrics
- Customer Acquisition Cost: $12
- Customer Lifetime Value: $85
- Monthly Churn Rate: 5%
- Premium Conversion Rate: 15%

### Funding Requirements
- Seed Round: $500K (completed)
- Series A: $2M (seeking)
- Use of funds: 60% development, 25% marketing, 15% operations

---

## Slide 13: Go-to-Market Strategy

### Launch Plan
1. **App Store Optimization** - Target "PDF reader" keywords
2. **Content Marketing** - Productivity blogs and forums
3. **Social Media** - LinkedIn and Twitter campaigns
4. **Partnerships** - Integration with productivity tools
5. **PR Campaign** - Tech publication coverage

### Success Metrics
- 10K downloads in first month
- 4.5+ app store rating
- 15% premium conversion rate
- 50% user retention at 30 days

---

## Slide 14: Risk Analysis

### Technical Risks
- **Mitigation**: Experienced development team, proven technology stack
- **Contingency**: Phased rollout, extensive testing

### Market Risks
- **Competition**: Focus on differentiation through AI and performance
- **User Adoption**: Strong beta feedback validates market need

### Financial Risks
- **Revenue**: Conservative projections, multiple monetization streams
- **Funding**: Strong investor interest, proven team track record

---

## Slide 15: Call to Action

### Next Steps
1. **Complete Series A funding** - $2M target
2. **Finalize development team** - 2 additional engineers
3. **Launch beta program** - 1,000 users
4. **Prepare for public launch** - Q2 2025

### Contact Information
- **Email**: team@docreaderpro.com
- **Website**: www.docreaderpro.com
- **Demo**: Available for immediate testing

**Thank you for your time and consideration!**`
      }
    ]
  };

  const sections = [
    { id: 'favorites', label: 'Favorites', icon: Star, count: libraryData.favorites.length },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: libraryData.bookmarks.length },
    { id: 'recent', label: 'Recent', icon: Clock, count: libraryData.recent.length }
  ];

  const currentData = libraryData[activeSection] || [];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-white border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Library</h1>
        
        {/* Section Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {section.label}
                <span className="ml-2 text-xs bg-muted-foreground/20 text-muted-foreground px-2 py-0.5 rounded-full">
                  {section.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {currentData.length > 0 ? (
          <div className="space-y-3">
            {currentData.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onClick={onDocumentOpen}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No {sections.find(s => s.id === activeSection)?.label.toLowerCase()} yet
            </h3>
            <p className="text-muted-foreground mb-4">
              {activeSection === 'favorites' && "Star documents to add them to your favorites"}
              {activeSection === 'bookmarks' && "Bookmark important sections while reading"}
              {activeSection === 'recent' && "Your recently opened documents will appear here"}
            </p>
            <Button variant="outline">
              Browse Documents
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryScreen;

