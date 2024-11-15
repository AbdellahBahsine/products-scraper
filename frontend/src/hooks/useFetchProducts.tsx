import { useState, useEffect } from 'react';
import { fetchProducts, refreshProducts } from '../api/ProductsApi';

interface Product {
    name: string;
    url: string;
    image: string;
    delivery: string;
    price: string;
}

export const useFetchProducts = (category: string, page: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const { products: newProducts, hasMore: more } = await fetchProducts(category, page);
            setHasMore(more);
            setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
        } catch (err) {
            console.error('Failed to load products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [category, page]);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            await refreshProducts();
            setProducts([]);
            loadProducts();
        } catch (err) {
            console.error('Failed to refresh products:', err);
        } finally {
            setLoading(false);
        }
    };

    return { products, hasMore, loading, handleRefresh };
};
