import { useEffect } from 'react';

const useOutsideClose = (ref, handler) => {

    useEffect(() => {
        const outsideClose = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        window.addEventListener('mousedown', outsideClose);

        return () => {
            window.removeEventListener('mousedown', outsideClose);
        };
    }, [ref, handler]);

};

export default useOutsideClose;