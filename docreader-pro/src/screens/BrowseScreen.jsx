import React, { useState } from 'react';
import { Search, Folder, ChevronRight, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import DocumentCard from '../components/DocumentCard';

const BrowseScreen = ({ onDocumentOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('/Documents');

  // Sample folder structure
  const folders = [
    { name: 'Work Documents', itemCount: 12, path: '/Documents/Work' },
    { name: 'Personal', itemCount: 8, path: '/Documents/Personal' },
    { name: 'Projects', itemCount: 15, path: '/Documents/Projects' },
    { name: 'Archive', itemCount: 23, path: '/Documents/Archive' }
  ];

  // Sample files in current directory
  const files = [
    {
      id: 4,
      name: 'Budget Report.xlsx',
      type: 'xls',
      size: 1024 * 340, // 340 KB
      lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      content: `# Budget Report Q4 2024

## Executive Summary
This quarterly budget report provides a comprehensive overview of our financial performance and projections for the upcoming period.

## Revenue Analysis
- Total Revenue: $2,450,000
- Growth Rate: 12% YoY
- Primary Revenue Streams:
  - Product Sales: 65%
  - Services: 25%
  - Licensing: 10%

## Expense Breakdown
- Personnel: $980,000 (40%)
- Operations: $735,000 (30%)
- Marketing: $490,000 (20%)
- R&D: $245,000 (10%)

## Key Performance Indicators
- Profit Margin: 18.5%
- Customer Acquisition Cost: $125
- Customer Lifetime Value: $2,800
- Monthly Recurring Revenue: $205,000

## Recommendations
1. Increase investment in high-performing marketing channels
2. Optimize operational efficiency to reduce costs
3. Expand product line based on customer feedback
4. Consider strategic partnerships for market expansion

## Conclusion
The financial outlook remains positive with strong growth indicators and healthy profit margins.`
    },
    {
      id: 5,
      name: 'Research Paper.pdf',
      type: 'pdf',
      size: 1024 * 1024 * 3.2, // 3.2 MB
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      content: `# The Impact of Mobile Technology on Document Consumption Patterns

## Abstract
This research paper examines how mobile technology has fundamentally changed the way people consume, interact with, and process digital documents. Through comprehensive analysis of user behavior patterns and technological capabilities, we explore the evolution from desktop-centric document workflows to mobile-first approaches.

## Introduction
The proliferation of smartphones and tablets has created unprecedented opportunities for document accessibility and consumption. Traditional document readers, designed for desktop environments, often fail to address the unique constraints and opportunities presented by mobile devices.

## Literature Review
Previous studies have identified several key factors influencing mobile document consumption:
- Screen size limitations and their impact on readability
- Touch-based interaction paradigms
- Offline accessibility requirements
- Battery life considerations
- Processing power constraints

## Methodology
Our research employed a mixed-methods approach:
- Quantitative analysis of user interaction data from 10,000 mobile document readers
- Qualitative interviews with 50 professionals across various industries
- Usability testing of existing mobile document applications
- Performance benchmarking of current solutions

## Findings

### User Behavior Patterns
1. **Session Duration**: Mobile document reading sessions average 8.5 minutes, significantly shorter than desktop sessions (23.2 minutes)
2. **Interaction Frequency**: Users interact with documents 3.2 times more frequently on mobile devices
3. **Feature Usage**: Dictionary lookup and search functions are used 5x more on mobile platforms

### Technical Challenges
- Memory constraints limit document size handling
- Network connectivity affects cloud-based features
- Battery optimization requires careful resource management
- Cross-platform compatibility issues

### Opportunities for Innovation
- AI-powered content summarization
- Offline-first architecture design
- Context-aware feature presentation
- Gesture-based navigation systems

## Discussion
The research reveals a clear trend toward lightweight, focused applications that prioritize core functionality over feature completeness. Users consistently prefer applications that load quickly, consume minimal resources, and provide seamless offline experiences.

### Implications for Design
1. **Minimalist Interface**: Reduce visual clutter to maximize content visibility
2. **Progressive Enhancement**: Load features on-demand rather than upfront
3. **Offline Capabilities**: Ensure core functionality works without internet connectivity
4. **Performance Optimization**: Prioritize speed and responsiveness over feature richness

## Recommendations

### For Developers
- Implement lazy loading for non-essential features
- Optimize for low-memory devices
- Design touch-first interaction patterns
- Provide comprehensive offline functionality

### For Organizations
- Adopt mobile-first document strategies
- Train users on mobile-specific workflows
- Invest in mobile-optimized document formats
- Consider security implications of mobile access

## Limitations
This study focused primarily on English-language documents and may not fully represent global usage patterns. Additionally, the rapid pace of technological change means findings may require regular updates.

## Future Research
- Cross-cultural analysis of mobile document consumption
- Impact of emerging technologies (AR/VR) on document interaction
- Long-term effects of mobile-first document workflows
- Accessibility considerations for diverse user populations

## Conclusion
Mobile technology has fundamentally transformed document consumption patterns, creating both challenges and opportunities for developers and users alike. Success in this space requires a deep understanding of mobile-specific constraints and user expectations, combined with innovative approaches to traditional document management problems.

The future of mobile document consumption lies in applications that embrace the unique characteristics of mobile devices while providing powerful, efficient tools for document interaction and analysis.

## References
[1] Smith, J. et al. (2023). "Mobile Reading Patterns in Professional Environments"
[2] Johnson, M. (2024). "Optimizing Document Applications for Mobile Devices"
[3] Chen, L. & Rodriguez, A. (2023). "User Experience Design for Mobile Document Readers"
[4] Williams, K. (2024). "Performance Benchmarking of Mobile PDF Viewers"
[5] Davis, R. et al. (2023). "Offline-First Architecture for Mobile Applications"`
    },
    {
      id: 6,
      name: 'Quick Notes.txt',
      type: 'txt',
      size: 1024 * 12, // 12 KB
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      content: `DocReader Pro Development Notes

TODO:
- Implement PDF rendering optimization
- Add support for password-protected documents
- Create user onboarding flow
- Design premium subscription interface
- Test dictionary lookup performance
- Add dark mode support
- Implement cloud sync functionality

BUGS TO FIX:
- Dictionary popup positioning on small screens
- Memory leak in document viewer
- Search highlighting not working for some PDFs
- Navigation bar overlapping content on iPhone X

FEATURE IDEAS:
- Voice reading (text-to-speech)
- Document comparison tool
- Collaborative annotations
- Export to various formats
- Integration with cloud storage services
- OCR for scanned documents
- Reading statistics and analytics

PERFORMANCE NOTES:
- App startup time: Target < 2 seconds
- Document load time: Target < 3 seconds for typical PDF
- Memory usage: Keep under 100MB during normal operation
- Battery impact: Minimize background processing

DESIGN DECISIONS:
- Use blue (#2563eb) as primary color for trust and professionalism
- Implement 8px grid system for consistent spacing
- Prioritize touch targets of at least 44px for accessibility
- Use Inter font for excellent readability on mobile screens

TECHNICAL ARCHITECTURE:
- React Native for cross-platform development
- SQLite for offline dictionary storage
- Redux for state management
- REST APIs for premium AI features
- Local file system for document storage

MARKET RESEARCH:
- Adobe Reader: 500M+ downloads, but heavy and slow
- WPS Office: 1B+ downloads, feature-rich but complex
- Opportunity: Lightweight alternative with modern UX

MONETIZATION:
- Freemium model with core features free
- Premium tier at $4.99/month for AI features
- No ads to maintain clean user experience
- Potential enterprise licensing for organizations

LAUNCH STRATEGY:
- Beta testing with 100 users
- App Store optimization for "PDF reader" keywords
- Social media marketing campaign
- Partnerships with productivity bloggers
- Press release for tech publications

METRICS TO TRACK:
- Daily active users (DAU)
- Session duration and frequency
- Dictionary lookup usage
- Premium conversion rate
- App store ratings and reviews
- Customer support ticket volume

COMPETITIVE ANALYSIS:
- Focus on speed and simplicity vs feature completeness
- Emphasize offline capabilities
- Highlight AI integration as differentiator
- Position as "mobile-first" solution

NEXT STEPS:
1. Complete core MVP features
2. Conduct user testing sessions
3. Implement feedback and iterate
4. Prepare for beta launch
5. Develop marketing materials
6. Submit to app stores`
    }
  ];

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-white border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <SortAsc size={16} className="mr-2" />
            Sort
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {currentPath}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {/* Folders */}
        {!searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Folders</h2>
            <div className="space-y-2">
              {folders.map((folder, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setCurrentPath(folder.path)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Folder size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.itemCount} items</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {searchQuery ? `Search Results (${filteredFiles.length})` : 'Files'}
          </h2>
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <DocumentCard
                key={file.id}
                document={file}
                onClick={onDocumentOpen}
              />
            ))}
          </div>

          {filteredFiles.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No files found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseScreen;

