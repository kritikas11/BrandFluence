import { useState } from "react";

function AdvisorPanel({ advice, searchData }) {
  const [copied, setCopied] = useState(false);

  const copyAdvice = () => {
    navigator.clipboard.writeText(advice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="advisor-panel">
      <div className="advisor-header">
        <h2>🎯 AI Campaign Advisor</h2>
        <p>Budget ₹{parseInt(searchData?.budget).toLocaleString('en-IN')} ke liye complete strategy</p>
      </div>
      <div className="advice-content">
        {advice.split('\n').map((line, i) => (
          line.trim() ? <p key={i}>{line}</p> : <br key={i} />
        ))}
      </div>
      <button className="copy-btn" onClick={copyAdvice}>
        {copied ? "✓ Copied!" : "📋 Advice Copy Karo"}
      </button>
    </div>
  );
}

export default AdvisorPanel;