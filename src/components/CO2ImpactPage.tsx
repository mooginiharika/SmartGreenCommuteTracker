import React, { useState } from 'react';
import { Leaf, TreePine, Car, Factory, Lightbulb, Recycle, Wind, Droplets } from 'lucide-react';

function CO2ImpactPage() {
  const [activeTab, setActiveTab] = useState<'impact' | 'reduce' | 'tips'>('impact');

  const impactData = [
    {
      icon: Car,
      title: 'Transportation',
      percentage: 29,
      description: 'Cars, trucks, and planes are major CO₂ contributors',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Factory,
      title: 'Industry',
      percentage: 21,
      description: 'Manufacturing and industrial processes',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Lightbulb,
      title: 'Energy',
      percentage: 25,
      description: 'Electricity generation and heating',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: TreePine,
      title: 'Agriculture',
      percentage: 24,
      description: 'Farming, livestock, and land use',
      color: 'from-green-500 to-green-600'
    }
  ];

  const reductionTips = [
    {
      icon: Car,
      title: 'Choose Green Transport',
      tips: [
        'Walk or bike for short distances',
        'Use public transportation',
        'Carpool with colleagues',
        'Consider electric vehicles',
        'Work from home when possible'
      ],
      impact: 'Can reduce personal emissions by 20-30%'
    },
    {
      icon: Lightbulb,
      title: 'Energy Efficiency',
      tips: [
        'Switch to LED bulbs',
        'Unplug devices when not in use',
        'Use programmable thermostats',
        'Choose energy-efficient appliances',
        'Insulate your home properly'
      ],
      impact: 'Can save 10-25% on energy bills'
    },
    {
      icon: Recycle,
      title: 'Reduce & Reuse',
      tips: [
        'Recycle paper, plastic, and glass',
        'Buy products with minimal packaging',
        'Repair instead of replacing',
        'Donate or sell unused items',
        'Choose reusable over disposable'
      ],
      impact: 'Reduces waste by up to 75%'
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      tips: [
        'Fix leaks promptly',
        'Take shorter showers',
        'Use water-efficient fixtures',
        'Collect rainwater for plants',
        'Run full loads in dishwashers'
      ],
      impact: 'Saves thousands of gallons annually'
    }
  ];

  const quickTips = [
    { tip: 'Replace one car trip per week with walking or biking', impact: '52 kg CO₂/year' },
    { tip: 'Use public transport instead of driving', impact: '2,400 kg CO₂/year' },
    { tip: 'Carpool to work 2 days per week', impact: '1,600 kg CO₂/year' },
    { tip: 'Work from home one day per week', impact: '500 kg CO₂/year' },
    { tip: 'Switch to LED light bulbs', impact: '80 kg CO₂/year' },
    { tip: 'Unplug electronics when not in use', impact: '100 kg CO₂/year' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">CO₂ Impact & Solutions</h2>
        <p className="text-gray-600">Learn about climate impact and how you can help</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('impact')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'impact'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Impact Sources
          </button>
          <button
            onClick={() => setActiveTab('reduce')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'reduce'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            How to Reduce
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'tips'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Quick Tips
          </button>
        </div>
      </div>

      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Global CO₂ Emissions</h3>
            <p className="text-blue-100 mb-4">Understanding the main sources of carbon emissions</p>
            <div className="text-3xl font-bold">36.8 billion tons</div>
            <div className="text-blue-100 text-sm">Annual global CO₂ emissions</div>
          </div>

          <div className="grid gap-4">
            {impactData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{item.percentage}%</div>
                    <div className="text-xs text-gray-500">of emissions</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reduce' && (
        <div className="space-y-6">
          {reductionTips.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-green-600 font-medium">{category.impact}</p>
                </div>
              </div>
              <div className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Quick Impact Calculator</h3>
            <p className="text-green-100">Small changes, big impact over time</p>
          </div>

          {quickTips.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{item.tip}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{item.impact}</div>
                <div className="text-xs text-gray-500">saved annually</div>
              </div>
            </div>
          ))}

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-6 h-6 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Your Potential Impact</h3>
            </div>
            <p className="text-yellow-700 mb-4">
              By implementing just 3 of these tips, you could save over 2,000 kg of CO₂ annually - 
              equivalent to planting 90 trees!
            </p>
            <div className="bg-yellow-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-800">2,000+ kg CO₂</div>
              <div className="text-yellow-600 text-sm">Your potential annual savings</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CO2ImpactPage;