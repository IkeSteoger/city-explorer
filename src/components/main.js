import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

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
        }
    }
    
    handleCitySubmit = (event) => {
        this.setState({ 
            city: event.target.value,
            showMap: true,
        })
    }
    
    submitCityData = async (event) => {
        event.preventDefault();

        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;

        let cityData = await axios.get(url)
        
        let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14`;

        this.setState({
            cityData: cityData.data[0],
            map: map,
            lat: cityData.data[0].lat,
            lon: cityData.data[0].lon,
        })
    }

    renderMap = () => {
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <form onSubmit={this.submitCityData} >
                                <label> Enter a city name:
                                    <input type="text" onInput={this.handleCitySubmit} />
                                </label>
                                <button type="submit">Explore!</button>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Card variant="outlined">
                            <Card.Body>
                                <Col><Card.Title>{this.state.display_name}</Card.Title></Col>
                                    <Col><Card.Text>Latitude: {this.state.lat}</Card.Text></Col>
                                    <Col><Card.Text>Longitude: {this.state.lon}</Card.Text></Col>
                                <Card.Text>Map: <img src={this.state.map} alt="map" /></Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Main;