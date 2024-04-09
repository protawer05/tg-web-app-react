import axios from 'axios'
const URL = 'https://fly-deciding-ray.ngrok-free.app' // url backend
// const URL = 'http://localhost:8000'
export default function useAxios() {
	const instance = axios.create({
		baseURL: URL,
		headers: {
			'Content-Type': 'application/json',
			'ngrok-skip-browser-warning': 'true',
		},
	})
	const getProducts = async () => {
		const { data } = await instance.get(`/products`)
		return data
	}
	const postProduct = async product => {
		await instance.post(`/products`, product)
	}
	const deleteProduct = async productId => {
		await instance.delete(`/products/${productId}`)
	}
	const postWebData = async data => {
		await instance.post(`/web-data`, data)
	}
	return { getProducts, postProduct, deleteProduct, postWebData }
}
