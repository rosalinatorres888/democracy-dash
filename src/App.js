# Create a simpler version of App.js
cat > src/App.js << 'EOF'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#3949ab', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Democracy Clustering Analysis</h1>
        <p>Data Analytics Visualization by Rosalina Torres</p>
      </header>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <section style={{ marginBottom: '30px' }}>
          <h2>Country Explorer</h2>
          <p>Interactive tool to explore democratic dimensions by country.</p>
        </section>
        <section style={{ marginBottom: '30px' }}>
          <h2>Democracy Clustering</h2>
          <p>Machine learning discovered clusters of democratic systems.</p>
        </section>
        <section style={{ marginBottom: '30px' }}>
          <h2>Key Research Insights</h2>
          <p>Findings from unsupervised learning analysis of democratic governance.</p>
        </section>
      </main>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>Data source: Economist Intelligence Unit Democracy Index</p>
        <p>© 2025 Rosalina Torres</p>
      </footer>
    </div>
  );
}

export default App;
EOF