const filtersReducer = (state, action) => {
    switch (action.type) {

        case 'LOAD_ALL_PRODUCTS':

            const { products, minPrice, maxPrice } = action.payload;

            return {
                ...state,
                allProducts: products,
                selectedPrice: {
                    ...state.selectedPrice,
                    price: maxPrice,
                    minPrice: minPrice,
                    maxPrice,
                }
            };


        case 'SET_SORTED_VALUE':
            return {
                ...state,
                sortedValue: action.payload.sortValue
            };


        case 'CHECK_BRANDS_MENU':
            return {
                ...state,
                updatedBrandsMenu: state.updatedBrandsMenu.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            checked: !item.checked
                        };
                    } else {
                        return item;
                    }
                })
            };


        case 'CHECK_CATEGORY_MENU':
            return {
                ...state,
                updatedCategoryMenu: state.updatedCategoryMenu.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            checked: !item.checked
                        };
                    } else {
                        return item;
                    }
                })
            };


        case 'HANDLE_PRICE':
            return {
                ...state,
                selectedPrice: {
                    ...state.selectedPrice,
                    price: action.payload.value
                }
            };


        case 'FILTERED_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload.updatedProducts,
            };


        case 'MOB_SORT_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobSortVisible: action.payload.toggle
                }
            };


        case 'MOB_FILTER_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobFilterVisible: action.payload.toggle
                }
            };


        case 'CLEAR_FILTERS':
            return {
                ...state,
                sortedValue: null,
            };


        default:
            return state;
    }
};

export default filtersReducer;