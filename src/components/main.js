import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './weather'

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
            dateData: '',
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
            this.handleWeather(event);
        } catch(error){
            this.setState({
                error: true,
                errorMsg: error.message,
                showMap: false,
                showWeather: false,
            })
        }

        
    }

    handleWeather = async (event) => {
        event.preventDefault();
        try {
            let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;

            let weatherData = await axios.get(url);
            console.log(weatherData.data.description, weatherData.data.valid_date);

            this.setState({
                weatherData: weatherData.data.description,
                dateData: weatherData.data.valid_date,
                showWeather: true,
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col className="text-center">
                            <form className="form" onSubmit={this.submitCityData} >
                                <label> Enter a city name:
                                    <input type="text" onInput={this.handleCitySubmit} />
                                </label>
                                <button className="button" type="submit">Explore!</button>
                            </form>
                        </Col>
                    </Row>
                        {
                            this.state.showMap
                            ? <Card className="text-center card">
                                <Card.Body>
                                    <Card.Title>{this.state.display_name}</Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>Latitude: {this.state.lat}</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>Longitude: {this.state.lon}</Card.Text>
                                    </Col>
                                </Row>
                                    <Card.Text><img src={this.state.map} alt="" /></Card.Text>
                                </Card.Body>
                            </Card>
                            : <p className="text-center">Choose a city! (And double check the spelling is correct!)</p>
                        }
                        {
                            this.state.error
                            ? <p>{this.state.errorMsg}</p>
                            : <p>{this.state.cityData.display_name}</p>
                        }
                        {/* {
                            this.state.showWeather
                            ? <Weather weather={this.state.weatherData} date={this.state.dateData} />
                            : <></>
                        } */}
                        <Weather weather={this.state.weatherData} date={this.state.dateData} />
                </Container>
            </>
        )
    }
}

export default Main;