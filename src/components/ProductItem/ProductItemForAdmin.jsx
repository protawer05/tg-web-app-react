import React from 'react'
import useAxios from '../../hooks/useAxios'
import s from './ProductItemForAdmin.module.css'
const ProductItemForAdmin = ({ product, onAdd, setProducts }) => {
	const { deleteProduct } = useAxios()
	const onAddHandler = () => {
		onAdd(product)
	}
	const onClickRemoveButton = async id => {
		await deleteProduct(id).then(() => alert('Вы удалил продукт'))
		setProducts(products => products.filter(product => product._id !== id))
	}
	return (
		<div className={s.product}>
			<button
				className={s.remove_button}
				onClick={() => onClickRemoveButton(product._id)}
			>
				<img src='./krest.svg' alt='remove' style={{ width: 20, height: 20 }} />
			</button>
			<img className={s.img} src={product.imageUrl} />
			<div className={s.product_info}>
				<h4 className={s.price}>{product.price} ₽</h4>
				<div className={s.product_title}>{product.title}</div>
			</div>

			<button className={s.add_btn} onClick={onAddHandler}>
				<img src='./plus.svg' height={19} width={19} />
				<div style={{ marginLeft: 2 }}>Добавить</div>
			</button>
		</div>
	)
}

export default ProductItemForAdmin
