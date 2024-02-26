import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
const products = [
	{
		id: '1',
		title: 'Штаны',
		price: 5000,
		description: 'Синего цвета, прямые',
		imageUrl:
			'https://trial-sport.ru/images/catalog/miv9214_8541_c3h_0_2865452.jpg',
	},
	{
		id: '2',
		title: 'Трико',
		price: 50000,
		description: 'Синего цвета, прямые',
	},
	{
		id: '3',
		title: 'Кроссовки',
		price: 50000,
		description: 'Синего цвета, прямые',
	},
	{
		id: '4',
		title: 'Джинсы4',
		price: 500000,
		description: 'Синего цвета(нет), прямые',
	},
	{
		id: '5',
		title: 'Джинсы5',
		price: 5000000,
		description: 'Синего цвета, прямые',
	},
]

const getTotalPrice = items => {
	return items.reduce((acc, item) => {
		return (acc += item.price)
	}, 0)
}

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([])
	const { tg, queryId } = useTelegram()

	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		}
		axios.post(
			'https://fly-deciding-ray.ngrok-free.app/web-data',
			JSON.stringify(data)
		)
		// axios.post('http://localhost:8000/web-data', JSON.stringify(data))
		// fetch('http://localhost:8000/web-data', {
		// fetch('fly-deciding-ray.ngrok-free.app/web-data', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// })
	}, [addedItems])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)
		return () => {
			tg.offEvent('mainButtonClicked', onSendData)
		}
	}, [onSendData])

	const onAdd = product => {
		const alreadyAdded = addedItems.find(item => item.id === product.id)
		let newItems = []
		if (alreadyAdded) {
			newItems = addedItems.filter(item => item.id !== product.id)
		} else {
			newItems = [...addedItems, product]
		}
		setAddedItems(newItems)
		if (newItems.length === 0) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}$`,
			})
		}
	}
	return (
		<div className='list'>
			{products.map(item => (
				<ProductItem product={item} onAdd={onAdd} className={'item'} />
			))}
		</div>
	)
}

export default ProductList
