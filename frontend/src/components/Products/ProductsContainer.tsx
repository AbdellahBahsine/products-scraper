import { useState } from 'react';
import ProductsPresenter from './ProductsPresenter';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const ProductsContainer = () => {
    const [category, setCategory] = useState('Monitors');
    const [page, setPage] = useState(1);
    const { products, hasMore, loading, handleRefresh } = useFetchProducts(category, page);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        setPage(1);
    };

    const loadMoreProducts = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <ProductsPresenter
            products={products}
            hasMore={hasMore}
            loading={loading}
            onCategoryChange={handleCategoryChange}
            onRefresh={handleRefresh}
            onLoadMore={loadMoreProducts}
        />
    );
};

export default ProductsContainer;
