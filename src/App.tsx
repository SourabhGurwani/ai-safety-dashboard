import React, { useState } from 'react';
import './App.css';

type Severity = 'Low' | 'Medium' | 'High';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reported_at: string;
}

const initialIncidents: Incident[] = [
  { 
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics in job recommendations, potentially violating equal opportunity regulations.", 
    severity: "Medium", 
    reported_at: "2025-03-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "Language model provided incorrect medical treatment information that could have led to patient harm if not caught by human review.", 
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata through API response headers.", 
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z" 
  }
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Low' as Severity
  });

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newIncident: Incident = {
      id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1,
      title: formData.title,
      description: formData.description,
      severity: formData.severity,
      reported_at: new Date().toISOString()
    };
    
    setIncidents([...incidents, newIncident]);
    setFormData({ title: '', description: '', severity: 'Low' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🚨 AI Safety Incident Dashboard</h1>
          <p className="subtitle">Tracking and preventing AI-related risks</p>
        </div>
        <div className="header-actions">
          <button 
            className={`primary-btn ${showForm ? 'cancel-btn' : ''}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <span className="icon">✕</span> Cancel
              </>
            ) : (
              <>
                <span className="icon">+</span> Report Incident
              </>
            )}
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="controls-panel">
          <div className="control-group">
            <label className="control-label">Filter by Severity</label>
            <div className="severity-filters">
              <button 
                className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                onClick={() => setFilter('All')}
              >
                All
              </button>
              <button 
                className={`filter-btn low ${filter === 'Low' ? 'active' : ''}`}
                onClick={() => setFilter('Low')}
              >
                Low
              </button>
              <button 
                className={`filter-btn medium ${filter === 'Medium' ? 'active' : ''}`}
                onClick={() => setFilter('Medium')}
              >
                Medium
              </button>
              <button 
                className={`filter-btn high ${filter === 'High' ? 'active' : ''}`}
                onClick={() => setFilter('High')}
              >
                High
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Sort by Date</label>
            <div className="sort-options">
              <button 
                className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`}
                onClick={() => setSortOrder('newest')}
              >
                Newest First
              </button>
              <button 
                className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
                onClick={() => setSortOrder('oldest')}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit} className="incident-form">
              <h2 className="form-title">Report New Safety Incident</h2>
              
              <div className="form-group">
                <label className="form-label">
                  Incident Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Briefly describe the incident"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Provide detailed information about what happened, potential impact, and steps to reproduce"
                  rows={5}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <div className="severity-options">
                  <label className="severity-option">
                    <input
                      type="radio"
                      name="severity"
                      value="Low"
                      checked={formData.severity === 'Low'}
                      onChange={handleInputChange}
                    />
                    <span className="severity-tag low">Low</span>
                  </label>
                  <label className="severity-option">
                    <input
                      type="radio"
                      name="severity"
                      value="Medium"
                      checked={formData.severity === 'Medium'}
                      onChange={handleInputChange}
                    />
                    <span className="severity-tag medium">Medium</span>
                  </label>
                  <label className="severity-option">
                    <input
                      type="radio"
                      name="severity"
                      value="High"
                      checked={formData.severity === 'High'}
                      onChange={handleInputChange}
                    />
                    <span className="severity-tag high">High</span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Incident Report
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="incidents-list">
          {sortedIncidents.length > 0 ? (
            sortedIncidents.map(incident => (
              <div 
                key={incident.id} 
                className={`incident-card ${incident.severity.toLowerCase()} ${expandedId === incident.id ? 'expanded' : ''}`}
              >
                <div className="incident-header">
                  <div className="incident-meta">
                    <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                      {incident.severity}
                    </span>
                    <span className="incident-date">
                      {new Date(incident.reported_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <h3 className="incident-title">{incident.title}</h3>
                </div>
                
                <button 
                  className="toggle-details-btn"
                  onClick={() => toggleExpand(incident.id)}
                  aria-expanded={expandedId === incident.id}
                >
                  {expandedId === incident.id ? 'Hide Details' : 'View Details'}
                  <span className="toggle-icon">
                    {expandedId === incident.id ? '▲' : '▼'}
                  </span>
                </button>
                
                {expandedId === incident.id && (
                  <div className="incident-details">
                    <p className="incident-description">{incident.description}</p>
                    <div className="incident-actions">
                      {/* <button className="action-btn">
                        <span className="icon">✏️</span> Edit
                      </button>
                      <button className="action-btn">
                        <span className="icon">🗑️</span> Delete
                      </button> */}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No incidents found</h3>
              <p>Try adjusting your filters or report a new incident</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;