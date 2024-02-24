import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import './Header.css'
const Header = () => {
	const { onClose } = useTelegram()
	return (
		<div className='header'>
			<button onClick={onClose} className='button__close-app'>
				Отмена
			</button>
			<h3 className='main-title'>Nikita shop</h3>
		</div>
	)
}

export default Header
