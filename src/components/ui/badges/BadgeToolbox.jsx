import Badge from '@mui/material/Badge'
import parse from 'html-react-parser'
import useAppStore from '@store/useAppStore'
import HandymanIcon from '@mui/icons-material/Handyman'
import { strings } from '@data/config.js'

import './badgeToolbox.scss'

export default function BadgeToolbox({ showBadge = true }) {
  const activeIDs = useAppStore((state) => state.userToolIDs)
  const toggleShowToolsOnly = useAppStore((s) => s.toggleShowToolsOnly)
  const showToolsOnly = useAppStore((s) => s.showToolsOnly)
  const setMessage = useAppStore((s) => s.setMessage)

  const handleChange = () => {
    if (activeIDs.length < 1) {
      setMessage('No tools in your toolbox. Favourite a tool first.')
      return
    }
    if (showToolsOnly) {
      // set the message as the opposite here
      setMessage(strings.tools.list.unfiltered)
    } else {
      setMessage(strings.tools.list.yourToolsFiltered)
    }

    toggleShowToolsOnly()
  }

  return (
    <div className={'badge-toolbox'}>
      <div className={'badge-cont ' + (showBadge ? '' : ' hide')}>
        <Badge
          className={'badge toolbox' + (showToolsOnly ? ' active' : '')}
          badgeContent={activeIDs.length}
          aria-label='Your toolbox button'
          onClick={handleChange}

          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <HandymanIcon className='icon' sx={{ transform: 'scale(0.8) translate(0,-10px)' }} />
          <div className='badge__label'>{showToolsOnly ? parse('All<br />Tools') : parse('Your<br />Tools')} </div>
        </Badge>
      </div>
    </div>
  )
}
