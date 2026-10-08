// import * as React from "react";
import { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import useAppStore from '@store/useAppStore'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import IconTaskComplete from '@icons/IconTaskComplete'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'

// import strings from "data/strings.js";
import { cnf } from '@data/config.js'
import './styles.scss'

const SnackBars = () => {
  const [open, setOpen] = useState(false)
  const [message2, setMessage2] = useState('')
  const [severity, setSeverity] = useState('success')

  const message = useAppStore((s) => s.message)

  // Only show snackbars after scrollStage >= 3
  const canShow = true //scrollStage >= 3;

  useEffect(() => {
    if (!canShow || !message) return

    setMessage2(message)
    setSeverity('success')
    setOpen(true)
  }, [message, canShow])

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <div className='snackbars'>
      <Snackbar
        className={'snackBar alert'}
        open={open}
        autoHideDuration={cnf?.duration?.hide.snackbar || 2000}
        onClose={handleClose}
        slots={{ transition: Slide }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
          iconMapping={{
            success: <HandymanOutlinedIcon fontSize='inherit' />,
            // info: <IconTaskComplete className='snackbar__icon-complete' />,
          }}>
          {message2}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackBars
