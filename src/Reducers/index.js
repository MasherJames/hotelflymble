const hotelsReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'FETCH_HOTELS':
			return { ...state, hotels: payload, notification: { message: '', type: '' } };
		case 'FETCH_HOTELS_LOADING':
			return { ...state, loading: payload };
		case 'DELETE_HOTEL':
			return {
				...state,
				hotels: state.hotels.filter((hotel) => hotel.id !== payload.id),
			};
		case 'NOTIFICATION':
			return { ...state, notification: payload, hotels: state.hotels };
		default:
			return state;
	}
};
export { hotelsReducer };
