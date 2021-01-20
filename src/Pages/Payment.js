import React from 'react';

import { useForm } from 'Utils';

const Payment = () => {
	const initialState = { name: '', address: '', phone: '', email: '' };
	const initialOnErrorState = {
		name: '',
		address: '',
		phone: '',
		email: '',
	};

	const { onChange, errorState, inputValues } = useForm(
		initialState,
		initialOnErrorState,
	);
	const { name, address, phone, email } = inputValues;
	const {
		name: nameError,
		address: addressError,
		phone: phoneError,
		email: emailError,
	} = errorState;

	const disabledPaymentBtn =
		nameError ||
		addressError ||
		phoneError ||
		emailError ||
		!email ||
		!address ||
		!name;

	return (
		<main className="payment-wrapper">
			<section className="payment-sub-wrapper">
				<h3 className="complete-booking-text">Complete Booking Here !</h3>
				<form
					className="payment-form"
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="input-wrapper">
						<label className="inputLabels" htmlFor="name">
							Name
						</label>
						<input
							id="name"
							name="name"
							className="input"
							onChange={onChange}
							value={name}
							type="text"
						/>
						{nameError && (
							<label className="errorLabels" htmlFor="name">
								{nameError}
							</label>
						)}
					</div>
					<div className="input-wrapper">
						<label className="inputLabels" htmlFor="address">
							Address
						</label>
						<input
							id="address"
							name="address"
							className="input"
							value={address}
							type="text"
							onChange={onChange}
						/>
						{addressError && (
							<label className="errorLabels" htmlFor="address">
								{addressError}
							</label>
						)}
					</div>
					<div className="input-wrapper">
						<label className="inputLabels" htmlFor="phone">
							Phone
						</label>
						<input
							id="phone"
							name="phone"
							value={phone}
							className="input"
							type="text"
							onChange={onChange}
						/>
						{phoneError && (
							<label className="errorLabels" htmlFor="phone">
								{phoneError}
							</label>
						)}
					</div>
					<div className="input-wrapper">
						<label className="inputLabels" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							name="email"
							value={email}
							className="input"
							type="email"
							onChange={onChange}
						/>
						{emailError && (
							<label className="errorLabels" htmlFor="email">
								{emailError}
							</label>
						)}
					</div>

					<button
						className="complete-btn"
						type="submit"
						disabled={disabledPaymentBtn}
					>
						Complete Payment !
					</button>
				</form>
			</section>
		</main>
	);
};

export default Payment;
