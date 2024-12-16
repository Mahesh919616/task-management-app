import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'
import { store } from './components/store/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>

)
