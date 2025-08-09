import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { CommuteEntry } from '../types';
import { getTransportIcon, getTransportColor } from '../utils/transport';

interface RecentCommutesProps {
  commutes: CommuteEntry[];
}

function RecentCommutes({ commutes }: RecentCommutesProps) {
  if (commutes.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Commutes</h3>
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No commutes logged yet</p>
          <p className="text-sm">Start by logging your first green trip!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Commutes</h3>
        <span className="text-sm text-gray-500">{commutes.length} trips</span>
      </div>
      <div className="space-y-3">
        {commutes.map((commute) => {
          const TransportIcon = getTransportIcon(commute.transportType);
          const transportColor = getTransportColor(commute.transportType);
          const date = new Date(commute.date);
          
          return (
            <div key={commute.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${transportColor} rounded-xl flex items-center justify-center`}>
                  <TransportIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {commute.transportType.replace('_', ' ')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{date.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{commute.distance} km</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+{commute.co2Saved.toFixed(1)} kg</p>
                <p className="text-xs text-gray-500">CO₂ saved</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentCommutes;