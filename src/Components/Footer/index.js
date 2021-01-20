import React from 'react';

import styles from './footer.module.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.container}>
			<p className={styles.text}>
				&copy; {currentYear} Key. All Rights Reserved | Flymble
			</p>
		</footer>
	);
};

export default Footer;
