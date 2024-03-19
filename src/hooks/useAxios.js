import axios from 'axios'
const URL = 'https://fly-deciding-ray.ngrok-free.app' // url backend
export default function useAxios() {
	const getProducts = async () => {
		const { data } = await axios.get(`${URL}/products`)
		return data
	}
	const postProduct = async product => {
		await axios.post(`${URL}/products`, product)
	}
	const deleteProduct = async productId => {
		await axios.delete(`${URL}/products/${productId}`)
	}
	const postWebData = async data => {
		await axios.post(`${URL}/web-data`, data)
	}
	return { getProducts, postProduct, deleteProduct, postWebData }
}
