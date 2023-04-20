import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Weather from './weather';
import Movies from './movies';
import Results from './results'
import Form from './form'

class Main extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            cityData: [],
            showMap: false,
            map: '',
            lat: '',
            lon: '',
            error: false,
            errorMsg: '',
            weatherData: '',
            showWeather: false,
            movieData: '',
            showMovie: false,
        }
    }
    
    handleCitySubmit = (event) => {
        this.setState({ 
            city: event.target.value,
        })
    }
    
    submitCityData = async (event) => {
        event.preventDefault();

        try {
            let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;

            let cityData = await axios.get(url)
            
            let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14`;

            this.setState({
                cityData: cityData.data[0],
                map: map,
                lat: cityData.data[0].lat,
                lon: cityData.data[0].lon,
                error: false,
                showMap: true,
            })

            this.handleWeather(cityData.data[0].lat, cityData.data[0].lon);
            this.handleMovie(this.state.city)

        } catch(error){
            this.setState({
                error: true,
                errorMsg: error.message,
                showMap: false,
                showWeather: false,
                showMovie: false,
            })
        }

        
    }

    handleWeather = async (lat, lon) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;


            let weatherData = await axios.get(url);

            this.setState({
                weatherData: weatherData.data,
                showWeather: true,
            })

        } catch (error) {        
            this.setState({
                error: true,
                errorMsg: `Weather error occured: ${error.response.status}, ${error.response.data}`,
                showWeather: false,
            })
        }
    }

    handleMovie = async (city) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/movie?city=${this.state.city}`;


            let movieData = await axios.get(url);
            this.setState({
                movieData: movieData.data,
                showMovie: true,
            })

        } catch (error) {        
            this.setState({
                error: true,
                errorMsg: `Movie error occured: ${error.response.status}, ${error.response.data}`,
                showMovie: false,
            })
        }
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Form 
                        onSubmit={this.submitCityData}
                        onInput={this.handleCitySubmit}
                    />
                        {
                            this.state.showMap
                            ? <Results 
                                display_name={this.state.display_name}
                                lat={this.state.lat}
                                lon={this.state.lon}
                                map={this.state.map}
                            />
                            : <p className="text-center">Choose a city! (And double check the spelling is correct!)</p>
                        }
                        {
                            this.state.error
                            ? <p>{this.state.errorMsg}</p>
                            : <p>{this.state.cityData.display_name}</p>
                        }
                        {
                            this.state.showWeather
                            ? <Weather weatherData={this.state.weatherData} />
                            : <></>
                        }
                                                {
                            this.state.showMovie
                            ? <Movies movieData={this.state.movieData}/>
                            : <></>
                        }
                </Container>
            </>
        )
    }
}

export default Main;