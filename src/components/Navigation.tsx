import React from 'react';
import { Home, Plus, Trophy, Users, Leaf, Calendar, User, BarChart3, Gift } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'log' | 'leaderboard' | 'social' | 'impact' | 'calendar' | 'profile' | 'analytics' | 'referral';
  onTabChange: (tab: 'dashboard' | 'log' | 'leaderboard' | 'social' | 'impact' | 'calendar' | 'profile' | 'analytics' | 'referral') => void;
}

function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [showMore, setShowMore] = React.useState(false);

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'log' as const, label: 'Log Trip', icon: Plus },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'social' as const, label: 'Social', icon: Users },
  ];

  const moreTabs = [
    { id: 'impact' as const, label: 'CO₂ Impact', icon: Leaf },
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'referral' as const, label: 'Referral', icon: Gift },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowMore(false)}>
          <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl">
            <div className="grid grid-cols-2 gap-3">
              {moreTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onTabChange(id);
                    setShowMore(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    activeTab === id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  activeTab === id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
            <button
              onClick={() => setShowMore(true)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                moreTabs.some(tab => tab.id === activeTab)
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                </div>
              </div>
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;