
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Dashboard from './components/task/Dashboard'
import AuthRouter from './components/router/AuthRouter'
import PageNotFound from './components/router/PageNotFound'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/task' element={<AuthRouter><Dashboard /></AuthRouter>} />
					<Route path='/*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
