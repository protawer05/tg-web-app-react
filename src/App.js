import './App.css'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import CatalogPage from './components/Pages/CatalogPage'

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
			</Routes>
		</div>
	)
}

export default App
