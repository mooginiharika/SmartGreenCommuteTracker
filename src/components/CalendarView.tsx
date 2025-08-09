import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Flame, Award } from 'lucide-react';
import { CommuteEntry } from '../types';

interface CalendarViewProps {
  commutes: CommuteEntry[];
  streak: number;
}

function CalendarView({ commutes, streak }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getCommuteForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return commutes.filter(c => new Date(c.date).toDateString() === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayCommutes = getCommuteForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    const hasCommute = dayCommutes.length > 0;
    const totalCO2 = dayCommutes.reduce((sum, c) => sum + c.co2Saved, 0);

    days.push(
      <div
        key={day}
        className={`h-12 flex flex-col items-center justify-center rounded-lg text-sm relative ${
          isToday
            ? 'bg-green-500 text-white font-bold'
            : hasCommute
            ? 'bg-green-100 text-green-800 font-medium'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span>{day}</span>
        {hasCommute && (
          <div className="absolute -bottom-1 flex gap-1">
            {dayCommutes.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full ${
                  isToday ? 'bg-white' : 'bg-green-500'
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Commute Calendar</h2>
        <p className="text-gray-600">Track your green streak and daily progress</p>
      </div>

      {/* Streak Display */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Flame className="w-6 h-6" />
              Current Streak
            </h3>
            <p className="text-orange-100">Keep the momentum going!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{streak}</div>
            <div className="text-orange-100 text-sm">days in a row</div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {monthName}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-gray-600">Green commute</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-gray-600">No commute</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Green Days</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {commutes.filter(c => {
              const commuteDate = new Date(c.date);
              return commuteDate.getMonth() === currentDate.getMonth() &&
                     commuteDate.getFullYear() === currentDate.getFullYear();
            }).length}
          </div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">CO₂ Saved</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {commutes
              .filter(c => {
                const commuteDate = new Date(c.date);
                return commuteDate.getMonth() === currentDate.getMonth() &&
                       commuteDate.getFullYear() === currentDate.getFullYear();
              })
              .reduce((sum, c) => sum + c.co2Saved, 0)
              .toFixed(1)} kg
          </div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;