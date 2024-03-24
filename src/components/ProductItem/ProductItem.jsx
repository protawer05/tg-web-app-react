import React from 'react'
import './ProductItem.css'

const ProductItem = ({ product, className, onAdd, setShowProductModal }) => {
	const onAddHandler = () => {
		onAdd(product)
	}
	return (
		<div className={'product' + ' ' + className}>
			<img
				className='img'
				src={product.imageUrl}
				onClick={() => setShowProductModal(product)}
			/>
			<div className='product-info'>
				<h4 className='price'>{product.price} ₽</h4>
				<div className='product-title'>{product.title}</div>
			</div>

			<button className={'add-btn'} onClick={onAddHandler}>
				<img src='./plus.svg' height={19} width={19} />
				<div style={{ marginLeft: 2 }}>Добавить</div>
			</button>
		</div>
	)
}

export default ProductItem
