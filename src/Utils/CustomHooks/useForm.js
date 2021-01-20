import { useState } from 'react';

const validEmail = /^[\w./]+@[\w./]+\.[\w./]+$/;

const useForm = (initialState = {}, initialOnErrorState = {}) => {
	// form input values
	const [inputValues, setInputValues] = useState(initialState);

	// error states if any
	const [errorState, setErrorState] = useState(initialOnErrorState);

	const onChange = (e) => {
		const { name, value } = e.target;

		// Email validations
		if (name === 'email') {
			if (value.length > 0) {
				if (!validEmail.test(value)) {
					setErrorState((prevErrorState) => ({
						...prevErrorState,
						email: 'In valid email',
					}));
				} else {
					setErrorState((prevErrorState) => ({
						...prevErrorState,
						email: '',
					}));
				}
			} else {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					email: 'Email is required',
				}));
			}
		}
		// phone validations
		if (name === 'phone') {
			if (value.length !== 9) {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					phone: 'In valid phone',
				}));
			} else {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					phone: '',
				}));
			}
		}
		// address validation
		if (name === 'address') {
			if (value.length === 0) {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					address: 'Address is required',
				}));
			} else {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					address: '',
				}));
			}
		}
		// name validations
		if (name === 'name') {
			if (value.length === 0) {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					name: 'Name is required',
				}));
			} else if (value.length < 4) {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					name: 'Name must be more than 3 characters',
				}));
			} else {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					name: '',
				}));
			}
		}

		setInputValues({
			...inputValues,
			[name]: value,
		});
	};

	return {
		onChange,
		errorState,
		inputValues,
	};
};

export default useForm;
