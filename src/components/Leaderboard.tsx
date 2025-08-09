import React, { useState } from 'react';
import { Trophy, Medal, Crown, Users, TrendingUp } from 'lucide-react';
import { LeaderboardEntry } from '../types';

function Leaderboard() {
  const [activeFilter, setActiveFilter] = useState<'individual' | 'department'>('individual');

  const individualLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Sarah Chen', department: 'Environmental Science', totalCO2Saved: 45.8, rank: 1 },
    { id: '2', name: 'Marcus Rodriguez', department: 'Engineering', totalCO2Saved: 42.3, rank: 2 },
    { id: '3', name: 'Emma Thompson', department: 'Biology', totalCO2Saved: 38.9, rank: 3 },
    { id: '4', name: 'David Kim', department: 'Computer Science', totalCO2Saved: 35.2, rank: 4 },
    { id: '5', name: 'Lisa Wang', department: 'Psychology', totalCO2Saved: 32.7, rank: 5 },
    { id: '6', name: 'Alex Johnson', department: 'Computer Science', totalCO2Saved: 28.4, rank: 6 },
    { id: '7', name: 'Maria Garcia', department: 'Chemistry', totalCO2Saved: 25.1, rank: 7 },
    { id: '8', name: 'James Wilson', department: 'Physics', totalCO2Saved: 22.8, rank: 8 }
  ];

  const departmentLeaderboard = [
    { id: '1', name: 'Environmental Science', department: '127 students', totalCO2Saved: 892.4, rank: 1 },
    { id: '2', name: 'Engineering', department: '245 students', totalCO2Saved: 756.8, rank: 2 },
    { id: '3', name: 'Computer Science', department: '189 students', totalCO2Saved: 634.2, rank: 3 },
    { id: '4', name: 'Biology', department: '156 students', totalCO2Saved: 523.7, rank: 4 },
    { id: '5', name: 'Psychology', department: '98 students', totalCO2Saved: 445.1, rank: 5 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default: return 'bg-white border-gray-100';
    }
  };

  const currentLeaderboard = activeFilter === 'individual' ? individualLeaderboard : departmentLeaderboard;

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campus Leaderboard 🏆</h2>
        <p className="text-gray-600">See who's leading the green revolution</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveFilter('individual')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeFilter === 'individual'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Individuals
          </button>
          <button
            onClick={() => setActiveFilter('department')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeFilter === 'department'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Departments
          </button>
        </div>
      </div>

      {/* Campus Stats */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          This Month's Impact
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">2,847 kg</div>
            <div className="text-green-100 text-sm">Total CO₂ saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1,423</div>
            <div className="text-green-100 text-sm">Green commuters</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {activeFilter === 'individual' ? 'Top Commuters' : 'Top Departments'}
        </h3>
        <div className="space-y-3">
          {currentLeaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${getRankStyle(entry.rank)}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{entry.totalCO2Saved.toFixed(1)} kg</p>
                <p className="text-xs text-gray-500">CO₂ saved</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
        <div className="text-center">
          <p className="text-sm font-medium text-blue-800">Your Position</p>
          <p className="text-2xl font-bold text-blue-900">#6</p>
          <p className="text-sm text-blue-600">Keep going to reach the top 5!</p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;