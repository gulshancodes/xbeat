import React, { useEffect, useState } from 'react';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import productsData from '../data/productsData';
import FilterBar from '../components/common/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import { filterMenu } from '../data/filterBarData';


const AllProducts = () => {

    useDocTitle('All Products');
    const { active, handleActive, activeClass } = useActive(null);
    const [products, setProducts] = useState(productsData);
    const [sortedValue, setSortedValue] = useState(null);
    const [updatedFilterMenu, setUpdatedFilterMenu] = useState(filterMenu);


    // handling Sort-menu Selected Item
    const handleSorting = (sortValue) => {
        sortValue ? setSortedValue(sortValue) || handleActive(sortValue) : setSortedValue(null) || handleActive(null);
    };

    // handling Filter-menu Checked Item
    const handleFiltering = (id) => {

        const toggleChecked = updatedFilterMenu.map(item => {
            return {
                ...item,
                menu: item.menu.map(itm => {
                    if (itm.id === id) {
                        return {
                            ...itm,
                            checked: !itm.checked
                        };
                    } else {
                        return itm;
                    }
                })
            };
        });

        setUpdatedFilterMenu(toggleChecked);

    };


    // function for applying Filters
    const applyFilters = () => {
        let updatedProducts = productsData;

        // Sorting
        if (sortedValue) {
            switch (sortedValue) {
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
        }

        // Filtering
        const checkedItems = updatedFilterMenu.map(item => {
            return {
                ...item,
                menu: item.menu.filter(item => {
                    return item.checked;
                }).map(item => item.label.toLowerCase())
            };
        }).flatMap(item => item.menu);


        if (checkedItems.length) {
            updatedProducts = updatedProducts.filter(item => checkedItems.includes(item.brand.toLowerCase()) || checkedItems.includes(item.category.toLowerCase()));

        }

        setProducts(updatedProducts);
    };

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedValue, updatedFilterMenu]);



    // handling Clear-filters
    const handleClearFilters = () => {
        setUpdatedFilterMenu(filterMenu);
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
                    updatedFilterMenu={updatedFilterMenu}
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