import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import our custom CSS
import './styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { SiteContext, SiteContextProvider } from './context/SiteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SiteContextProvider>
            <App />
        </SiteContextProvider>
    </React.StrictMode>
)