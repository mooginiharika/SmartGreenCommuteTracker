import React, { useState } from 'react';
import { MapPin, Calculator, Plus } from 'lucide-react';
import { TransportType } from '../types';
import { getTransportIcon, getTransportColor } from '../utils/transport';
import { calculateCO2Savings } from '../utils/co2Calculator';

interface CommuteLoggerProps {
  onAddCommute: (commute: {
    transportType: TransportType;
    distance: number;
    co2Saved: number;
    duration?: number;
  }) => void;
}

function CommuteLogger({ onAddCommute }: CommuteLoggerProps) {
  const [selectedTransport, setSelectedTransport] = useState<TransportType | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transportOptions: { type: TransportType; label: string; description: string }[] = [
    { type: 'walking', label: 'Walking', description: 'On foot to campus' },
    { type: 'biking', label: 'Biking', description: 'Cycling to campus' },
    { type: 'public_transit', label: 'Public Transit', description: 'Bus, train, or metro' },
    { type: 'carpool', label: 'Carpool', description: 'Shared ride with others' },
    { type: 'electric_vehicle', label: 'Electric Vehicle', description: 'EV or hybrid car' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransport || !distance) return;

    setIsSubmitting(true);
    
    const distanceNum = parseFloat(distance);
    const durationNum = duration ? parseFloat(duration) : undefined;
    const co2Saved = calculateCO2Savings(selectedTransport, distanceNum);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    onAddCommute({
      transportType: selectedTransport,
      distance: distanceNum,
      co2Saved,
      duration: durationNum
    });

    // Reset form
    setSelectedTransport(null);
    setDistance('');
    setDuration('');
    setIsSubmitting(false);
  };

  const estimatedCO2 = selectedTransport && distance 
    ? calculateCO2Savings(selectedTransport, parseFloat(distance) || 0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Log Your Green Trip</h2>
        <p className="text-gray-600">Every eco-friendly commute makes a difference!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transport Type Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            How did you get to campus?
          </h3>
          <div className="grid gap-3">
            {transportOptions.map((option) => {
              const Icon = getTransportIcon(option.type);
              const colorClass = getTransportColor(option.type);
              const isSelected = selectedTransport === option.type;

              return (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setSelectedTransport(option.type)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="ml-auto w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Distance Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Trip Details
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km) *
              </label>
              <input
                type="number"
                id="distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g., 5.2"
                step="0.1"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 25"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* CO2 Estimate */}
        {estimatedCO2 > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{estimatedCO2.toFixed(1)} kg</div>
              <p className="text-green-100">Estimated CO₂ saved vs. driving</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedTransport || !distance || isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Logging Trip...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Log This Trip
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CommuteLogger;