import React from 'react';



class Weather extends React.Component {
    render() {
        return (
            <>
                <p>{this.props.weatherData}</p>
            </>
        )
    }
}

export default Weather;