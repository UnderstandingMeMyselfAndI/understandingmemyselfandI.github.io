import { useState, useEffect, useRef } from 'react';
import SearchField from '@/components/ui/search/SearchField';
import Dialog from '@/components/ui/dialog/Dialog';
import lingo from '@/data/lingo.js';
import { sanitizeStringForUrl } from '@/js/utils.js';

// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import './styles.scss';
import useAppStore from '@/store/useAppStore';
import { set } from 'idb-keyval';
const Lingo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState([]);
  const gae = useAppStore((s) => s.gae);
  const [open, setOpen] = useState(false);
  const initialHeight = 310;
  const [elHeight, setElHeight] = useState(initialHeight);
  const [elHeightExpanded, setElExpandedHeight] = useState(initialHeight);
  const activity = useAppStore((s) => s.activity);

  const listRef = useRef(null);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  const setPhrase = useAppStore((state) => state.setPhrase);
  function getContent(id) {
    if (!id) return;

    return lingo.find((item) => {
      if (item.id === id) return item.lingoFieldGroup;
    });
  }
  function getElementHeight(node){
    return node ?  node.getBoundingClientRect().height : 0;
  }

  
  useEffect(() => {
    if (!showAll && listRef.current) {
      
      if(getElementHeight(listRef.current) === 0) {
        const int = setInterval(()=>{
            const height = getElementHeight(listRef.current)
            if(height === 0) return; 
              clearInterval(int)
              setElExpandedHeight(height + 140);
        }, 300);
      }
    }
    
  }, [ listRef, showAll]);

  useEffect(() => {
    if (!showDialog) window.history.pushState({ page: '' }, '', '');
  }, [showDialog]);

  const handleClick = (id) => {
    const search = getContent(id);
    if (search?.lingoFieldGroup?.description) {
      setContent(search);
      setShowDialog(true);
    }
  };

  const handleExpandClick = () => {
    const node = document.getElementById('lingo');
    node.scrollIntoView({ behavior: 'smooth' });
    setShowAll(prevState => !prevState);
  };
  useEffect(() => {
    if (content?.title && content.id) {
      setPhrase([content.id, content?.title]);

      const event_name =
        'phrase_viewed_' + sanitizeStringForUrl(content?.title);

      if (gae && window.gtag) {
        window.gtag('event', event_name ? event_name : 'phrase_viewed', {
          phrase_name: content?.title,
          phrase_id: content.id,
        });
      } else {
        console.log('GA not enabled');
      }
     
    }
  }, [content,setPhrase, gae]);
  return (
    <section
    id='lingo'
      className={'activity activity-search-lingo' + (open ? ' show' : ' hide')}
      
    >
      <div className='search-lingo-wrap'>
        <Dialog
          show={showDialog}
          title={content?.title}
          instruction={content?.lingoFieldGroup?.description}
          confirmLabel='Close'
          onConfirm={() => setShowDialog(false)}
          showCancel={false}
          onClick={() => setShowDialog(false)}
        />
        <h3>Lingo &amp; Phrases</h3>
        <div
          className={
            'lingo-list-wrapper' + (showAll ? ' expand' : '  collapse')
          }
          style={{ height: `${showAll ? elHeightExpanded : elHeight}px` }}
        >
          <SearchField
            handleClick={handleClick}
            ref={listRef}
          />
        </div>
        <div
          className={'lingo-list-btn' + (showAll ? ' expand' : ' collapse')}
          onClick={handleExpandClick}
        >
          {showAll ? 'HIDE LINGO' : 'SHOW ALL LINGO'}
        </div>
      </div>
    </section>
  );
};

export default Lingo;
