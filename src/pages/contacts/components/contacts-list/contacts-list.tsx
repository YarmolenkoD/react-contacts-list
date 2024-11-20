import { useCallback, useMemo } from 'react'

import { Grid2 } from '@mui/material'

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

  const renderContactItem = useCallback((contact: Contact) => {
    return (
      <Grid2 key={contact.id} size={12}>
        <ContactItem data={contact} />
      </Grid2>
    )
  }, [])

  return (
    <Grid2 role="contacts-list" container spacing={3}>
      {filteredContacts.map(renderContactItem)}
    </Grid2>
  )
}
