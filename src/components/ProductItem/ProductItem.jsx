import React from 'react'
import s from './ProductItem.module.css'

const ProductItem = ({
	product,
	className,
	onAdd,
	setShowProductModal,
	onRemoveProduct,
}) => {
	const onAddHandler = () => {
		onAdd(product)
	}
	return (
		<div className={s.product + ' ' + className}>
			<img
				className={s.img}
				src={product.imageUrl}
				onClick={() => setShowProductModal(product)}
			/>
			<div className={s.product_info}>
				<div className={s.product_title}>{product.title}</div>
				<h4 className={s.price}>{product.price} ₽</h4>
			</div>
			{product.counter >= 1 ? (
				<div className={s.btn_wrapper}>
					<button className={s.add_btn_mini} onClick={onAddHandler}>
						<img
							src='./add-button.png'
							alt='add button'
							height={27}
							width={27}
						/>
					</button>
					<button
						className={s.add_btn_mini}
						onClick={() => onRemoveProduct(product._id)}
					>
						<img
							src='./remove-button.png'
							alt='remove button'
							height={27}
							width={27}
						/>
					</button>
					Количество: {product.counter}
				</div>
			) : (
				<button className={s.add_btn} onClick={onAddHandler}>
					<img src='./plus.svg' height={19} width={19} />
					<div style={{ marginLeft: 2 }}>Добавить</div>
				</button>
			)}
		</div>
	)
}

export default ProductItem
