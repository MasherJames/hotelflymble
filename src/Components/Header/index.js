import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';
import Cart from 'Assets/icons/cart.svg';
import { AppContext } from 'Context';

const Header = () => {
	const { numberOfHotels } = useContext(AppContext);

	return (
		<header className={styles.container}>
			<div className={styles.subContainer}>
				<Link to="/" className={styles.heading}>
					Flymble
				</Link>
				<nav>
					<ul>
						<li className={styles.cartInfo}>
							<img
								width="24"
								height="24"
								className={styles.cart}
								src={Cart}
								alt="cart"
							/>
							<span className={styles.cartCount}>{numberOfHotels}</span>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
