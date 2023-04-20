import React from 'react';
import Accordion from 'react-bootstrap/Accordion';



class Weather extends React.Component {
    render() {
        return (
            <Accordion>
                <Accordion.Header>Click Here For Upcoming Weather!</Accordion.Header>
                {this.props.weatherData.map((obj) => 
                <Accordion.Item eventKey="">
                    <Accordion.Body>
                        The forecast will be {obj.description} on {obj.date}.
                    </Accordion.Body>
                </Accordion.Item>
                        )}
            </Accordion>
        )
    }
}

export default Weather;