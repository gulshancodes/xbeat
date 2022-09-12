import React, { useState } from 'react';
import { BiSort, BiFilterAlt } from 'react-icons/bi';
import { filterMenu, sortMenu } from '../../data/filterBarData';


const FilterBar = (props) => {

    // Filterbar-Mobile State
    const [filterbarMob, setFilterbarMob] = useState({
        isSortVisible: false,
        isFilterVisible: false
    });

    // handling mobile Sort-Menu visibility
    const handleSortVisibility = (toggle) => {
        setFilterbarMob({
            ...filterbarMob,
            isSortVisible: toggle
        });
    };

    // handling mobile Filter-Menu visibility
    const handleFilterVisibility = (toggle) => {
        setFilterbarMob({
            ...filterbarMob,
            isFilterVisible: toggle
        });
    };


    return (
        <>
            {/*===== Filterbar-default =====*/}
            <aside id="filterbar">
                <div className="filterbar_wrapper">
                    <FilterBarOptions {...props} />
                </div>
            </aside>

            {/*===== Filterbar-mobile =====*/}
            <div id="filterbar_mob">
                <div className="filterbar_mob_wrapper">
                    <h3
                        className="title"
                        onClick={() => handleSortVisibility(true)}
                    >
                        <BiSort />
                        <span>Sort</span>
                    </h3>
                    <span>|</span>
                    <h3
                        className="title"
                        onClick={() => handleFilterVisibility(true)}
                    >
                        <BiFilterAlt />
                        <span>Filter</span>
                    </h3>
                </div>
                <FilterBarOptions
                    {...props}
                    isSortVisible={filterbarMob.isSortVisible}
                    isFilterVisible={filterbarMob.isFilterVisible}
                    handleSortVisibility={handleSortVisibility}
                    handleFilterVisibility={handleFilterVisibility}
                />
            </div>
        </>
    );
};

export default FilterBar;



/*------- "FilterBarOptions Component" -------*/
const FilterBarOptions = (props) => {

    const { isSortVisible, isFilterVisible, handleSortVisibility, handleFilterVisibility, handleSorting, handleFiltering, handleClearFilters, active, activeClass } = props;


    return (
        <>
            {/*===== Clear-Filters btn =====*/}
            {
                (active) && (
                    <div className="clear_filter_btn">
                        <button
                            type="button"
                            className="btn"
                            onClick={handleClearFilters}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )
            }

            {/*===== Sorting =====*/}
            <div className={`sort_options ${isSortVisible ? 'show' : ''}`}>
                <div className="sort_head">
                    <h3 className="title">Sort By</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleSortVisibility(false)}
                    >
                        &times;
                    </button>
                </div>
                <div className="separator"></div>
                <ul className="sort_menu">
                    {
                        sortMenu.map((item, i) => (
                            <li
                                key={i}
                                className={activeClass(item)}
                                onClick={() => handleSorting(item)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/*===== Filtering =====*/}
            <div className={`filter_options ${isFilterVisible ? 'show' : ''}`}>
                <div className="filter_head">
                    <h3 className="title">Filter By</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleFilterVisibility(false)}
                    >
                        &times;
                    </button>
                </div>
                <div className="separator"></div>
                {
                    filterMenu.map(item => {
                        const { id, title, menu } = item;
                        return (
                            <div className="filter_block" key={id}>
                                <h4>{title}</h4>
                                <ul className="filter_menu">
                                    {
                                        menu.map((item, i) => (
                                            <li key={i} className="filter_btn">
                                                <input
                                                    type="checkbox"
                                                    id={item}
                                                    value={item}
                                                    onChange={handleFiltering}
                                                />
                                                <label htmlFor={item}>{item}</label>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};