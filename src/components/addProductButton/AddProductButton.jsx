import React from 'react'
import s from './AddProductButton.module.css'
const AddProductButton = () => {
	return (
		<button className={s.add_btn}>
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
	)
}

export default AddProductButton
