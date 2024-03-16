import React, { useState } from 'react'
import s from './AddProductModal.module.css'
const AddProductModal = ({ setIsShowModal }) => {
	const [newProduct, setNewProduct] = useState({})
	const handleSubmit = e => {
		console.log(newProduct)
		e.preventDefault()
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
						onChange={e => setNewProduct({ title: e.target.value })}
					/>
					<div className=''>Цена</div>
					<input
						type='text'
						onChange={e => setNewProduct({ price: e.target.value })}
					/>
					<div className=''>Url картинки</div>
					<input
						type='text'
						onChange={e => setNewProduct({ imageUrl: e.target.value })}
					/>
				</div>
				<button type='submit'>Добавить</button>
			</form>
		</div>
	)
}

export default AddProductModal
