import { useState } from "react";

const NICHES = [
  "fashion", "food", "beauty", "fitness",
  "realestate", "handmade", "travel", "business", "lifestyle"
];

const CITIES = [
  "Lucknow", "Delhi", "Mumbai", "Jaipur", "Kanpur",
  "Pune", "Noida", "Gurgaon", "Ahmedabad", "Indore"
];

function SearchForm({ onSearch, loading }) {
  const [form, setForm] = useState({
    query:  "",
    city:   "",
    niche:  "",
    budget: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.query || !form.budget) {
      alert("Query aur budget dono zaruri hai!");
      return;
    }
    onSearch(form);
  };

  return (
    <div className="search-card">
      <h2>Apna Business Batao, AI Dhundhega Influencer</h2>
      <p className="subtitle">Hindi ya English mein type karein</p>

      <form onSubmit={handleSubmit}>
        {/* Main query */}
        <div className="form-group">
          <label>Apna business describe karo *</label>
          <textarea
            placeholder='Example: "Mera saree ka business hai Lucknow mein. Budget 5000 rupaye hai."'
            value={form.query}
            onChange={e => setForm({...form, query: e.target.value})}
            rows={3}
            required
          />
        </div>

        {/* City + Niche + Budget in a row */}
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <select
              value={form.city}
              onChange={e => setForm({...form, city: e.target.value})}
            >
              <option value="">Koi bhi city</option>
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Niche / Category</label>
            <select
              value={form.niche}
              onChange={e => setForm({...form, niche: e.target.value})}
            >
              <option value="">Koi bhi category</option>
              {NICHES.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Budget (₹) *</label>
            <input
              type="number"
              placeholder="5000"
              value={form.budget}
              onChange={e => setForm({...form, budget: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "Dhundh raha hai..." : "🚀 AI se Influencer Dhundho"}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;