import { useState, useEffect } from 'react';
import SearchField from '@/components/ui/search/SearchField';
import Dialog from '@/components/ui/dialog/Dialog';
import lingo from '@/data/lingo.js';
import { sanitizeStringForUrl } from '@/js/utils.js';
// import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import './styles.scss';
import useAppStore from '@/store/useAppStore';
const Lingo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [content, setContent] = useState([]);
  const gae = useAppStore((s) => s.gae);
  const [open, setOpen] = useState(false);
  const activity = useAppStore((s) => s.activity);
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
    if (!showDialog) window.history.pushState({ page: '' }, '', '');
  }, [showDialog]);

  const handleClick = (id) => {
    const search = getContent(id);
    if (search?.lingoFieldGroup?.description) {
      setContent(search);
      setShowDialog(true);
    }
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
  return open ? (
    <section className='search-lingo activity' id='lingo'>
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
      <SearchField handleClick={handleClick} />
      {/* <div className='lingo-list-arrow'>
        {/* <UnfoldMoreDoubleIcon className='lingo-list-icon' />
        <UnfoldMoreDoubleIcon className='lingo-list-icon' /> 
      </div> */}
    </section>
  ) : null;
};

export default Lingo;
