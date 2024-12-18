import { Container, Grid2, Typography } from '@mui/material'

import { AddContactForm, ContactsList, SearchBox } from './components'

import { useAppSelector } from '@store'

export const ContactsPage = () => {
  const contacts = useAppSelector(state => state.contacts.data)

  return (
    <Container maxWidth="lg">
      <Typography
        align="center"
        variant="h1"
        component="h1"
        fontWeight="bold"
        mb={4}
        sx={{
          fontSize: {
            xs: '3rem',
            sm: '4rem',
            md: '6rem',
          },
        }}
      >
        CONTACTS
      </Typography>
      <Grid2 container spacing={4}>
        <Grid2 size={12}>
          <AddContactForm />
        </Grid2>
        {contacts.length > 0 && (
          <Grid2 size={12}>
            <SearchBox />
          </Grid2>
        )}
        <Grid2 size={12}>
          <ContactsList />
        </Grid2>
      </Grid2>
    </Container>
  )
}
