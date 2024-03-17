import React, { useState } from 'react'
import ProductList from '../ProductList/ProductList'
const CatalogPage = () => {
	const [products, setProducts] = useState([])
	return (
		<div>
			<h1 style={{ marginBottom: 15 }}>Каталог</h1>
			<ProductList products={products} setProducts={setProducts} />
		</div>
	)
}

export default CatalogPage
