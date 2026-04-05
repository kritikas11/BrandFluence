function InfluencerCard({ influencer, rank }) {
  // Generate avatar emoji based on niche
  const getAvatarEmoji = (niche) => {
    const emojiMap = {
      fashion: "👗",
      food: "🍜",
      beauty: "💄",
      fitness: "💪",
      travel: "✈️",
      business: "💼",
      lifestyle: "🌟",
      realestate: "🏠",
      handmade: "🎨"
    };
    return emojiMap[niche?.toLowerCase()] || "🌟";
  };

  return (
    <div className="influencer-card">
      <div className="rank-badge">#{rank}</div>
      
      <div className="profile-section">
        <div className="profile-pic">
          {getAvatarEmoji(influencer.niche)}
        </div>
        <div className="profile-info">
          <h3>{influencer.full_name}</h3>
          <span className="username">@{influencer.username}</span>
          <div className="tags">
            <span className="tag city">📍 {influencer.city}</span>
            <span className="tag niche">{influencer.niche}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-value">{influencer.followers >= 1000 
            ? `${(influencer.followers / 1000).toFixed(1)}K` 
            : influencer.followers}
          </span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">₹{influencer.charge_per_post}</span>
          <span className="stat-label">Per Post</span>
        </div>
        <div className="stat">
          <span className="stat-value">{influencer.trust_score}</span>
          <span className="stat-label">Trust</span>
        </div>
        <div className="stat">
          <span className="stat-value">{influencer.engagement_rate}%</span>
          <span className="stat-label">Engage</span>
        </div>
      </div>

      <div className="match-section">
        <span>Match Score</span>
        <div className="match-bar">
          <div 
            className="match-fill" 
            style={{ width: `${Math.round(influencer.match_score * 100)}%` }}
          />
        </div>
        <span>{Math.round(influencer.match_score * 100)}%</span>
      </div>

      <a 
        href={`https://instagram.com/${influencer.username}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="contact-btn"
      >
        View Profile
      </a>
    </div>
  );
}

export default InfluencerCard;