import React from 'react'
import Button from '../Button/Button'
import './ProductItem.css'

const ProductItem = ({ product, className, onAdd }) => {
	const onAddHandler = () => {
		onAdd(product)
	}
	return (
		<div className={'product' + ' ' + className}>
			<img className='img' src={product.imageUrl ? product.imageUrl : 'https://trial-sport.ru/images/catalog/miv9214_8541_c3h_0_2865452.jpg'} />
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
