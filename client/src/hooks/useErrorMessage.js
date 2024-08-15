import { useState } from "react";

export default function useError() {
    const [errorMsg, setErrorMsg] = useState('');

    const showError = (message) => {
        setErrorMsg(message);

        setTimeout(() => {
            setErrorMsg('');
        }, 3000);  // Clear the error message after 3 seconds
    };

    return { errorMsg, showError };
};