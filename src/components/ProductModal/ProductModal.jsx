import React, { useEffect, useRef } from 'react'
import s from './ProductModal.module.css'
const ProductModal = ({ product, setShowProductModal }) => {
	const modalElement = useRef()
	useEffect(() => {
		const handleClick = e => {
			if (modalElement.current == e.target) {
				setShowProductModal(false)
			}
			if (!modalElement.current) {
				return
			}
		}
		document.addEventListener('click', handleClick, true)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<div className={s.modal} ref={modalElement}>
			<div className={s.wrapper}>
				<div
					className={s.close_button}
					onClick={() => setShowProductModal(false)}
				>
					x
				</div>
				<div className={s.img_wrapper}>
					<img src={product.imageUrl} alt='productPhoto' className={s.img} />
				</div>
				<div className={s.title}>{product.title}</div>
				<div className={s.price}>{product.price}p</div>
				<div className={s.description}>{product.description}</div>
			</div>
		</div>
	)
}

export default ProductModal
