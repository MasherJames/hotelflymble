import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './hotel.module.css';

const HotelSkeleton = () => {
	return (
		<SkeletonTheme color="#ccc" highlightColor="#e0e0e0">
			<article className={styles.hotel}>
				<div className={styles.subContainer}>
					<figure className={styles.figure}>
						<Skeleton height={175} width={250} />
					</figure>
					<div className={styles.hotelText}>
						<h1 className={styles.hotelName}>
							<Skeleton height={10} width={150} />
						</h1>
						<p className={styles.hotelSubtitle}>
							<Skeleton count={2} height={10} />
						</p>
					</div>
					<div className={styles.pricingContainer}>
						<div className={styles.pricingSubContainer}>
							<button type="button" className={styles.deleteBtn}>
								<Skeleton width={25} height={25} />
							</button>
							<div className={styles.adjustNights}>
								<div className={styles.adjustNightsSign}>
									<button type="button" className={styles.btn}>
										<Skeleton width={25} height={25} />
									</button>
									<span className={styles.countDisplay}>
										<Skeleton />
									</span>
									<button type="button" className={styles.btn}>
										<Skeleton width={25} height={25} />
									</button>
								</div>
								<h3 className={styles.totalPrice}>
									<Skeleton width={70} height={20} />
								</h3>
							</div>
						</div>
					</div>
				</div>
			</article>
		</SkeletonTheme>
	);
};

export default HotelSkeleton;
