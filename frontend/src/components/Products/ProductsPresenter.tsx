import { IoRefresh } from "react-icons/io5";

interface Product {
    name: string;
    url: string;
    image: string;
    delivery: string;
    price: string;
}

interface ProductsPresenterProps {
    products: Product[];
    hasMore: boolean;
    loading: boolean;
    onCategoryChange: (category: string) => void;
    onRefresh: () => void;
    onLoadMore: () => void;
}

const ProductsPresenter = ({
    products,
    hasMore,
    loading,
    onCategoryChange,
    onRefresh,
    onLoadMore,
}: ProductsPresenterProps) => (
    <div className="w-full px-12">
        <div className="h-[80px] w-full flex items-center justify-between">
            <nav className="flex gap-6">
                <button className="border px-4 py-2" onClick={() => onCategoryChange('Printers')}>Printers</button>
                <button className="border px-4 py-2" onClick={() => onCategoryChange('Monitors')}>Monitors</button>
            </nav>
            <button className="border px-4 py-2 flex items-center gap-2" onClick={onRefresh}>
                <IoRefresh /> Refresh Products
            </button>
        </div>

        <div className="w-full flex flex-col mb-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
            <>
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div className="w-full border p-4 flex gap-4" key={product.url}>
                            <a href={product.url} target="_blank" rel="noopener noreferrer">
                                <div className="w-[200px]">
                                    <img src={product.image} alt={product.name} />
                                </div>
                            </a>
                            <div>
                                <a href={product.url} target="_blank" rel="noopener noreferrer">
                                    <h2 className="font-bold">{product.name}</h2>
                                </a>
                                <p>Delivery: <span className="font-bold">{product.delivery}</span></p>
                                <p>{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMore && products.length > 0 && (
                    <button className="border px-4 py-2 mt-4 mx-auto" onClick={onLoadMore}>
                        Load More
                    </button>
                )}
            </>
            )}
        </div>
    </div>
);

export default ProductsPresenter;
