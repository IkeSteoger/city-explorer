import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import WeatherDay from './weatherDay';



class Weather extends React.Component {
    render() {
        return (
            <Accordion>
                <Accordion.Header>Click Here For 16 Day Forecast Summary</Accordion.Header>
            {
                this.props.weatherData.map((obj, idx) =>
                    <WeatherDay
                        key={idx}
                        description={obj.description}
                        date={obj.valid_date}
                    />
                )
            }
            </Accordion>
        )
    }
}


export default Weather;