import React from 'react'
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram'
import { useState, useEffect } from 'react'
const Form = () => {
	const [country, setCountry] = useState('')
	const [street, setStreet] = useState('')
	const [subject, setSubject] = useState('physical')
	const { tg } = useTelegram()

	const onSendData = useCallback(() => {
		const data = {
			country,
			street,
			subject,
		}
		tg.sendData(JSON.stringify(data))
	}, [])

	useEffect(() => {
		tg.WebApp.onEvent('mainButtonClicked', onSendData)
		return () => {
			tg.WebApp.offEvent('mainButtonClicked', onSendData)
		}
	}, [])
	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Отправить данные',
		})
	}, [])
	useEffect(() => {
		if (!street || !country) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
		}
	}, [country, street])
	const onChangeCountry = e => {
		setCountry(e.target.value)
	}

	const onChangeStreet = e => {
		setStreet(e.target.value)
	}

	const onChangeSubject = e => {
		setSubject(e.target.value)
	}
	return (
		<div className='form'>
			<h3>Введите ваши данные</h3>
			<input type='text' placeholder='Страна' className='input' value={country} onChange={onChangeCountry} />
			<input type='text' placeholder='Улица' className='input' value={street} onChange={onChangeStreet} />
			<select className='select' value={subject} onChange={onChangeSubject}>
				<option value='physical'>Физ. лицо</option>
				<option value='legal'>Юр. лицо</option>
			</select>
		</div>
	)
}

export default Form