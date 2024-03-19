import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios'
import s from './AddProductModal.module.css'
const AddProductModal = ({ setIsShowModal, setProducts }) => {
	const { postProduct, getProducts } = useAxios()
	const [newProduct, setNewProduct] = useState({})
	const handleSubmit = async e => {
		e.preventDefault()
		setIsShowModal(false)
		await postProduct(newProduct)
		setNewProduct({})
		const data = await getProducts()
		setProducts(data)
	}
	return (
		<div className={s.form_wrapper}>
			<form onSubmit={handleSubmit} className={s.form}>
				<button onClick={() => setIsShowModal(false)} className={s.closeButton}>
					x
				</button>
				<div className={s.inputs_wrapper}>
					<div className=''>Название</div>
					<input
						placeholder='Джинсы'
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
						placeholder='5399'
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
						placeholder='https://...'
						type='text'
						onChange={e =>
							setNewProduct(product => ({
								...product,
								imageUrl: e.target.value,
							}))
						}
					/>
				</div>
				<button type='submit' className={s.addProduct_button}>
					Добавить
				</button>
			</form>
		</div>
	)
}

export default AddProductModal
