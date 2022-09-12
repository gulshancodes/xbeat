import React, { useState } from 'react';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import productsData from '../data/productsData';
import FilterBar from '../components/common/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';


const AllProducts = () => {

    useDocTitle('All Products');
    const { active, handleActive, activeClass } = useActive(null);
    const [products, setProducts] = useState(productsData);


    // handling Sort-menu
    const handleSorting = (itemValue) => {
        let updatedProducts = null;

        switch (itemValue) {
            case 'Latest':
                updatedProducts = productsData.slice(0, 6).map(item => item);
                break;

            case 'Featured':
                updatedProducts = productsData.filter(item => item.tag === 'featured-product');
                break;

            case 'Top Rated':
                updatedProducts = productsData.filter(item => item.rateCount > 4);
                break;

            case 'Price(Lowest First)':
                updatedProducts = [...productsData].sort((a, b) => a.finalPrice - b.finalPrice);
                break;

            case 'Price(Highest First)':
                updatedProducts = [...productsData].sort((a, b) => b.finalPrice - a.finalPrice);
                break;

            default:
                throw new Error('Wrong Option Selected');
        }

        setProducts(updatedProducts);
        handleActive(itemValue);
    };

    // handling Filter-menu
    const handleFiltering = (e) => {
        const { checked, value } = e.target;

        let updatedProducts = null;

        if (checked) {
            updatedProducts = productsData.filter(item => item.brand.toLowerCase() === value.toLowerCase());
            console.log(updatedProducts);
        } else {
            updatedProducts = productsData.filter(item => item.brand !== value);
        }

        setProducts(updatedProducts);

    };

    // handling Clear-filters
    const handleClearFilters = () => {
        setProducts(productsData);
        handleActive(null);
    };


    return (
        <>
            <section id="all_products" className="section">
                <FilterBar
                    active={active}
                    activeClass={activeClass}
                    handleSorting={handleSorting}
                    handleFiltering={handleFiltering}
                    handleClearFilters={handleClearFilters}
                />

                <div className="container">
                    <div className="wrapper products_wrapper">
                        {
                            products.map(item => (
                                <ProductCard
                                    key={item.id}
                                    {...item}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            <Services />
        </>
    );
};

export default AllProducts;