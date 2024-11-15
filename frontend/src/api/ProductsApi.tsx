import axios from 'axios';

const api_url: string = import.meta.env.VITE_API_URL as string;

export const fetchProducts = async (category: string, page: number) => {

    const response = await axios.get(`${api_url}/api/products/${category}?page=${page}`);
    return response.data;
};

export const refreshProducts = async () => {
    await axios.get(`${api_url}/api/scrape`);
};
