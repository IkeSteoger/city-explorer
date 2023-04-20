import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

class WeatherDay extends React.Component {
    render() {
        return (
                <Accordion.Item eventKey="">
                    <Accordion.Body>
                        The forecast will be {this.props.description} on {this.props.date}.
                    </Accordion.Body>
                </Accordion.Item>
        )
    }
}

export default WeatherDay;