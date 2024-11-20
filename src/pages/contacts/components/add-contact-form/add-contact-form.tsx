import { FormEvent, useCallback } from 'react'

import { Button, FormControl, Grid2, Card, Typography } from '@mui/material'

import { FormInputText } from '@components'

import { addContact, useAppDispatch } from '@store'

import { useContactForm, IAddContactForm } from '@hooks'

export const AddContactForm = () => {
  const { handleSubmit, reset, control, clearErrors } = useContactForm()

  const dispatch = useAppDispatch()

  const onSubmit = (data: IAddContactForm) => {
    dispatch(addContact(data))
    reset()
    clearErrors()
  }

  const submit = useCallback(() => handleSubmit(onSubmit)(), [])

  const onFormSubmit = (event: FormEvent<any>) => {
    event.preventDefault()
    void submit()
  }

  const onButtonSubmit = () => {
    void submit()
  }

  return (
    <Card sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        role="heading"
        variant="h4"
        component="h2"
        fontWeight="500"
        mb={3}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'left',
          },
        }}
      >
        Add a new contact
      </Typography>
      <FormControl
        onSubmit={onFormSubmit}
        component="form"
        sx={{
          width: '100%',
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 4.5, lg: 5 }}>
            <FormInputText<IAddContactForm>
              name="name"
              label="Name"
              control={control}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4.5, lg: 5 }}>
            <FormInputText<IAddContactForm>
              name="city"
              label="City"
              control={control}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3, lg: 2 }}>
            <Button
              role="button"
              fullWidth
              onClick={onButtonSubmit}
              variant="contained"
            >
              Add Contact
            </Button>
          </Grid2>
        </Grid2>
      </FormControl>
    </Card>
  )
}
