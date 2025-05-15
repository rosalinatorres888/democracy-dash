import React, { useState } from 'react';
import './App.css';

function App() {
  // State for active views and country selection
  const [selectedCountry, setSelectedCountry] = useState('Norway');
  const [usDeclineView, setUsDeclineView] = useState('categories');
  const [showClusters, setShowClusters] = useState(true);
  const [trendView, setTrendView] = useState('all');

  // Data for the visualizations
  const regimeColors = {
    'Full Democracy': '#4CAF50',
    'Flawed Democracy': '#2196F3',
    'Hybrid Regime': '#FFC107',
    'Authoritarian': '#F44336'
  };

  // Country data
  const countryData = {
    'Norway': {
      regime: 'Full Democracy',
      score: 9.81,
      dimensions: {
        electoral: 10.00,
        functioning: 9.64,
        participation: 10.00,
        culture: 10.00,
        liberties: 9.71
      },
      color: '#4CAF50',
      yearlyScores: [9.80, 9.87, 9.81, 9.81, 9.81, 9.81, 9.75, 9.81]
    },
    'New Zealand': {
      regime: 'Full Democracy',
      score: 9.61,
      dimensions: {
        electoral: 10.00,
        functioning: 9.29,
        participation: 8.89,
        culture: 10.00,
        liberties: 9.71
      },
      color: '#4CAF50',
      yearlyScores: [9.26, 9.26, 9.37, 9.26, 9.26, 9.37, 9.61, 9.61]
    },
    'United States': {
      regime: 'Flawed Democracy',
      score: 7.85,
      dimensions: {
        electoral: 9.17,
        functioning: 6.43,
        participation: 7.78,
        culture: 6.25,
        liberties: 8.24
      },
      color: '#2196F3',
      yearlyScores: [8.05, 7.98, 7.98, 7.96, 7.96, 7.92, 7.85, 7.85]
    },
    'France': {
      regime: 'Flawed Democracy',
      score: 7.99,
      dimensions: {
        electoral: 9.58,
        functioning: 6.79,
        participation: 7.78,
        culture: 6.88,
        liberties: 8.82
      },
      color: '#2196F3',
      yearlyScores: [8.12, 8.07, 7.92, 8.12, 8.08, 7.99, 7.99, 7.99]
    },
    'Hungary': {
      regime: 'Flawed Democracy',
      score: 6.12,
      dimensions: {
        electoral: 7.83,
        functioning: 5.71,
        participation: 5.00,
        culture: 5.63,
        liberties: 6.47
      },
      color: '#2196F3',
      borderline: true,
      yearlyScores: [7.00, 6.84, 6.64, 6.63, 6.56, 6.50, 6.12, 6.12]
    },
    'Poland': {
      regime: 'Flawed Democracy',
      score: 6.09,
      dimensions: {
        electoral: 7.83,
        functioning: 5.36,
        participation: 5.56,
        culture: 4.38,
        liberties: 7.06
      },
      color: '#2196F3',
      borderline: true,
      yearlyScores: [7.09, 6.67, 6.67, 6.62, 6.57, 6.49, 6.09, 6.09]
    },
    'Turkey': {
      regime: 'Hybrid Regime',
      score: 5.04,
      dimensions: {
        electoral: 6.50,
        functioning: 5.00,
        participation: 5.56,
        culture: 5.00,
        liberties: 3.24
      },
      color: '#FFC107',
      yearlyScores: [5.12, 5.04, 4.88, 4.37, 4.09, 4.09, 5.04, 5.04]
    },
    'Russia': {
      regime: 'Authoritarian',
      score: 2.94,
      dimensions: {
        electoral: 2.17,
        functioning: 1.79,
        participation: 5.00,
        culture: 3.13,
        liberties: 2.94
      },
      color: '#F44336',
      yearlyScores: [3.24, 3.19, 3.11, 3.11, 3.24, 3.24, 2.94, 2.94]
    }
  };

  // Function to render SVG path for the radar chart
  const renderRadarPath = () => {
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const angleStep = (Math.PI * 2) / 5; // 5 dimensions
    
    const dimensions = [
      countryData[selectedCountry].dimensions.electoral,
      countryData[selectedCountry].dimensions.functioning,
      countryData[selectedCountry].dimensions.participation,
      countryData[selectedCountry].dimensions.culture,
      countryData[selectedCountry].dimensions.liberties
    ];
    
    const points = dimensions.map((value, i) => {
      const scaledValue = value / 10; // Scale to 0-1
      const angle = i * angleStep - Math.PI / 2; // Start from the top
      const x = centerX + radius * scaledValue * Math.cos(angle);
      const y = centerY + radius * scaledValue * Math.sin(angle);
      return { x, y };
    });
    
    const path = points.map((point, i) => 
      (i === 0 ? 'M' : 'L') + point.x + ',' + point.y
    ).join(' ') + 'Z';
    
    return path;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white text-blue-800 py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Clustering Democracy: Unsupervised Machine Learning Analysis of Global Governance</h1>
        <div className="mt-4">
          <div className="text-xl mb-1">Rosalina Torres</div>
          <div>Data Analytics Engineer | MS Candidate</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Country Explorer */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="text-5xl text-white opacity-20 mr-3 font-bold">01</div>
            <div className="text-2xl text-gray-800 font-bold">Country Explorer</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">Explore Democratic Dimensions by Country</h3>
            
            <div className="mb-4">
              <label htmlFor="country-selector" className="block mb-2">Select a country:</label>
              <select 
                id="country-selector"
                className="p-2 border rounded w-full max-w-xs"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {Object.keys(countryData).sort().map(country => (
                  <option key={country} value={country}>
                    {country} {countryData[country].borderline ? '(Borderline)' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div 
              className="my-4 p-4 rounded-lg" 
              style={{ 
                backgroundColor: `${countryData[selectedCountry].color}20` 
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="m-0 font-bold" style={{ color: countryData[selectedCountry].color }}>{selectedCountry}</h4>
                <span 
                  className="px-2 py-1 rounded text-white" 
                  style={{ bac
