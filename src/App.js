import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AdminPage from './components/Pages/AdminPage'
import CatalogPage from './components/Pages/CatalogPage'
import { useTelegram } from './hooks/useTelegram'

function App() {
	const { tg } = useTelegram()
	useEffect(() => {
		tg.ready()
	}, [])

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route index element={<CatalogPage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</div>
	)
}

export default App
