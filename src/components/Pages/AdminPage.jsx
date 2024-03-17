import React, { useState } from 'react'
import ProductList from '../ProductList/ProductList'
import AddProductButton from '../addProductButton/AddProductButton'
const AdminPage = () => {
	const [products, setProducts] = useState([])
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<AddProductButton />
			<ProductList
				isAdmin={true}
				products={products}
				setProducts={setProducts}
			/>
		</div>
	)
}

export default AdminPage
