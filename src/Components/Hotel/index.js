import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Notification } from 'Components';
import { deleteHotel } from 'Actions';
import styles from './hotel.module.css';
import Plus from 'Assets/icons/plus.svg';
import Minus from 'Assets/icons/minus.svg';
import Trash from 'Assets/icons/trash.svg';

const Hotel = ({ hotel, setSelectedHotels, selectedHotels, state, dispatch }) => {
	const [scaleImg, setScaleImg] = useState(false);
	// keeps a record of the number of nights in each hotel
	const [numberOfNights, setNumberOfNights] = useState(1);
	// total price per hotel
	const [totalPrice, setTotalPrice] = useState(hotel.price);

	// Update number of nights per hotel
	const addNightCount = () => {
		setNumberOfNights(numberOfNights + 1);
	};
	const removeNightCount = () => {
		setNumberOfNights(numberOfNights - 1);
	};

	// scale the image on hover
	const scaleImage = () => {
		setScaleImg(!scaleImg);
	};

	// checks if the current hotel is selected using it's id
	const isHotelSelected = selectedHotels[hotel.id];

	const addOrRomoveHotel = () => {
		// If the hotel was already selected, remove it else add it
		if (isHotelSelected) {
			// delete hotel;
			setSelectedHotels((selectedHotels) => {
				delete selectedHotels[hotel.id];
				return { ...selectedHotels };
			});
			// reset amount of nights to one when hotel is deleted
			setNumberOfNights(1);
		} else {
			// add hotel { id: [price,  numberOfNights] }
			setSelectedHotels((selectedHotels) => ({
				...selectedHotels,
				[hotel.id]: [hotel.price, numberOfNights],
			}));
		}
	};

	useEffect(() => {
		// update single hotel price on number of nights change
		const totalPrice = numberOfNights * hotel.price;
		setTotalPrice(totalPrice);

		// update the number of nights count in selectedHotels also
		if (isHotelSelected) {
			setSelectedHotels((selectedHotels) => {
				// if number of nights are reduced to zero, then remove from selected hotels
				// else update the count
				if (numberOfNights === 0) {
					delete selectedHotels[hotel.id];
				} else {
					selectedHotels[hotel.id][1] = numberOfNights;
				}
				return { ...selectedHotels };
			});
		}
	}, [numberOfNights]);

	const hideNotification = () => {
		dispatch({ type: 'NOTIFICATION', payload: { message: '', type: '' } });
	};

	const hotelImgStyle = scaleImg
		? { transform: 'scale(1)' }
		: { transform: 'scale(1.2)' };

	const hotelStyle = isHotelSelected
		? { boxShadow: '0 3px 5px 0 black' }
		: { boxShadow: '0 3px 5px 0 rgba(0, 0, 0, .1)' };

	return (
		<article className={styles.hotel} style={hotelStyle}>
			{state.notification.message && (
				<Notification
					message={state.notification.message}
					notificationType={state.notification.type}
					hideNotification={hideNotification}
				/>
			)}
			<div className={styles.subContainer}>
				<figure
					className={styles.figure}
					onMouseEnter={scaleImage}
					onMouseLeave={scaleImage}
					onClick={addOrRomoveHotel}
				>
					<img
						className={styles.hotelImg}
						style={hotelImgStyle}
						src={hotel.image}
						alt={hotel.name}
						height="211"
						width="313"
					/>
				</figure>
				<div className={styles.hotelText} onClick={addOrRomoveHotel}>
					<h1 className={styles.hotelName}>{hotel.name}</h1>
					<p className={styles.hotelSubtitle}>{hotel.subtitle}</p>
				</div>
				<div className={styles.pricingContainer}>
					<div className={styles.pricingSubContainer}>
						<button
							type="button"
							className={styles.deleteBtn}
							onClick={() => {
								deleteHotel(dispatch, hotel.id);
							}}
						>
							<img width="24" height="24" src={Trash} alt="delete" />
						</button>
						<div className={styles.adjustNights}>
							<div className={styles.adjustNightsSign}>
								<button
									type="button"
									className={styles.btn}
									onClick={addNightCount}
									disabled={numberOfNights >= 14}
								>
									<img width="24" height="24" src={Plus} alt="plus" />
								</button>
								<span className={styles.countDisplay}>
									{numberOfNights}
								</span>
								<button
									type="button"
									className={styles.btn}
									onClick={removeNightCount}
									disabled={numberOfNights <= 0}
								>
									<img width="24" height="24" src={Minus} alt="minus" />
								</button>
							</div>
							<h3 className={styles.totalPrice}>{`${totalPrice} €`}</h3>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

Hotel.propTypes = {
	hotel: PropTypes.object.isRequired,
	selectedHotels: PropTypes.object.isRequired,
	setSelectedHotels: PropTypes.func.isRequired,
	state: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default Hotel;
