import React, { useState, useEffect } from 'react';
import { Leaf, TreePine, Droplets, Wind } from 'lucide-react';
import { EnvironmentalFact } from '../types';

const environmentalFacts: EnvironmentalFact[] = [
  {
    id: '1',
    title: 'Transportation Impact',
    description: 'Transportation accounts for 29% of greenhouse gas emissions in the US',
    icon: '🚗'
  },
  {
    id: '2',
    title: 'Tree Power',
    description: 'One tree can absorb 48 pounds of CO2 per year',
    icon: '🌳'
  },
  {
    id: '3',
    title: 'Cycling Benefits',
    description: 'Cycling just 10 miles a week can save 500 pounds of CO2 annually',
    icon: '🚴'
  },
  {
    id: '4',
    title: 'Public Transit',
    description: 'Public transportation reduces CO2 emissions by 45 million metric tons annually',
    icon: '🚌'
  },
  {
    id: '5',
    title: 'Walking Impact',
    description: 'Walking produces zero emissions and improves air quality for everyone',
    icon: '🚶'
  }
];

interface LoadingScreenProps {
  isLoading: boolean;
}

function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % environmentalFacts.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const fact = environmentalFacts[currentFact];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-50">
      <div className="text-center text-white px-6 max-w-md">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Green Commute Tracker</h1>
          <p className="text-green-100">Loading your eco-friendly journey...</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <div className="text-4xl mb-3">{fact.icon}</div>
          <h3 className="font-semibold mb-2">{fact.title}</h3>
          <p className="text-sm text-green-100">{fact.description}</p>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-green-100">Loading... {progress}%</p>
      </div>
    </div>
  );
}

export default LoadingScreen;