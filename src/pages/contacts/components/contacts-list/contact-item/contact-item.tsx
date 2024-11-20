import { useMemo, useState } from 'react'

import { Card, Typography, Box, Button } from '@mui/material'

import { Person, LocationOn, Edit, Archive } from '@mui/icons-material'

import {
  Contact,
  editContact,
  removeContact,
  updateEditing,
  useAppDispatch,
  useAppSelector,
} from '@store'
import {
  ConfirmDialog,
  DotsMenu,
  DotsMenuItem,
  FormInputText,
} from '@components'
import { IAddContactForm, useContactForm } from '@hooks'

interface ContactItemProps {
  data: Contact
}

export const ContactItem = (props: ContactItemProps) => {
  const { data } = props

  const { handleSubmit, control, clearErrors, getValues } = useContactForm({
    defaultValues: {
      name: data.name,
      city: data.city,
    },
  })

  const dispatch = useAppDispatch()

  const editContactId = useAppSelector(state => state.contacts.editContactId)

  const [showRemoveDialog, setShowRemoveDialog] = useState(false)

  const startEdit = () => {
    dispatch(updateEditing(data.id))
  }

  const finishEdit = () => {
    dispatch(updateEditing(null))
  }

  const handleRemoveDialog = () => setShowRemoveDialog(prev => !prev)

  const edit = () => {
    dispatch(editContact({ id: data.id, data: getValues() }))
    clearErrors()
    finishEdit()
  }

  const remove = () => {
    dispatch(removeContact(data.id))
  }

  const menuItems: DotsMenuItem[] = useMemo(
    () => [
      {
        title: 'Edit',
        onClick: startEdit,
        IconElement: () => <Edit />,
      },
      {
        title: 'Remove',
        onClick: handleRemoveDialog,
        IconElement: () => <Archive />,
      },
    ],
    [data, editContactId],
  )

  return (
    <Card
      role="contact-item"
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Person sx={{ fontSize: 20 }} color="primary" />
        {editContactId === data.id ? (
          <FormInputText
            required
            name="name"
            label="Name"
            control={control}
            textFieldProps={{
              fullWidth: false,
              variant: 'outlined',
              size: 'small',
            }}
          />
        ) : (
          <Typography
            role="name-text"
            variant="subtitle1"
            fontWeight="600"
            textTransform="capitalize"
          >
            {data.name}
          </Typography>
        )}
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <LocationOn sx={{ fontSize: 20 }} color="primary" />
        {editContactId === data.id ? (
          <FormInputText<IAddContactForm>
            required
            name="city"
            label="City"
            control={control}
            textFieldProps={{
              fullWidth: false,
              variant: 'outlined',
              size: 'small',
            }}
          />
        ) : (
          <Typography role="city-text" variant="subtitle2" color="grey.600">
            {data.city}
          </Typography>
        )}
      </Box>
      {editContactId === data.id && (
        <Box pl={3.5} mt={2}>
          <Button
            role="button"
            variant="contained"
            onClick={handleSubmit(edit)}
          >
            Save
          </Button>
        </Box>
      )}
      <Box position="absolute" top={3} right={3}>
        <DotsMenu items={menuItems} />
      </Box>
      <ConfirmDialog
        open={showRemoveDialog}
        onClose={handleRemoveDialog}
        title={`Are you sure you want to delete this contact?`}
        description="If you delete this contact, it will be removed from the contacts list permanently."
        submitButtonText="Remove"
        onSubmit={remove}
      />
    </Card>
  )
}
