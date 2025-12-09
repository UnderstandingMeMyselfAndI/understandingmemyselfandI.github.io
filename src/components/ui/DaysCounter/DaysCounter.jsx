import { useState, useEffect } from 'react';
import "./styles.scss";

const DaysCounter = () => {
  const getInitialDates = () => {
    try {
      const saved = localStorage.getItem('daysCounterDates');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  const [dates, setDates] = useState(getInitialDates());
  const [currentTimes, setCurrentTimes] = useState({});

  const getTenYearsAgo = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    return date.toISOString().slice(0, 16);
  };

  const getToday = () => {
    return new Date().toISOString().slice(0, 16);
  };

  useEffect(() => {
    try {
      localStorage.setItem('daysCounterDates', JSON.stringify(dates));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [dates]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimes = {};
      dates.forEach((date, index) => {
        if (date.selectedDate) {
          const diff = now - new Date(date.selectedDate).getTime();
          newTimes[index] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor(diff / (1000 * 60))
          };
        }
      });
      setCurrentTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [dates]);

  const addDate = () => {
    if (dates.length < 3) {
      setDates([...dates, { id: Date.now(), selectedDate: null, label: '' }]);
    }
  };

  const updateDate = (index, dateValue, labelValue) => {
    const newDates = [...dates];
    newDates[index] = { ...newDates[index], selectedDate: dateValue, label: labelValue };
    setDates(newDates);
  };

  const resetDate = (index) => {
    const newDates = [...dates];
    newDates[index] = { ...newDates[index], selectedDate: null };
    setDates(newDates);
  };

  const deleteDate = (index) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="days-counter">   
      <div className="days-counter-container">
        <div className="days-counter-header">
          <h1 className="days-counter-title">Days Counter</h1>
          <p className="days-counter-subtitle">Track time since important dates</p>
        </div>

        {dates.length === 0 && (
          <div className="days-counter-empty-state">
            <svg className="days-counter-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p className="days-counter-empty-text">No dates added yet. Start tracking time!</p>
            <button
              onClick={addDate}
              className="days-counter-add-first-btn"
            >
              <svg className="days-counter-add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Your First Date
            </button>
          </div>
        )}

        <div className="days-counter-list">
          {dates.map((date, index) => (
            <div key={date.id} className="days-counter-card">
              <div className="days-counter-card-header">
                <div className="days-counter-card-info">
                  <input
                    type="text"
                    placeholder="Label (e.g., Wedding Day, Started Job)"
                    value={date.label}
                    onChange={(e) => updateDate(index, date.selectedDate, e.target.value)}
                    className="days-counter-label-input"
                  />
                  <div className="days-counter-date-controls">
                    {date.selectedDate && (
                      <span className="days-counter-selected-date">
                        Since: {formatDate(date.selectedDate)}
                      </span>
                    )}
                    <input
                      type="datetime-local"
                      value={date.selectedDate || ''}
                      onChange={(e) => updateDate(index, e.target.value, date.label)}
                      min={getTenYearsAgo()}
                      max={getToday()}
                      className="days-counter-date-input"
                    />
                  </div>
                </div>
                <div className="days-counter-card-actions">
                  <button
                    onClick={() => resetDate(index)}
                    className="days-counter-reset-btn"
                    title="Reset date"
                  >
                    <svg className="days-counter-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteDate(index)}
                    className="days-counter-delete-btn"
                    title="Delete"
                  >
                    <svg className="days-counter-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {date.selectedDate ? (
                <div className="days-counter-stats">
                  <div className="days-counter-stat days-counter-stat-days">
                    <span className="days-counter-stat-label">Days:</span>{' '}
                    <span className="days-counter-stat-value">{currentTimes[index] && currentTimes[index].days !== undefined ? currentTimes[index].days.toLocaleString() : 0}</span>
                  </div>
                  <div className="days-counter-stat days-counter-stat-hours">
                    <span className="days-counter-stat-label">Hours:</span>{' '}
                    <span className="days-counter-stat-value">{currentTimes[index] && currentTimes[index].hours !== undefined ? currentTimes[index].hours.toLocaleString() : 0}</span>
                  </div>
                  <div className="days-counter-stat days-counter-stat-minutes">
                    <span className="days-counter-stat-label">Minutes:</span>{' '}
                    <span className="days-counter-stat-value">{currentTimes[index] && currentTimes[index].minutes !== undefined ? currentTimes[index].minutes.toLocaleString() : 0}</span>
                  </div>
                </div>
              ) : (
                <div className="days-counter-no-date">
                  <svg className="days-counter-no-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="days-counter-no-date-text">Select a date to start tracking</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {dates.length > 0 && dates.length < 3 && (
          <button
            onClick={addDate}
            className="days-counter-add-another-btn"
          >
            <svg className="days-counter-add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Another Date ({dates.length}/3)
          </button>
        )}
      </div>
    </div>
  );
}

export default DaysCounter;