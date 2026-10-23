import Badge from '@mui/material/Badge'
import parse from 'html-react-parser'
import useAppStore from '@store/useAppStore'
import usePrivateStore from '@store/usePrivateStore'
import HandymanIcon from '@mui/icons-material/Handyman'
import { strings } from '@data/config.js'

import './badgeToolbox.scss'

export default function BadgeToolbox({ showBadge = true }) {
  const activeIDs = usePrivateStore((state) => state.userToolIDs)
  // const toggleShowToolsOnly = usePrivateStore((s) => s.toggleShowToolsOnly)
  const toolboxFilterEnabled = usePrivateStore((s) => s.toolboxFilterEnabled)
  const setFilterTools = usePrivateStore((s) => s.setFilterTools)
  const filterTools = usePrivateStore((s) => s.filterTools)
  const setMessage = useAppStore((s) => s.setMessage)

  const handleChange = () => {
    if (activeIDs.length < 1) {
      setMessage('No tools in your toolbox. Favourite a tool first.')
      return
    }
    if (filterTools) {
      // set the message as the opposite here
      setMessage(strings.tools.list.unfiltered)
    } else {
      setMessage(strings.tools.list.yourToolsFiltered)
    }

    setFilterTools(!filterTools)
  }

  return (
    <div className={'badge-toolbox'}>
      <div className={'badge-cont ' + (showBadge ? '' : ' hide')}>
        <Badge
          className={'badge toolbox' + (filterTools ? ' active' : ' ')}
          badgeContent={activeIDs.length}
          aria-label='Your toolbox button'
          onClick={handleChange}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <HandymanIcon className='icon' sx={{ transform: 'scale(0.8) translate(0,-10px)' }} />
          <div className='badge__label'>{!filterTools ? parse('All<br />Tools') : parse('Your<br />Tools')} </div>
        </Badge>
      </div>
    </div>
  )
}
