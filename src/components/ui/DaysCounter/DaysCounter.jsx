"use client";import { useState, useEffect } from 'react';

export default function DaysCounter() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8">
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .counter:hover {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Days Counter</h1>
          <p className="text-xl text-purple-100">Track time since important dates</p>
        </div>

        {dates.length === 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p className="text-gray-600 mb-6 text-lg">No dates added yet. Start tracking time!</p>
            <button
              onClick={addDate}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto text-lg font-medium"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Your First Date
            </button>
          </div>
        )}

        <div className="space-y-4">
          {dates.map((date, index) => (
            <div key={date.id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Label (e.g., Wedding Day, Started Job)"
                    value={date.label}
                    onChange={(e) => updateDate(index, date.selectedDate, e.target.value)}
                    className="w-full text-lg font-semibold text-gray-800 border-b-2 border-transparent focus:border-purple-600 outline-none pb-1 mb-3 placeholder-gray-400"
                  />
                  <div className="flex items-center gap-3">
                    {date.selectedDate && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        Since: {formatDate(date.selectedDate)}
                      </span>
                    )}
                    <input
                      type="datetime-local"
                      value={date.selectedDate || ''}
                      onChange={(e) => updateDate(index, e.target.value, date.label)}
                      min={getTenYearsAgo()}
                      max={getToday()}
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => resetDate(index)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Reset date"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteDate(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {date.selectedDate ? (
                <div className="grid grid-cols-3 gap-4 text-lg">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <span className="font-semibold text-blue-700">Days:</span>{' '}
                    <span className="font-bold text-blue-900">{currentTimes[index] && currentTimes[index].days !== undefined ? currentTimes[index].days.toLocaleString() : 0}</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <span className="font-semibold text-purple-700">Hours:</span>{' '}
                    <span className="font-bold text-purple-900">{currentTimes[index] && currentTimes[index].hours !== undefined ? currentTimes[index].hours.toLocaleString() : 0}</span>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <span className="font-semibold text-pink-700">Minutes:</span>{' '}
                    <span className="font-bold text-pink-900">{currentTimes[index] && currentTimes[index].minutes !== undefined ? currentTimes[index].minutes.toLocaleString() : 0}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="text-lg">Select a date to start tracking</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {dates.length > 0 && dates.length < 3 && (
          <button
            onClick={addDate}
            className="mt-6 w-full bg-white border-2 border-dashed border-purple-300 text-purple-600 px-6 py-5 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-3 text-lg font-medium"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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