import React from 'react';
import Carousel from 'react-bootstrap/Carousel';



class Movies extends React.Component {
    render() {
        return (
            <Carousel interval="5000">
                {this.props.movieData.map((obj) => (
                <Carousel.Item>
                    <img
                        className=""
                        src={`https://image.tmdb.org/t/p/w500${obj.poster}`}
                        alt={obj.title}
                    />
                    <Carousel.Caption>
                        <h2>{obj.title}</h2>
                        <p>{obj.overview}</p>
                    </Carousel.Caption>
                   
                </Carousel.Item> 
                ))}
            </Carousel>
        )
    }
}

export default Movies;