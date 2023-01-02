import { createContext, useReducer } from 'react';
import filtersReducer from './filtersReducer';

const filtersContext = createContext();

const initialState = {
    filter: '',
};

const FiltersProvider = ({ children }) => {

    const [state, dispatch] = useReducer(filtersReducer, initialState);

    const filters = () => {
        return dispatch({
            type: 'lkkk'
        });
    };

    const values = {
        ...state,
        filters
    };

    return (
        <filtersContext.Provider value={values}>
            {children}
        </filtersContext.Provider>
    );
};

export default filtersContext;
export { FiltersProvider };