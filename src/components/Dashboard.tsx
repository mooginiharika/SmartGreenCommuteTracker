import React from 'react';
import { TrendingUp, Leaf, Clock, Award } from 'lucide-react';
import { CommuteEntry, User } from '../types';
import StatsCard from './StatsCard';
import RecentCommutes from './RecentCommutes';
import AchievementsBanner from './AchievementsBanner';

interface DashboardProps {
  commutes: CommuteEntry[];
  user: User;
}

function Dashboard({ commutes, user }: DashboardProps) {
  const thisWeekCommutes = commutes.filter(c => {
    const commuteDate = new Date(c.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return commuteDate >= weekAgo;
  });

  const totalCO2SavedThisWeek = thisWeekCommutes.reduce((sum, c) => sum + c.co2Saved, 0);
  const totalDistance = thisWeekCommutes.reduce((sum, c) => sum + c.distance, 0);
  const greenDays = thisWeekCommutes.length;

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 🌱
        </h2>
        <p className="text-gray-600">Let's see your green impact this week</p>
      </div>

      <AchievementsBanner />

      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="CO₂ Saved"
          value={`${totalCO2SavedThisWeek.toFixed(1)} kg`}
          subtitle="This week"
          icon={Leaf}
          color="green"
          trend="+15%"
        />
        <StatsCard
          title="Green Days"
          value={greenDays.toString()}
          subtitle="This week"
          icon={Award}
          color="blue"
          trend={`${greenDays}/7 days`}
        />
        <StatsCard
          title="Distance"
          value={`${totalDistance.toFixed(1)} km`}
          subtitle="Green travel"
          icon={TrendingUp}
          color="purple"
          trend="+8%"
        />
        <StatsCard
          title="Streak"
          value={user.streak.toString()}
          subtitle="Days in a row"
          icon={Clock}
          color="orange"
          trend="🔥"
        />
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Campus Impact Today</h3>
        <p className="text-green-100 mb-4">See how our community is making a difference</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">847.2 kg</div>
            <div className="text-green-100 text-sm">CO₂ saved today</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1,234</div>
            <div className="text-green-100 text-sm">Green trips</div>
          </div>
        </div>
      </div>

      <RecentCommutes commutes={commutes.slice(0, 5)} />
    </div>
  );
}

export default Dashboard;