import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Hotel, HotelSkeleton, Notification } from 'Components';
import { hotelsReducer } from 'Reducers';
import { fetchHotels } from 'Actions';
import { AppContext } from 'Context';

const initialState = {
	notification: { message: '', type: '' },
	hotels: [],
	loading: false,
};
const Cart = () => {
	// selected hotels
	const [selectedHotels, setSelectedHotels] = useState({});
	// the total price for all hotels and all nights
	const [allHotelsTotalPrice, setAllHotelsTotalPrice] = useState(0);
	const [state, dispatch] = useReducer(hotelsReducer, initialState);
	const { setNumberOfHotels } = useContext(AppContext);

	const history = useHistory();

	const navigateToPayment = () => {
		history.push('/payment');
	};

	useEffect(() => {
		// Trigger fetch hotels action
		fetchHotels(dispatch);
	}, []);

	useEffect(() => {
		const totalPrice = Object.values(selectedHotels).reduce(
			(acc, [price, numberOfNights]) => acc + price * numberOfNights,
			0,
		);
		// set total price
		setAllHotelsTotalPrice(totalPrice);
		// set number of selected hotels
		setNumberOfHotels(Object.values(selectedHotels).length);
	}, [selectedHotels]);

	const hideNotification = () => {
		dispatch({ type: 'NOTIFICATION', payload: { message: '', type: '' } });
	};

	return (
		<main className="page-wrapper">
			{state.notification.message && (
				<Notification
					message={state.notification.message}
					notificationType={state.notification.type}
					hideNotification={hideNotification}
				/>
			)}
			<section className="page-sub-wrapper">
				<>
					{state.loading ? (
						<HotelSkeleton />
					) : (
						<>
							{state.hotels.map((hotel) => (
								<Hotel
									key={hotel.id}
									hotel={hotel}
									setSelectedHotels={setSelectedHotels}
									selectedHotels={selectedHotels}
									state={state}
									dispatch={dispatch}
								/>
							))}
							{state.hotels.length > 0 && (
								<div className="booking-container">
									<p className="total-price">
										{`${allHotelsTotalPrice} €`}
									</p>
									<button
										className="book-btn"
										type="button"
										onClick={navigateToPayment}
									>
										Book Now !
									</button>
								</div>
							)}
						</>
					)}
				</>
			</section>
		</main>
	);
};

export default Cart;
