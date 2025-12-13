import { useState, useEffect } from 'react';
import "./styles.scss";
import AddIcon from '@mui/icons-material/Add';
import CloseBtn from '../buttons/close/CloseBtn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackdropParallax from '../backdrop/Backdrop';
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
    <div className={"days-counter"+ (dates.length === 2 ? " full" : "")}> 
      <CloseBtn />
      <div className={"days-counter-container"+ (dates.length === 2 ? " full" : "")}>
       

        {dates.length === 0 && (
          <div className="days-counter-empty-state">
            <div className="days-counter-empty-title">Let's do this</div>
              <div  className="days-counter-add-first-icon"  onClick={addDate} ><AddIcon /></div>
              <button
                onClick={addDate}
                className="days-counter-add-first-btn"
              >
               Add Date
              </button>
          </div>
        )}

        <div className={"days-counter-list"+ (dates.length === 2 ? " full" : "")}>
          {dates.map((date, index) => (
            <div key={date.id} className="days-counter-card">
              <div className="days-counter-card-header">
                <div className="days-counter-card-actions">
                  <button
                    onClick={() => deleteDate(index)}
                    className="days-counter-delete-btn"
                    title="Delete"
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>

              {date.selectedDate ? (
                <div className="days-counter-values">
                  <div className="days-counter-stat">                   
                    
                      <span className="value">
                        {currentTimes[index] && currentTimes[index].days !== undefined ? currentTimes[index].days.toLocaleString() : 0}</span>
                      <span className="label">days</span>
                  </div>
                  <div className="days-counter-stat-group"> 
                  <div className="days-counter-stat">                   
                      <span className="value">{currentTimes[index] && currentTimes[index].hours !== undefined ? currentTimes[index].hours.toLocaleString() : 0}</span>
                      <span className="label">hours</span>
                  </div>
                  <div className="days-counter-stat">
                      <span className="value">{currentTimes[index] && currentTimes[index].minutes !== undefined ? currentTimes[index].minutes.toLocaleString() : 0}</span>
                       <span className="label">minutes</span>
                    </div>
                     </div>
                </div>
              ) : (
                
                  <div className="days-counter-stat-group-new">
                    <div className="days-counter-stat-new">
                      <span className="value">0</span>
                    </div>
                  </div>
                 
              )}
               <div className="new-date">
                <div className="title">
                  <input
                        type="text"
                        placeholder="Tap here to set a title"
                        value={date.label}
                        onChange={(e) => updateDate(index, date.selectedDate, e.target.value)}
                        className="days-counter-title-input"
                    />
                </div>
                <div className="days-counter-selected-date">
                 
                  {date.selectedDate ? (                    
                      <span className="">
                        {formatDate(date.selectedDate)}
                      </span>
                    ) : (
                    <></>
                    )}
                     {!date.selectedDate ? (
                    <input
                      type="datetime-local"
                      value={date.selectedDate || ''}
                      onChange={(e) => updateDate(index, e.target.value, date.label)}
                      min={getTenYearsAgo()}
                      max={getToday()}
                      className="days-counter-date-input"
                      />
                      ) : ( <> </>)}
                </div>              
              </div>
            </div>
          ))}
          <span className="days-counter-note">* All details are saved locally on your device to ensure your privacy.</span>
        </div>

        {dates.length > 0 && dates.length < 2 && (
          <button
            onClick={addDate}
            className="days-counter-add-another-btn"
          >
           ({dates.length}/2)
          </button>
        )}
      </div>
      <div  className="days-counter-backdrop"> 
        <BackdropParallax
                  initialImageId={3}
                  initialDelay={3000}
                  interval={6000}
                  parallaxStrength={0}
                />
        </div>
    </div>
  );
}

export default DaysCounter;