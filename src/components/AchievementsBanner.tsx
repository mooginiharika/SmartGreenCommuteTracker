import React from 'react';
import { Award, Zap, Target } from 'lucide-react';

function AchievementsBanner() {
  const achievements = [
    {
      id: '1',
      title: 'Green Warrior',
      description: 'Logged 5 eco-friendly commutes',
      icon: Award,
      progress: 5,
      target: 5,
      completed: true
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain 7-day green streak',
      icon: Zap,
      progress: 3,
      target: 7,
      completed: false
    },
    {
      id: '3',
      title: 'Carbon Saver',
      description: 'Save 10kg of CO₂',
      icon: Target,
      progress: 6.2,
      target: 10,
      completed: false
    }
  ];

  const completedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);

  if (completedAchievements.length === 0 && inProgressAchievements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {completedAchievements.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Achievement Unlocked!</h3>
              <p className="text-yellow-100">{completedAchievements[0].title}</p>
            </div>
          </div>
        </div>
      )}

      {inProgressAchievements.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Goals in Progress</h3>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const progress = (achievement.progress / achievement.target) * 100;
              
              return (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                      <span className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AchievementsBanner;