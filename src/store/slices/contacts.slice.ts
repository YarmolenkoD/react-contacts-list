import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Contact {
  id: string
  name: string
  city: string
}

export interface ContactsInitialState {
  data: Contact[]
  search: string
  editContactId: string | null
}

const initialState: ContactsInitialState = {
  data: [],
  search: '',
  editContactId: null,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      state.data = [
        {
          ...action.payload,
          id: new Date().toISOString(),
        },
        ...state.data,
      ]
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(contact => contact.id !== action.payload)
      return state
    },
    editContact: (
      state,
      action: PayloadAction<{ id: string; data: Omit<Contact, 'id'> }>,
    ) => {
      const index = state.data.findIndex(
        contact => contact.id === action.payload.id,
      )
      state.data[index] = { id: action.payload.id, ...action.payload.data }
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    updateEditing: (state, action: PayloadAction<string | null>) => {
      state.editContactId = action.payload
    },
  },
})

export const {
  addContact,
  removeContact,
  editContact,
  updateSearch,
  updateEditing,
} = contactsSlice.actions

export const contactsReducer = contactsSlice.reducer
