import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import store from './config/store';
import {Provider} from "react-redux"

import AppLayout from './AppLayout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>

      <AppLayout />

    </Provider>
  </StrictMode>,
)
