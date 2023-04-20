import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Movie from './movie'



class Movies extends React.Component {
    render() {

        let filteredMovies = this.props.movieData.filter(movie => movie.poster != null)

        return (
            <Carousel interval="5000">
                {filteredMovies.map((obj, idx) => (
                    <Movie
                        key={idx}
                        movieData={obj}
                    />
                ))}
            </Carousel>
        )
    }
}

export default Movies;