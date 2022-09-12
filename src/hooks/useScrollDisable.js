import { useEffect } from 'react';

const useScrollDisable = (elem) => {

    useEffect(() => {
        elem ? document.body.classList.add('overflow_hide') : document.body.classList.remove('overflow_hide');

    }, [elem]);

};

export default useScrollDisable;