import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import './ProductList.css'

const getTotalPrice = items => {
	return items.reduce((acc, item) => {
		return (acc += item.price)
	}, 0)
}

const ProductList = () => {
	const [products, setProducts] = useState([])
	const [addedItems, setAddedItems] = useState([])
	const { tg, queryId } = useTelegram()
	useEffect(async () => {
		const { data } = await axios.get('http://localhost:8000/products')
		setProducts(data)
	}, [])

	const onSendData = useCallback(async () => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		}
		// axios.post('https://fly-deciding-ray.ngrok-free.app/web-data', data)
		await axios.post('http://localhost:8000/web-data', data)
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
			{/* {products.map(item => (
				<ProductItem product={item} onAdd={onAdd} className={'item'} />
			))} */}
		</div>
	)
}

export default ProductList
