import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router'
import { DrizzleProvider } from 'drizzle-react'


// Layouts
import App from './App'
import { LoadingContainer } from 'drizzle-react-components'


import { history, store } from './store'
import drizzleOptions from './drizzleOptions'


ReactDOM.render((
  <body className="HolyGrail">
	<DrizzleProvider options={drizzleOptions} store={store}>
		<LoadingContainer>
			<Router history={history}>
          		<Route path='/' component={App} />	
			</Router> 
		</LoadingContainer>
	</DrizzleProvider>

  </body>
	),
	document.getElementById('root')
);
