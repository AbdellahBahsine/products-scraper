import { useEffect, useState } from "react";

import axios from 'axios';

import { IoRefresh } from "react-icons/io5";

interface Product {
    name: string;
    url: string;
    image: string;
    delivery: string;
    price: String;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState('Monitors');
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (page === 1)
                    setLoading(true);

                const response = await axios.get(`http://localhost:8000/api/products/${category}?page=${page}`);

                const { products: newProducts, hasMore: more } = response.data;

                setHasMore(more);

                if (page === 1)
                    setProducts(newProducts);
                else
                    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        }

        fetchProducts();
    }, [page, category]);

    const handleRefreshProducts = async () => {
        try {
            setLoading(true);

            await axios.get('http://localhost:8000/api/scrape');

            setPage(1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleLoadMore = async () => {
        setPage(prevPage => prevPage + 1);
    }

    const handleCategory = (name: string) => {
        setCategory(name);
        setPage(1);
    }

    return (
        <div className="w-full px-12">
            <div className="h-[80px] w-full flex items-center justify-between">
                <nav className="flex gap-6">
                    <button className="border px-4 py-2" onClick={() => handleCategory('Printers')}>Printers</button>
                    <button className="border px-4 py-2" onClick={() => handleCategory('Monitors')}>Monitors</button>
                </nav>

                {
                    <button className="border px-4 py-2 flex items-center gap-2" onClick={handleRefreshProducts}><IoRefresh /> refresh products</button>
                }
            </div>

            <div className="w-full flex flex-col mb-4">
                {
                    loading ? <p>Loading...</p> :
                        <>
                            <div className="flex flex-col gap-4">
                                {
                                    products.map(product => {
                                        return (
                                            <div className="w-full border p-4 flex gap-4">
                                                <a href={product.url} target="_blank">
                                                    <div className="w-[200px]">
                                                        <img src={product.image} />
                                                    </div>
                                                </a>

                                                <div>
                                                    <a href={product.url} target="_blank"><h2 className="font-bold">{product.name}</h2></a>
                                                    <p>delivery <span className="font-bold">{product.delivery}</span></p>
                                                    <p>{product.price}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {
                                hasMore && <button className="border px-4 py-2 mt-4 mx-auto" onClick={handleLoadMore}>Load More</button>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Products;