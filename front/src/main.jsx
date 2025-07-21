import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import App from '../src/App.jsx'
import { UserDataProvider } from "./context/UserDataContext";
import { AuthProvider } from "./context/AuthContext";





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <UserDataProvider>
    <App />
    </UserDataProvider>
    </AuthProvider>
  </StrictMode>,
)
