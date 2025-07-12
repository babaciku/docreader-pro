import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Moon, 
  Type, 
  Zap, 
  Shield, 
  HelpCircle, 
  Star,
  ChevronRight,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoLookup: true,
    cloudSync: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: 'Manage your account information',
          action: 'navigate',
          value: 'John Doe'
        },
        {
          icon: Crown,
          label: 'Upgrade to Premium',
          description: 'Unlock AI features and cloud sync',
          action: 'premium',
          highlight: true
        }
      ]
    },
    {
      title: 'Reading Preferences',
      items: [
        {
          icon: Type,
          label: 'Font Size',
          description: 'Adjust text size for comfortable reading',
          action: 'navigate',
          value: 'Medium'
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          description: 'Reduce eye strain in low light',
          action: 'toggle',
          key: 'darkMode'
        }
      ]
    },
    {
      title: 'Dictionary',
      items: [
        {
          icon: Zap,
          label: 'Auto Lookup',
          description: 'Automatically show definitions on word selection',
          action: 'toggle',
          key: 'autoLookup'
        },
        {
          icon: Star,
          label: 'Saved Words',
          description: 'View your vocabulary collection',
          action: 'navigate',
          value: '23 words'
        }
      ]
    },
    {
      title: 'Sync & Backup',
      items: [
        {
          icon: Shield,
          label: 'Cloud Sync',
          description: 'Sync settings and bookmarks across devices',
          action: 'toggle',
          key: 'cloudSync',
          premium: true
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          description: 'Get notified about app updates and features',
          action: 'toggle',
          key: 'notifications'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & FAQ',
          description: 'Get answers to common questions',
          action: 'navigate'
        },
        {
          icon: Star,
          label: 'Rate App',
          description: 'Share your feedback on the App Store',
          action: 'external'
        }
      ]
    }
  ];

  const handlePremiumUpgrade = () => {
    alert(`🚀 Upgrade to DocReader Pro Premium!

✨ AI-Powered Features:
• Document Summarization
• Intelligent Q&A
• Real-time Translation

☁️ Cloud Features:
• Sync across devices
• Backup your library
• Advanced annotations

💰 Special Launch Price:
$4.99/month or $39.99/year
(Save 33% with annual plan)

Ready to unlock the full potential of DocReader Pro?`);
  };

  const handleSettingAction = (item) => {
    switch (item.action) {
      case 'toggle':
        if (item.premium && !settings.cloudSync) {
          handlePremiumUpgrade();
        } else {
          toggleSetting(item.key);
        }
        break;
      case 'premium':
        handlePremiumUpgrade();
        break;
      case 'navigate':
        console.log(`Navigate to ${item.label}`);
        break;
      case 'external':
        console.log(`Open external link for ${item.label}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-white border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 pb-20 overflow-y-auto">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4 py-2">
              {section.title}
            </h2>
            
            <div className="bg-white border-y border-border">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === section.items.length - 1;
                
                return (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 ${
                      !isLast ? 'border-b border-border' : ''
                    } ${item.highlight ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''}`}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        item.highlight 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-muted'
                      }`}>
                        <Icon 
                          size={20} 
                          className={item.highlight ? 'text-white' : 'text-muted-foreground'} 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className={`font-medium ${
                            item.highlight ? 'text-blue-700' : 'text-foreground'
                          }`}>
                            {item.label}
                          </h3>
                          {item.premium && (
                            <Crown size={14} className="ml-2 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {item.action === 'toggle' ? (
                        <Switch
                          checked={settings[item.key]}
                          onCheckedChange={() => handleSettingAction(item)}
                        />
                      ) : (
                        <div className="flex items-center">
                          {item.value && (
                            <span className="text-sm text-muted-foreground mr-2">
                              {item.value}
                            </span>
                          )}
                          <button
                            onClick={() => handleSettingAction(item)}
                            className="p-1"
                          >
                            <ChevronRight size={16} className="text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            DocReader Pro
          </p>
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 (Build 1)
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Made with ❤️ for better document reading
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

