import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import productsData from '../../data/productsData';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
// import { AiOutlineSearch } from 'react-icons/ai';


const SearchBar = () => {

    const { isSearchOpen, toggleSearch, searchResults, setSearchResults } = useContext(commonContext);

    const searchRef = useRef();

    // closing the SearchBar
    const closeSearch = () => {
        toggleSearch(false);
        setSearchResults([]);
    };

    useOutsideClose(searchRef, closeSearch);

    useScrollDisable(isSearchOpen);


    // handling Search
    const handleSearching = (e) => {
        const searchedTerm = e.target.value.toLowerCase().trim();

        const updatedSearchResults = productsData.filter(item => item.title.toLowerCase().includes(searchedTerm));

        searchedTerm === '' ? setSearchResults([]) : setSearchResults(updatedSearchResults);
    };


    return (
        <>
            {
                isSearchOpen && (
                    <div id="searchbar" className="backdrop">
                        <div className="searchbar_content" ref={searchRef}>
                            <div className="search_box">
                                <input
                                    type="search"
                                    className="input_field"
                                    placeholder="Search for product..."
                                    onChange={handleSearching}
                                />
                                {/* <button
                                    type="button"
                                    className="btn"
                                    disabled={searchResults.length === 0}
                                >
                                    <AiOutlineSearch />
                                </button> */}
                            </div>

                            {
                                searchResults.length !== 0 && (
                                    <div className="search_results">
                                        {
                                            searchResults.map(item => {
                                                const { id, title, path } = item;
                                                return (
                                                    <Link
                                                        to={`${path}${id}`}
                                                        onClick={closeSearch}
                                                        key={id}
                                                    >
                                                        {title}
                                                    </Link>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SearchBar;