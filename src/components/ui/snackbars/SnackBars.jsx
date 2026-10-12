import { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import useAppStore from '@store/useAppStore'
import IconTaskComplete from '@icons/IconTaskComplete'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'
import { cnf } from '@data/config.js'
import './styles.scss'

const SnackBars = () => {
  const [open, setOpen] = useState(false)
  const [message2, setMessage2] = useState('')
  const [severity, setSeverity] = useState('success')

  const message = useAppStore((s) => s.message)
  const messageId = useAppStore((s) => s.messageId)
  const action = useAppStore((s) => s.snackbarAction)
  const clearSnackbar = useAppStore((s) => s.clearSnackbar)

  const canShow = true // scrollStage >= 3

  useEffect(() => {
    if (!canShow) return
    if (!message) {
      setOpen(false)
      return
    }
    setMessage2(message)
    setSeverity('success')
    setOpen(true)
  }, [message, messageId, canShow])

  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
    // Clear so the same string can fire again on a future day.
    clearSnackbar()
  }

  const handleAction = () => {
    const cb = action?.onAction
    setOpen(false)
    if (typeof cb === 'function') cb()
    clearSnackbar()
  }

  const hasAction = Boolean(action?.label)

  return (
    <div className='snackbars'>
      <Snackbar
        className={'snackBar alert'}
        open={open}
        autoHideDuration={
          hasAction ? cnf?.duration?.hide?.snackbarWithAction || 8000 : cnf?.duration?.hide?.snackbar || 2000
        }
        onClose={handleClose}
        slots={{ transition: Slide }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
          action={
            hasAction ? (
              <Button
                color='inherit'
                size='small'
                onClick={handleAction}
                sx={{ textTransform: 'none', fontWeight: 600, color: 'inherit' }}>
                {action.label}
              </Button>
            ) : null
          }
          iconMapping={{
            success: <HandymanOutlinedIcon fontSize='inherit' />,
          }}>
          {message2}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackBars
