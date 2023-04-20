import React from 'react';
import Carousel from 'react-bootstrap/Carousel';



class Movie extends React.Component {
    
    render() {

        const {
            key, movieData, ...rest
        } = this.props

        return (
                <Carousel.Item {...rest} key={key}>
                    <img
                        className=""
                        src={
                            `https://image.tmdb.org/t/p/w500${movieData.poster}` 
                            }
                        alt={movieData.title}
                    />
                    <Carousel.Caption>
                        <h2>{movieData.title}</h2>
                        <p>{movieData.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
        )
    }
}

export default Movie;