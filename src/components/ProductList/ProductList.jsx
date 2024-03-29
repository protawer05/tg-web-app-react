import React, { useCallback, useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'
import ProductItemForAdmin from '../ProductItem/ProductItemForAdmin'
import ProductModal from '../ProductModal/ProductModal'
import './ProductList.css'
const getTotalPrice = items => {
	return items.reduce((acc, item) => {
		return (acc += item.price)
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

	const onAdd = product => {
		const alreadyAdded = addedItems.find(item => item._id === product._id)
		let newItems = []
		if (alreadyAdded) {
			newItems = addedItems.filter(item => item._id !== product._id)
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
	const renderProducts = () => {
		if (isAdmin === true) {
			return products.map(item => (
				<ProductItemForAdmin
					product={item}
					onAdd={onAdd}
					key={item._id}
					setProducts={setProducts}
				/>
			))
		} else {
			return products.map(item => (
				<ProductItem
					product={item}
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
