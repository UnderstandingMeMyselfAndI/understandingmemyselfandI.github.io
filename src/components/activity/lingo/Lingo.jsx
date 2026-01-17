import { useState, useEffect, useRef } from 'react';
import SearchField from '@/components/ui/search/SearchField';
import Dialog from '@/components/ui/dialog/Dialog';
import lingo from '@/data/lingo.js';
import { sanitizeStringForUrl } from '@/js/utils.js';
// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import './styles.scss';
import useAppStore from '@/store/useAppStore';
const Lingo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState([]);
  const gae = useAppStore((s) => s.gae);
  const [open, setOpen] = useState(false);
  const initialHeight = 310;
  const [elHeight, setElHeight] = useState(initialHeight);
  const [elHeightExpanded, setElHeightExpanded] = useState(initialHeight);
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
  useEffect(() => {
    if (listRef.current) {
      if (!showAll && elHeight === initialHeight) {
        const listNode = listRef.current.getBoundingClientRect();
        setElHeightExpanded(listNode.height + 140);
      }
    }
  }, [elHeight, showAll]);

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
    setShowAll(!showAll);
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
  }, [content, setPhrase, gae]);
  return (
    <section
      className={'activity search-lingo' + (open ? ' open' : ' hide')}
      id='lingo'
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
            classes='lingo-search-list'
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
