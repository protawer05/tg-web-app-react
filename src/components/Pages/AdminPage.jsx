import React from 'react'
import ProductList from '../ProductList/ProductList'
import AddProductButton from '../addProductButton/AddProductButton'

const AdminPage = () => {
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
			<ProductList isAdmin={true} />
		</div>
	)
}

export default AdminPage
