

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { GlobalProvider } from './providers/GlobalProvider.jsx'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_START_POINT}${import.meta.env.VITE_API_VERSION}`
axios.defaults.withCredentials = true;
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './providers/AuthProvider.jsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </GlobalProvider>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
)
