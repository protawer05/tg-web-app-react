import axios from 'axios'
import React, { useState } from 'react'
import s from './AddProductModal.module.css'
const AddProductModal = ({ setIsShowModal, setProducts }) => {
	const [newProduct, setNewProduct] = useState({})
	const handleSubmit = async e => {
		e.preventDefault()
		await axios.post('http://localhost:8000/products', newProduct)
		setNewProduct({})
		setIsShowModal(false)
		const { data } = await axios.get('http://localhost:8000/products')
		setProducts(data)
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className={s.form}>
				<button onClick={() => setIsShowModal(false)} className={s.closeButton}>
					x
				</button>
				<div className={s.inputs_wrapper}>
					<div className=''>Название</div>
					<input
						type='text'
						onChange={e =>
							setNewProduct(product => ({
								...product,
								title: e.target.value,
							}))
						}
					/>
					<div className=''>Цена</div>
					<input
						type='text'
						onChange={e =>
							setNewProduct(product => ({
								...product,
								price: e.target.value,
							}))
						}
					/>
					<div className=''>Url картинки</div>
					<input
						type='text'
						onChange={e =>
							setNewProduct(product => ({
								...product,
								imageUrl: e.target.value,
							}))
						}
					/>
				</div>
				<button type='submit'>Добавить</button>
			</form>
		</div>
	)
}

export default AddProductModal
