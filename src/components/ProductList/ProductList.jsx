import React, { useCallback, useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'
import ProductItemForAdmin from '../ProductItem/ProductItemForAdmin'
import ProductModal from '../ProductModal/ProductModal'
import './ProductList.css'
const getTotalPrice = items => {
	return items.reduce((acc, item) => {
		return (acc += item.price * item.counter)
	}, 0)
}

const ProductList = ({ isAdmin, products, setProducts }) => {
	const { getProducts, postWebData } = useAxios()
	const [addedItems, setAddedItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [showProductModal, setShowProductModal] = useState(false)
	const { tg, queryId } = useTelegram()
	useEffect(async () => {
		const data = await getProducts()
		setProducts(data)
		setIsLoading(false)
	}, [])

	const onSendData = useCallback(async () => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		}
		// axios.post('https://fly-deciding-ray.ngrok-free.app/web-data', data)
		await postWebData(data)
	}, [addedItems])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)
		return () => {
			tg.offEvent('mainButtonClicked', onSendData)
		}
	}, [onSendData])
	const onRemoveProduct = productId => {
		const newItems = addedItems
			.map(obj => {
				if (obj._id === productId) {
					obj.counter -= 1
				}
				if (obj.counter !== 0) {
					return obj
				}
			})
			.filter(notUndefined => notUndefined !== undefined)
		console.log(newItems, addedItems)
		setAddedItems(newItems)
		if (newItems.length === 0) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}₽`,
			})
		}
	}
	const onAdd = product => {
		const alreadyAdded = addedItems.find(item => item._id === product._id)
		let newItems = []
		if (alreadyAdded) {
			newItems = addedItems.map(obj => {
				if (obj._id === product._id) {
					obj.counter += 1
				}
				return obj
			})
		} else {
			product.counter = 1
			newItems = [...addedItems, product]
		}

		setAddedItems(newItems)
		if (newItems.length === 0) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}₽`,
			})
		}
	}
	const renderProducts = () => {
		if (isAdmin === true) {
			return products.map(item => (
				<ProductItemForAdmin
					product={item}
					onAdd={onAdd}
					key={item._id}
					setProducts={setProducts}
					setShowProductModal={setShowProductModal}
					onRemoveProduct={onRemoveProduct}
				/>
			))
		} else {
			return products.map(item => (
				<ProductItem
					product={item}
					onRemoveProduct={onRemoveProduct}
					onAdd={onAdd}
					key={item._id}
					setShowProductModal={setShowProductModal}
				/>
			))
		}
	}
	return (
		<>
			<div className='list'>{!isLoading ? renderProducts() : null}</div>
			{showProductModal && (
				<ProductModal
					product={showProductModal}
					setShowProductModal={setShowProductModal}
				/>
			)}
		</>
	)
}

export default ProductList
