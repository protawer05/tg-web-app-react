import React, { useState } from 'react'
import AddProductModal from '../addProductModal/AddProductModal'
import s from './AddProductButton.module.css'
const AddProductButton = ({ setProducts }) => {
	const [isShowModal, setIsShowModal] = useState(false)
	return (
		<>
			<button
				className={s.add_btn}
				onClick={() => setIsShowModal(!isShowModal)}
			>
				<img
					src='./plus.svg'
					style={{
						height: 20,
						width: 20,
						position: 'absolute',
						marginLeft: -23,
						marginTop: -2,
					}}
				/>
				Добавить новый продукт
			</button>
			{isShowModal && (
				<AddProductModal
					setIsShowModal={setIsShowModal}
					setProducts={setProducts}
				/>
			)}
		</>
	)
}

export default AddProductButton
