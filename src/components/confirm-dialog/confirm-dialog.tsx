import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDialogProps extends Partial<DialogProps> {
  title: string
  description?: string
  onCancel?: () => void
  onSubmit?: () => void
  onClose?: () => void
  cancelButtonText?: string
  submitButtonText?: string
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title = '',
    description = '',
    open = false,
    onClose,
    onCancel: onCancelProp,
    onSubmit: onSubmitProp,
    cancelButtonText = 'Cancel',
    submitButtonText = 'Submit',
    ...rest
  } = props

  const onCancel = () => {
    onCancelProp?.()
    onClose?.()
  }

  const onSubmit = () => {
    onSubmitProp?.()
    onClose?.()
  }

  return (
    <Dialog
      role="confirm-dialog"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title" sx={{ px: 3 }}>
        {title}
      </DialogTitle>
      {description && (
        <DialogContent sx={{ px: 3 }}>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ p: 3 }}>
        <Button role="button" variant="outlined" onClick={onCancel}>
          {cancelButtonText}
        </Button>
        <Button role="button" autoFocus onClick={onSubmit} variant="contained">
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
