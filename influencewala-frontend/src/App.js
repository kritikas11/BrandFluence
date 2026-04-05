import { useState } from "react";
import SearchForm from "./components/SearchForm";
import InfluencerCard from "./components/InfluencerCard";
import AdvisorPanel from "./components/AdvisorPanel";
import "./App.css";

function App() {
  const [influencers, setInfluencers] = useState([]);
  const [advice, setAdvice]           = useState(null);
  const [loading, setLoading]         = useState(false);
  const [searchData, setSearchData]   = useState(null);

  const handleSearch = async (formData) => {
    setLoading(true);
    setAdvice(null);
    setSearchData(formData);

    try {
      // Step 1 — match influencers
      const matchRes = await fetch("http://127.0.0.1:8000/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query:  formData.query,
          city:   formData.city,
          niche:  formData.niche,
          budget: parseInt(formData.budget),
          top_k:  3
        })
      });
      const matchData = await matchRes.json();
      setInfluencers(matchData.influencers || []);

      // Step 2 — get AI advisor response
      const adviceRes = await fetch("http://127.0.0.1:8000/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_description: formData.query,
          city:                 formData.city,
          budget:               parseInt(formData.budget),
          influencers:          matchData.influencers || []
        })
      });
      const adviceData = await adviceRes.json();
      setAdvice(adviceData.advice);

    } catch (err) {
      alert("Error connecting to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>BRANDFLUENCE</h1>
          <p>India ka pehla AI-powered influencer marketplace for small businesses</p>
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        {/* Search form */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI dhundh raha hai aapke liye best influencers...</p>
          </div>
        )}

        {/* Results */}
        {!loading && influencers.length > 0 && (
          <>
            <h2 className="section-title">
              ✨ Top {influencers.length} Influencers Mile Aapke Liye
            </h2>
            <div className="cards-grid">
              {influencers.map((inf, i) => (
                <InfluencerCard key={i} influencer={inf} rank={i + 1} />
              ))}
            </div>
          </>
        )}

        {/* AI Advisor */}
        {!loading && advice && (
          <AdvisorPanel advice={advice} searchData={searchData} />
        )}
      </main>
    </div>
  );
}

export default App;