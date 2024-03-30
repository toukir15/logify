

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
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </GlobalProvider>
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
)
