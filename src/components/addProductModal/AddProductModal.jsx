import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import s from './AddProductModal.module.css'
const AddProductModal = ({ setIsShowModal, setProducts }) => {
	const { postProduct, getProducts } = useAxios()
	const [newProduct, setNewProduct] = useState({})
	useEffect(() => {
		document.addEventListener('keypress', listener)
		return () => {
			document.removeEventListener('keypress', listener)
		}
	}, [newProduct])
	const listener = async e => {
		if (e.key === 'Enter') {
			setIsShowModal(false)
			console.log(newProduct)
			await postProduct(newProduct)
			setNewProduct({})
			const data = await getProducts()
			setProducts(data)
		}
	}
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
						type='number'
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
						type='url'
						pattern='https://.*'
						onChange={e =>
							setNewProduct(product => ({
								...product,
								imageUrl:
									e.target.value === ''
										? 'https://trial-sport.ru/images/catalog/miv9214_8541_c3h_0_2865452.jpg'
										: e.target.value,
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
