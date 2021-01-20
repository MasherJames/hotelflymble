import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component';

import { Header, Footer } from 'Components';

const LoadableCart = loadable(() => import('Pages/Cart'), {
	fallback: <div>Loading...</div>,
});

const LoadablePayment = loadable(() => import('Pages/Payment'), {
	fallback: <div>Loading...</div>,
});

const Routes = () => {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route component={LoadableCart} exact path="/" />
					<Route component={LoadablePayment} path="/payment" />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default Routes;
