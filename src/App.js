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
                  style={{ backgroundColor: countryData[selectedCountry].color }}
                >
                  {countryData[selectedCountry].score.toFixed(2)}
                </span>
              </div>
              <p><strong>Regime Type:</strong> {countryData[selectedCountry].regime}</p>
              {countryData[selectedCountry].borderline && (
                <p className="italic text-gray-600">
                  This country sits at the boundary between Flawed Democracy and Hybrid Regime
                </p>
              )}
            </div>
            
            {/* Radar Chart Visualization */}
            <div className="h-96 w-full mt-4 relative">
              <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
                {/* Background circles */}
                <circle cx="200" cy="200" r="150" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                <circle cx="200" cy="200" r="30" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                
                {/* Axis lines */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 2 * Math.PI / 5) - Math.PI/2;
                  const x = 200 + 150 * Math.cos(angle);
                  const y = 200 + 150 * Math.sin(angle);
                  return (
                    <line 
                      key={`axis-${i}`}
                      x1="200" 
                      y1="200" 
                      x2={x} 
                      y2={y} 
                      stroke="#e5e5e5" 
                      strokeWidth="1" 
                    />
                  )
                })}
                
                {/* Data polygon */}
                <path 
                  d={renderRadarPath()} 
                  fill={`${countryData[selectedCountry].color}50`} 
                  stroke={countryData[selectedCountry].color} 
                  strokeWidth="2" 
                />
                
                {/* Dimension labels */}
                {[
                  { name: "Electoral Process", index: 0 },
                  { name: "Functioning of Govt", index: 1 },
                  { name: "Political Participation", index: 2 },
                  { name: "Political Culture", index: 3 },
                  { name: "Civil Liberties", index: 4 }
                ].map((dim) => {
                  const angle = (dim.index * 2 * Math.PI / 5) - Math.PI/2;
                  const x = 200 + 170 * Math.cos(angle);
                  const y = 200 + 170 * Math.sin(angle);
                  return (
                    <text 
                      key={`label-${dim.index}`}
                      x={x} 
                      y={y} 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fontSize="12"
                      fill="#333"
                    >
                      {dim.name}
                    </text>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
{/* US Democracy Decline */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="text-5xl text-white opacity-20 mr-3 font-bold">02</div>
            <div className="text-2xl text-gray-800 font-bold">US Democracy Decline</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">US Downgrade from Full to Flawed Democracy</h3>
            
            <div className="mb-4">
              <button 
                className={`py-2 px-4 mr-2 rounded-full border border-blue-700 ${usDeclineView === 'categories' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                onClick={() => setUsDeclineView('categories')}
              >
                By Category
              </button>
              <button 
                className={`py-2 px-4 rounded-full border border-blue-700 ${usDeclineView === 'trend' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                onClick={() => setUsDeclineView('trend')}
              >
                Historical Trend
              </button>
            </div>
            
            <div className="h-80 w-full mt-4">
              {usDeclineView === 'categories' ? (
                <div className="flex h-full items-end justify-around p-4">
                  {/* Simple Bar chart representation */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 flex items-end justify-center text-white font-semibold" 
                      style={{ 
                        height: `${countryData['United States'].dimensions.electoral * 20}px`,
                        backgroundColor: '#4CAF50'
                      }}
                    >
                      {countryData['United States'].dimensions.electoral.toFixed(1)}
                    </div>
                    <div className="mt-2 text-xs text-center">Electoral<br/>Process</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 flex items-end justify-center text-white font-semibold" 
                      style={{ 
                        height: `${countryData['United States'].dimensions.functioning * 20}px`,
                        backgroundColor: '#F44336'
                      }}
                    >
                      {countryData['United States'].dimensions.functioning.toFixed(1)}
                    </div>
                    <div className="mt-2 text-xs text-center">Functioning<br/>of Govt</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 flex items-end justify-center text-white font-semibold" 
                      style={{ 
                        height: `${countryData['United States'].dimensions.participation * 20}px`,
                        backgroundColor: '#2196F3'
                      }}
                    >
                      {countryData['United States'].dimensions.participation.toFixed(1)}
                    </div>
                    <div className="mt-2 text-xs text-center">Political<br/>Participation</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 flex items-end justify-center text-white font-semibold" 
                      style={{ 
                        height: `${countryData['United States'].dimensions.culture * 20}px`,
                        backgroundColor: '#F44336'
                      }}
                    >
                      {countryData['United States'].dimensions.culture.toFixed(1)}
                    </div>
                    <div className="mt-2 text-xs text-center">Political<br/>Culture</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 flex items-end justify-center text-white font-semibold" 
                      style={{ 
                        height: `${countryData['United States'].dimensions.liberties * 20}px`,
                        backgroundColor: '#4CAF50'
                      }}
                    >
                      {countryData['United States'].dimensions.liberties.toFixed(1)}
                    </div>
                    <div className="mt-2 text-xs text-center">Civil<br/>Liberties</div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <p className="mb-4 font-semibold">US Democracy Index Trend (2015-2024)</p>
                    <p>The US was downgraded from Full to Flawed Democracy in 2016</p>
                    <p>and has continued a slight downward trend since then.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
{/* Democracy Clustering */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="text-5xl text-white opacity-20 mr-3 font-bold">03</div>
            <div className="text-2xl text-gray-800 font-bold">Democracy Clustering</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">Machine Learning Discovered Clusters</h3>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={showClusters}
                  onChange={(e) => setShowClusters(e.target.checked)}
                  className="mr-2"
                />
                Show Cluster Boundaries
              </label>
            </div>
            
            <div className="h-80 w-full mt-4 relative">
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 800 400">
                  {/* X and Y axes */}
                  <line x1="50" y1="350" x2="750" y2="350" stroke="#333" strokeWidth="2" />
                  <line x1="50" y1="50" x2="50" y2="350" stroke="#333" strokeWidth="2" />
                  
                  {/* Axis labels */}
                  <text x="400" y="380" textAnchor="middle" fontSize="14">Electoral Process</text>
                  <text x="20" y="200" textAnchor="middle" transform="rotate(-90, 20, 200)" fontSize="14">Civil Liberties</text>
                  
                  {/* Cluster boundaries */}
                  {showClusters && (
                    <>
                      {/* Full Democracy */}
                      <line x1="50" y1="110" x2="750" y2="110" stroke={regimeColors['Full Democracy']} strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="470" y1="50" x2="470" y2="350" stroke={regimeColors['Full Democracy']} strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* Flawed Democracy */}
                      <line x1="50" y1="170" x2="750" y2="170" stroke={regimeColors['Flawed Democracy']} strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="330" y1="50" x2="330" y2="350" stroke={regimeColors['Flawed Democracy']} strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* Hybrid Regime */}
                      <line x1="50" y1="230" x2="750" y2="230" stroke={regimeColors['Hybrid Regime']} strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="190" y1="50" x2="190" y2="350" stroke={regimeColors['Hybrid Regime']} strokeWidth="1" strokeDasharray="5,5" />
                    </>
                  )}
                  
                  {/* Data points */}
                  {Object.entries(countryData).map(([country, data]) => {
                    // Scale the x and y coordinates to the SVG space
                    const x = 50 + 700 * (data.dimensions.electoral / 10);
                    const y = 350 - 300 * (data.dimensions.liberties / 10);
                    const radius = data.score * 2;
                    
                    return (
                      <g key={country}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r={radius} 
                          fill={`${data.color}80`}
                          stroke={data.borderline ? '#FF5722' : data.color}
                          strokeWidth={data.borderline ? 2 : 1}
                        />
                        <text 
                          x={x} 
                          y={y - radius - 5} 
                          textAnchor="middle" 
                          fontSize="12"
                        >
                          {country}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
{/* Democracy Trends */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="text-5xl text-white opacity-20 mr-3 font-bold">04</div>
            <div className="text-2xl text-gray-800 font-bold">Democracy Score Trends</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">Democracy Index Trends (2017-2024)</h3>
            
            <div className="mb-4">
              <button 
                className={`py-2 px-4 mr-2 rounded-full border border-blue-700 ${trendView === 'all' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                onClick={() => setTrendView('all')}
              >
                All Countries
              </button>
              <button 
                className={`py-2 px-4 mr-2 rounded-full border border-blue-700 ${trendView === 'us-norway' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                onClick={() => setTrendView('us-norway')}
              >
                US vs Norway
              </button>
              <button 
                className={`py-2 px-4 rounded-full border border-blue-700 ${trendView === 'borderline' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                onClick={() => setTrendView('borderline')}
              >
                Borderline Cases
              </button>
            </div>
            
            <div className="h-80 w-full mt-4">
              {/* Simplified trend visualization placeholder */}
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <p className="mb-4 font-semibold">Democracy Index Trends (2017-2024)</p>
                  <p>Countries displayed: {trendView === 'all' ? 'All major democracies' : 
                     trendView === 'us-norway' ? 'US and Norway' : 'Borderline cases'}</p>
                  <p className="mt-4">This visualization shows trend lines for democracy scores over time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Insights */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="text-5xl text-white opacity-20 mr-3 font-bold">05</div>
            <div className="text-2xl text-gray-800 font-bold">Key Research Insights</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Natural Patterns in Data</h3>
              <p>Machine learning algorithms naturally discovered four distinct clusters that closely align with expert-defined regime types, validating that democratic classifications reflect inherent patterns in political data.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Critical Dimensions</h3>
              <p>Civil liberties (0.90) and electoral processes (0.86) emerged as the most powerful predictors of regime type in clustering analysis, showing which aspects most strongly differentiate political systems.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Borderline Cases</h3>
              <p>Countries like Hungary, Poland and Mexico occupy a statistical gray zone between flawed democracies and hybrid regimes, suggesting AI could serve as an early warning system for democratic backsliding.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center mt-10">
        <p>Data source: Economist Intelligence Unit Democracy Index</p>
        <p>Compiled by Rosalina Torres as part of democracy clustering analysis project</p>
        <p>Data Analytics Engineer | MS Candidate</p>
        <p>© 2025</p>
      </footer>
    </div>
  );
}

export default App;
