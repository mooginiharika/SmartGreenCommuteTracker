import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Calendar, MapPin } from 'lucide-react';
import { CommuteEntry } from '../types';

interface AnalyticsPageProps {
  commutes: CommuteEntry[];
}

function AnalyticsPage({ commutes }: AnalyticsPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const getFilteredCommutes = () => {
    const now = new Date();
    const cutoff = new Date();
    
    if (selectedPeriod === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else {
      cutoff.setMonth(now.getMonth() - 1);
    }
    
    return commutes.filter(c => new Date(c.date) >= cutoff);
  };

  const filteredCommutes = getFilteredCommutes();

  const getDailyStats = () => {
    const dailyStats: { [key: string]: { commutes: CommuteEntry[], co2: number, distance: number } } = {};
    
    filteredCommutes.forEach(commute => {
      const date = new Date(commute.date).toDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = { commutes: [], co2: 0, distance: 0 };
      }
      dailyStats[date].commutes.push(commute);
      dailyStats[date].co2 += commute.co2Saved;
      dailyStats[date].distance += commute.distance;
    });

    return Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      ...stats
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getHourlyDistribution = () => {
    const hourlyStats: { [hour: number]: number } = {};
    
    filteredCommutes.forEach(commute => {
      const hour = new Date(commute.date).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    return Object.entries(hourlyStats).map(([hour, count]) => ({
      hour: parseInt(hour),
      count
    })).sort((a, b) => a.hour - b.hour);
  };

  const getTransportBreakdown = () => {
    const transportStats: { [key: string]: { count: number, co2: number, distance: number } } = {};
    
    filteredCommutes.forEach(commute => {
      const type = commute.transportType;
      if (!transportStats[type]) {
        transportStats[type] = { count: 0, co2: 0, distance: 0 };
      }
      transportStats[type].count++;
      transportStats[type].co2 += commute.co2Saved;
      transportStats[type].distance += commute.distance;
    });

    return Object.entries(transportStats).map(([type, stats]) => ({
      type: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ...stats
    }));
  };

  const dailyStats = getDailyStats();
  const hourlyStats = getHourlyDistribution();
  const transportStats = getTransportBreakdown();

  const totalCO2 = filteredCommutes.reduce((sum, c) => sum + c.co2Saved, 0);
  const totalDistance = filteredCommutes.reduce((sum, c) => sum + c.distance, 0);
  const averagePerDay = dailyStats.length > 0 ? totalCO2 / dailyStats.length : 0;

  const peakHour = hourlyStats.reduce((max, current) => 
    current.count > max.count ? current : max, { hour: 0, count: 0 }
  );

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Detailed insights into your commuting patterns</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              selectedPeriod === 'week'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              selectedPeriod === 'month'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Total CO₂</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{totalCO2.toFixed(1)} kg</div>
          <div className="text-sm text-gray-500">Saved</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Distance</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalDistance.toFixed(1)} km</div>
          <div className="text-sm text-gray-500">Green travel</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Daily Avg</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{averagePerDay.toFixed(1)} kg</div>
          <div className="text-sm text-gray-500">CO₂ saved</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Peak Hour</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {peakHour.hour}:00
          </div>
          <div className="text-sm text-gray-500">{peakHour.count} trips</div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Breakdown
        </h3>
        <div className="space-y-3">
          {dailyStats.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm text-gray-500">{day.commutes.length} trips</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{day.co2.toFixed(1)} kg CO₂</div>
                <div className="text-sm text-gray-500">{day.distance.toFixed(1)} km</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Type Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transport Methods</h3>
        <div className="space-y-3">
          {transportStats.map((transport, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">{transport.type}</div>
                <div className="text-sm text-gray-500">{transport.count} trips</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{transport.co2.toFixed(1)} kg CO₂</div>
                <div className="text-sm text-gray-500">{transport.distance.toFixed(1)} km</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Commute Times
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }, (_, hour) => {
            const hourData = hourlyStats.find(h => h.hour === hour);
            const count = hourData?.count || 0;
            const maxCount = Math.max(...hourlyStats.map(h => h.count), 1);
            const height = (count / maxCount) * 100;
            
            return (
              <div key={hour} className="text-center">
                <div className="h-20 flex items-end justify-center mb-1">
                  <div
                    className="w-6 bg-green-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{hour}:00</div>
                <div className="text-xs font-medium text-gray-700">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;