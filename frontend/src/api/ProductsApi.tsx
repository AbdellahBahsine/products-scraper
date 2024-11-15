import axios from 'axios';

export const fetchProducts = async (category: string, page: number) => {
    const response = await axios.get(`http://localhost:8000/api/products/${category}?page=${page}`);
    return response.data;
};

export const refreshProducts = async () => {
    await axios.get('http://localhost:8000/api/scrape');
};
