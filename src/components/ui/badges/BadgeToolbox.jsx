import * as React from 'react';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
// import {createTheme, alpha, getContrastRatio, ThemeProvider} from "@mui/material/styles";
import useAppStore from '@/store/useAppStore';
import HandymanIcon from '@mui/icons-material/Handyman';

import { storeKeys, localStore } from 'data/localStore.js';
import data from 'data/data.js';
import { strings } from 'data/config.js';

import './BadgeToolbox.scss';

export default function BadgeToolbox() {
  const activeIDs = useAppStore((state) => state.userToolIDs);
  const showAccCard = useAppStore((s) => s.showAccCard);
  const toolsInView = useAppStore((s) => s.toolsInView);
  const activityID = useAppStore((s) => s.activityID);
  const activity = useAppStore((s) => s.activity);
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  const toggleShowToolsOnly = useAppStore((s) => s.toggleShowToolsOnly);
  // const userToolIDs = useAppStore((s) => s.userToolIDs)
  const showToolsOnly = useAppStore((s) => s.showToolsOnly);
  const setMessage = useAppStore((s) => s.setMessage);

  useEffect(() => {
    setShow(toolsInView);
  }, [toolsInView]);

  useEffect(() => {
    if (window.scrollY < 600) return;
    setShow(!showAccCard);
  }, [showAccCard, setShow]);

  const handleChange = () => {
    console.log('handleChange activeIDs.length ', activeIDs.length);
    if (activeIDs.length < 1) {
      setMessage('No tools in your toolbox. Favourite a tool first.');
      return;
    }
    if (showToolsOnly) {
      // set the message as the opposite here
      setMessage(strings.tools.list.unfiltered);
    } else {
      setMessage(strings.tools.list.yourToolsFiltered);
    }
    setTimeout(() => {
      const el = document.getElementById('tools');

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    // setOpenAlert(true);
    toggleShowToolsOnly();
  };

  return open ? (
    <div>
      <div className={'badge-cont ' + (show ? '' : ' hide')}>
        <Badge
          className={'badge toolbox' + (showToolsOnly ? ' active' : '')}
          badgeContent={activeIDs.length}
          onClick={handleChange}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <HandymanIcon className='icon' />
        </Badge>
      </div>
    </div>
  ) : (
    <></>
  );
}
