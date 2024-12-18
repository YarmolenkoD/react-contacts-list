import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { ContactsPage } from '@pages'

import { persistor, store } from '@store'

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContactsPage />
      </PersistGate>
    </Provider>
  )
}
