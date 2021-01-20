import { FETCH_HOTELS, FETCH_HOTELS_LOADING, NOTIFICATION, DELETE_HOTEL } from './types';

import { api } from 'Services';

const fetchHotels = async (dispatch) => {
	// dispatch loading true
	dispatch({
		type: FETCH_HOTELS_LOADING,
		payload: true,
	});

	try {
		const hotels = await api.get('/hotels');
		// Dispatch fetch hotels
		dispatch({
			type: FETCH_HOTELS,
			payload: hotels?.data,
		});
	} catch (error) {
		// dispathc error if any
		dispatch({
			type: NOTIFICATION,
			payload: {
				message: `Error code ${error?.response?.status}: Something went wrong! Try again`,
				type: 'error',
			},
		});
	} finally {
		// dispatch loading false when the promise resolves
		dispatch({
			type: FETCH_HOTELS_LOADING,
			payload: false,
		});
	}
};

const deleteHotel = async (dispatch, hotelId) => {
	try {
		const response = await api.delete(`/hotels/${hotelId}`);

		// Dispatch delete hotels
		dispatch({
			type: DELETE_HOTEL,
			payload: response.data,
		});

		if (response.statusText == 'OK') {
			// dspatch success if no error
			dispatch({
				type: NOTIFICATION,
				payload: {
					message: 'Hotel deleted successfully',
					type: 'success',
				},
			});
		}
	} catch (error) {
		// dispathc error if any
		dispatch({
			type: NOTIFICATION,
			payload: {
				message: `Error code ${error?.response?.status}: Something went wrong! Try again`,
				type: 'error',
			},
		});
	}
};

export { fetchHotels, deleteHotel };
