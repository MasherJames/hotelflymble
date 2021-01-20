import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './notification.module.css';

const Notification = ({ message, notificationType, hideNotification = () => {} }) => {
	useEffect(() => {
		if (notificationType === 'success') {
			setTimeout(() => {
				hideNotification();
			}, 5000);
		}
	}, [hideNotification, notificationType]);

	const notificationStyles =
		notificationType === 'success'
			? { backgroundColor: '#c7cbd0', color: '#2e3237' }
			: { backgroundColor: '#cf4403', color: '#fff' };

	return (
		<div className={styles.notificationWrapper}>
			<div className={styles.alert} style={notificationStyles}>
				<div>{message}</div>
				<button
					type="button"
					className={styles.closeBtn}
					onClick={hideNotification}
				>
					X
				</button>
			</div>
		</div>
	);
};

Notification.propTypes = {
	message: PropTypes.string.isRequired,
	notificationType: PropTypes.string.isRequired,
	hideNotification: PropTypes.func,
};

export default Notification;
