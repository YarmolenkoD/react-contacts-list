import { useCallback, useMemo } from 'react'

import { Box, Grid2, Typography } from '@mui/material'

import { Contact, useAppSelector } from '@store'

import { ContactItem } from './contact-item'

export const ContactsList = () => {
  const search = useAppSelector(state => state.contacts.search)

  const contacts = useAppSelector(state => state.contacts.data)

  const filteredContacts = useMemo(() => {
    if (search) {
      const regexp = new RegExp(search.toLowerCase().trim(), 'ig')
      return contacts.filter(contact => regexp.test(contact.name.toLowerCase()))
    }

    return contacts
  }, [search, contacts])

  const renderPlaceholder = useCallback((title: string) => {
    return (
      <Box sx={{ px: 2 }}>
        <Typography variant="h5" color="grey.600">
          {title}
        </Typography>
      </Box>
    )
  }, [])

  const renderContactItem = useCallback((contact: Contact) => {
    return (
      <Grid2 key={contact.id} size={12}>
        <ContactItem data={contact} />
      </Grid2>
    )
  }, [])

  if (contacts.length === 0) {
    return renderPlaceholder('No items')
  }

  if (filteredContacts.length === 0) {
    return renderPlaceholder('No items found')
  }

  return (
    <Grid2 role="contacts-list" container spacing={3}>
      {filteredContacts.map(renderContactItem)}
    </Grid2>
  )
}
