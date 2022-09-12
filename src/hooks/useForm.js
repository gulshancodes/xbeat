import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';

const useForm = () => {
    const { toggleForm, setFormUserInfo } = useContext(commonContext);
    const [inputValues, setInputValues] = useState({});

    // handling input-values
    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    };

    // handling form-submission
    const handleFormSubmit = (e) => {
        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();

        e.preventDefault();
        setInputValues({});
        setFormUserInfo(loggedUserInfo);
        toggleForm(false);
        alert(`Hello ${loggedUserInfo}, you're successfully logged-in.`);
    };

    return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;