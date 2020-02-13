import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieCard = props => {
	const [movies, setMovies] = useState();
	const param = props.location.pathname.slice(-1);
	console.log(param);
	const api =
		param !== '/'
			? `http://localhost:5000/api/movies/${param}/`
			: 'http://localhost:5000/api/movies';

	useEffect(() => {
		const getMovies = () => {
			axios
				.get(api)
				.then(response => {
					console.log(response.data);
					setMovies(response.data);
				})
				.catch(error => {
					console.error('Server Error', error);
				});
		};

		getMovies();
	}, [api]);

	if (!movies) {
		return <div>Loading movie information...</div>;
	}

	if (movies.length === undefined) {
		return (
			<div className="movie-list">
				<MovieDetails key={movies.id} movie={movies} />
			</div>
		);
	} else {
		return (
			<div className="movie-list">
				{movies.map(movie => (
					<MovieDetails key={movie.id} movie={movie} />
				))}
			</div>
		);
	}
};

function MovieDetails({ movie }) {
	const { title, director, metascore, stars } = movie;
	return (
		<div className="save-wrapper">
			<Link to={`/movies/${movie.id}`}>
				<div className="movie-card">
					<h2>{title}</h2>
					<div className="movie-director">
						Director: <em>{director}</em>
					</div>
					<div className="movie-metascore">
						Metascore: <strong>{metascore}</strong>
					</div>
					<h3>Actors</h3>

					{stars.map(star => (
						<div key={star} className="movie-star">
							{star}
						</div>
					))}
				</div>
			</Link>
		</div>
	);
}

export default MovieCard;
