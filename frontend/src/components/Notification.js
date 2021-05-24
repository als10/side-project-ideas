import React, { useState, useImperativeHandle } from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const Notification = React.forwardRef(({ message }, ref) => {
  const [open, setOpen] = useState(false)

  Notification.displayName = 'Notification'

  useImperativeHandle(ref, () => (
    { setOpen }
  ))

  return (
    <>
      {message.severity
        ?
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => setOpen(false)}
            severity={message.severity}
          >
            {message.message}
          </Alert>
        </Snackbar>
        :
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message={message.message}
        />}
    </>
  )
})

export default Notification