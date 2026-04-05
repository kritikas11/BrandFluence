function ShowcaseSection({ onDemoSearch }) {
  const BRANDS = [
    {
      emoji: "👗",
      name: "Ananya Sarees",
      location: "Lucknow · Fashion",
      desc: "Traditional saree boutique looking for local fashion influencers",
      budget: "5,000",
      query: "Mera saree ka business hai Lucknow mein. Ethnic wear aur traditional sarees bechta hoon.",
      city: "Lucknow",
      niche: "fashion",
      budgetNum: 5000
    },
    {
      emoji: "☕",
      name: "Ramu Chai Wala",
      location: "Kanpur · Food",
      desc: "Famous chai shop wanting to reach college students in the area",
      budget: "2,000",
      query: "Mera chai ka dhanda hai Kanpur mein college ke paas. Students ko target karna hai.",
      city: "Kanpur",
      niche: "food",
      budgetNum: 2000
    },
    {
      emoji: "🏺",
      name: "Jaipur Handicrafts",
      location: "Jaipur · Handmade",
      desc: "Handmade jewellery and home decor for local and online buyers",
      budget: "4,000",
      query: "Handmade jewellery aur ghar ki sajawat ka business hai Jaipur mein.",
      city: "Jaipur",
      niche: "handmade",
      budgetNum: 4000
    }
  ];

  const INFLUENCERS = [
    {
      name: "Adeera",
      handle: "@adeeera_wang",
      loc: "Lucknow · Beauty",
      followers: "23K",
      eng: "4.2%",
      charge: "3,000",
      trust: 92,
      bg: "#6b21a8"
    },
    {
      name: "Bakhtawar",
      handle: "@bakhtawarkhowaja",
      loc: "Gurgaon · Food",
      followers: "25.8K",
      eng: "4.2%",
      charge: "4,343",
      trust: 88,
      bg: "#f59e0b"
    },
    {
      name: "Eesha Datta",
      handle: "@eeshadatta",
      loc: "Delhi · Fashion",
      followers: "2.15L",
      eng: "2.4%",
      charge: "14,000",
      trust: 85,
      bg: "#10b981"
    }
  ];

  return (
    <div className="showcase-section">

      <div className="showcase-block" id="brands">
        <div className="showcase-header">
          <div>
            <h2 className="showcase-title">Small Businesses Using Brandfluence</h2>
            <p className="showcase-sub">Click any brand to see AI recommendations instantly</p>
          </div>
        </div>

        <div className="showcase-grid">
          {BRANDS.map((brand, i) => (
            <div
              key={i}
              className="showcase-brand-card"
              onClick={function() {
                onDemoSearch({
                  query: brand.query,
                  city: brand.city,
                  niche: brand.niche,
                  budget: brand.budgetNum
                });
              }}
            >
              <div className="showcase-emoji">{brand.emoji}</div>
              <h3>{brand.name}</h3>
              <p className="showcase-location">{brand.location}</p>
              <p className="showcase-desc">{brand.desc}</p>
              <span className="showcase-budget">Budget Rs.{brand.budget}</span>
              <button className="demo-btn">AI se Dhundho</button>
            </div>
          ))}
        </div>
      </div>

      <div className="showcase-divider">
        <span>Featured Influencers on Platform</span>
      </div>

      <div className="showcase-block" id="influencers">
        <div className="showcase-header">
          <div>
            <h2 className="showcase-title">Top Verified Influencers</h2>
            <p className="showcase-sub">Real Indian nano and micro influencers ready for campaigns</p>
          </div>
        </div>

        <div className="showcase-grid">
          {INFLUENCERS.map((inf, i) => (
            <div key={i} className="showcase-inf-card">
              <div className="inf-top">
                <div
                  className="hero-avatar large"
                  style={{ background: inf.bg }}
                >
                  {inf.name[0]}
                </div>
                <div>
                  <h3>{inf.name}</h3>
                  <p className="inf-handle">{inf.handle}</p>
                  <p className="inf-loc">{inf.loc}</p>
                </div>
              </div>

              <div className="inf-stats">
                <div className="i-stat">
                  <span className="i-val">{inf.followers}</span>
                  <span className="i-lbl">Followers</span>
                </div>
                <div className="i-stat">
                  <span className="i-val">{inf.eng}</span>
                  <span className="i-lbl">Engagement</span>
                </div>
                <div className="i-stat">
                  <span className="i-val">Rs.{inf.charge}</span>
                  <span className="i-lbl">Per Post</span>
                </div>
              </div>

              <div className="trust-bar-wrap">
                <span className="trust-lbl">Trust Score</span>
                <div className="trust-bar">
                  <div
                    className="trust-fill"
                    style={{ width: inf.trust + "%" }}
                  />
                </div>
                <span className="trust-val">{inf.trust}/100</span>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ShowcaseSection;