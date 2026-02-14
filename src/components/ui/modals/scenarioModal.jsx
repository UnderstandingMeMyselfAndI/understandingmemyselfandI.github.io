import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'fixed',
  top: '50%',
  left: '0',
  height: 'fit-content',
  width: '80%',
  maxHeight: '200px',
  marginTop: '-25%',
  marginLeft: 'auto',
  marginRightt: 'auto',

  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

export default function ScenarioModal() {
  const [open, setOpen] = React.useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ postion: 'relative', outline: '1px solid white' }}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ position: 'absolute', right: '0px', top: '10px' }}
          >
            <CloseIcon sx={{ fill: 'white' }} />
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
