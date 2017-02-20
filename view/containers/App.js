import React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';

const App = (props) => {
    return (
		<div className="container">
			<Helmet title="Haiduk DepositPhotos Test" />
			<Header />
			<div>
				{ props.children }
			</div>
		</div>
    );
};

export default App;
