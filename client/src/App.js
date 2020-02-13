import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import MovieCard from './Movies/MovieCard';

const App = () => {
	const [savedList, setSavedList] = useState([]);

	const addToSavedList = movie => {
		setSavedList([...savedList, movie]);
	};
	console.log('savedList', savedList);
	return (
		<div>
			<SavedList list={savedList} />
			<Route
				path="/"
				render={props => <MovieCard {...props} addToSavedList={addToSavedList} />}
			/>
			{/* <Route path="/" exact component={MovieList} /> */}
			{/* <Route path="/movies/:id" exact component={Movie} /> */}
		</div>
	);
};

export default App;
