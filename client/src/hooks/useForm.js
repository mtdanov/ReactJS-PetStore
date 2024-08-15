import { useEffect, useState } from "react";

export default function useForm(initialState, submitHandler) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        setData(initialState)
    }, [initialState])


    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value


        if (event.target.type === 'file') {
            const file = event.target.files[0];
            setData((data) => ({ ...data, [name]: file }));
        } else {
            setData((data) => ({ ...data, [name]: value }));
        }
    };

    const createFormData = () => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    };


    const onSubmit = (e) => {
        e.preventDefault();

        if (!data.file) {
            submitHandler(data);
            setData(initialState)

        }
        else {
            const formData = createFormData();
            submitHandler(formData);
            setData(initialState)
        }
    };


    return { data, onChange, onSubmit };
};
