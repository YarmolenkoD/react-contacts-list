import { describe, it, expect, beforeEach } from 'vitest'

import '@testing-library/jest-dom'

import { screen, within } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { ContactsPage } from '@pages'
import { Contact } from '@store'
import { renderWithProviders } from '@tests'

const initialContacts: Contact[] = [
  { name: 'John Doe', city: 'San Jose', id: '1' },
  { name: 'Jane Smith', city: 'Los Angeles', id: '2' },
  { name: 'Alice Johnson', city: 'New York', id: '3' },
]

const BASE_PROVIDER_STATE = {
  preloadedState: {
    contacts: {
      search: '',
      data: initialContacts,
      editContactId: null,
    },
  },
}

describe('Contacts page', () => {
  beforeEach(() => {
    renderWithProviders(<ContactsPage />, BASE_PROVIDER_STATE)
  })

  it('renders the contacts page', () => {
    expect(screen.getByText('CONTACTS')).toBeInTheDocument()
  })

  it('renders the add contacts form', () => {
    expect(
      screen.getByRole('heading', { name: /Add a new contact/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /City/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Add Contact/i }),
    ).toBeInTheDocument()
  })

  it('renders the search box', () => {
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('renders the contacts list with 3 items', () => {
    const contactsList = screen.getByRole('contacts-list')

    expect(contactsList.childElementCount).toBe(3)

    initialContacts.forEach(contact => {
      expect(screen.getByText(contact.name)).toBeInTheDocument()
      expect(screen.getByText(contact.city)).toBeInTheDocument()
    })
  })

  it('should add new contact item to list', async () => {
    const contactsList = screen.getByRole('contacts-list')
    const nameTextBox = screen.getByRole('textbox', { name: /Name/i })
    const cityTextBox = screen.getByRole('textbox', { name: /City/i })
    const addContactButton = screen.getByRole('button', {
      name: /Add Contact/i,
    })

    const name = 'Bob Brown'
    const city = 'Phoenix'

    await userEvent.type(nameTextBox, name)
    await userEvent.type(cityTextBox, city)

    expect(nameTextBox).toHaveValue(name)
    expect(cityTextBox).toHaveValue(city)

    await userEvent.click(addContactButton)

    expect(nameTextBox).toHaveValue('')
    expect(cityTextBox).toHaveValue('')

    expect(contactsList.childElementCount).toBe(4)
  })

  it('should remove one contact item from list', async () => {
    const contactsList = screen.getByRole('contacts-list')
    const contactItems = screen.getAllByRole('contact-item')

    expect(contactItems.length).toBe(3)

    const firstContactItem = contactItems[0]

    const menuButton = within(firstContactItem).getByRole('dots-menu-button')

    await userEvent.click(menuButton)

    const removeMenuItem = screen.getByText(/Remove/i)

    expect(removeMenuItem).toBeInTheDocument()

    await userEvent.click(removeMenuItem)

    const confirmDialog = screen.getByRole('confirm-dialog')

    expect(confirmDialog).toBeInTheDocument()

    const removeButton = within(confirmDialog).getByRole('button', {
      name: /Remove/i,
    })

    expect(removeButton).toBeInTheDocument()

    await userEvent.click(removeButton)

    expect(contactsList.childElementCount).toBe(2)
  })

  it('should edit first contact item from list', async () => {
    const contactItems = screen.getAllByRole('contact-item')

    const firstContactItem = contactItems[0]

    const menuButton = within(firstContactItem).getByRole('dots-menu-button')
    const nameText = within(firstContactItem).getByRole('name-text')
    const cityText = within(firstContactItem).getByRole('city-text')

    expect(nameText).toBeInTheDocument()
    expect(nameText).toHaveTextContent(initialContacts[0].name)
    expect(cityText).toBeInTheDocument()
    expect(cityText).toHaveTextContent(initialContacts[0].city)

    await userEvent.click(menuButton)

    const editMenuItem = screen.getByText(/Edit/i)

    expect(editMenuItem).toBeInTheDocument()

    await userEvent.click(editMenuItem)

    expect(nameText).not.toBeInTheDocument()
    expect(cityText).not.toBeInTheDocument()

    const nameTextBox = within(firstContactItem).getByRole('textbox', {
      name: /Name/i,
    })
    const cityTextBox = within(firstContactItem).getByRole('textbox', {
      name: /City/i,
    })

    expect(nameTextBox).toHaveValue(initialContacts[0].name)
    expect(cityTextBox).toHaveValue(initialContacts[0].city)

    const newName = 'Diana Miller'
    const newCity = 'Philadelphia'

    await userEvent.clear(nameTextBox)
    await userEvent.type(nameTextBox, newName)
    await userEvent.clear(cityTextBox)
    await userEvent.type(cityTextBox, newCity)

    expect(nameTextBox).toHaveValue(newName)
    expect(cityTextBox).toHaveValue(newCity)

    const saveButton = within(firstContactItem).getByRole('button', {
      name: /Save/i,
    })

    await userEvent.click(saveButton)

    expect(nameTextBox).not.toBeInTheDocument()
    expect(cityTextBox).not.toBeInTheDocument()

    const updatedNameText = within(firstContactItem).getByRole('name-text')
    const updatedCityText = within(firstContactItem).getByRole('city-text')

    expect(updatedNameText).toBeInTheDocument()
    expect(updatedNameText).toHaveTextContent(newName)
    expect(updatedCityText).toBeInTheDocument()
    expect(updatedCityText).toHaveTextContent(newCity)
  })

  it('should filter the list of contacts by name when entering in the search box', async () => {
    const contactsList = screen.getByRole('contacts-list')
    const searchBox = screen.getByRole('textbox', { name: /Search/i })

    expect(contactsList.childElementCount).toBe(3)

    expect(searchBox).toBeInTheDocument()

    await userEvent.type(searchBox, initialContacts[1].name)

    expect(searchBox).toHaveValue(initialContacts[1].name)

    expect(contactsList.childElementCount).toBe(1)
  })
})
