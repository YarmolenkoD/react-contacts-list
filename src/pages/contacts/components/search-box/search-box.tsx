import { ChangeEvent } from 'react'

import { TextField, InputAdornment } from '@mui/material'

import { Search, Clear } from '@mui/icons-material'

import { updateSearch, useAppDispatch, useAppSelector } from '@store'

export const SearchBox = () => {
  const dispatch = useAppDispatch()

  const search = useAppSelector(state => state.contacts.search)

  const onChange = (event: ChangeEvent<any>) => {
    dispatch(updateSearch(event.target.value))
  }

  const clear = () => dispatch(updateSearch(''))

  return (
    <TextField
      role="textbox"
      value={search}
      onChange={onChange}
      fullWidth
      label="Search"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={clear}
              sx={{
                display: search.length ? 'flex' : 'none',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Clear />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
