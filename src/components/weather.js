import React from 'react';



class Weather extends React.Component {
    render() {
        console.log(this.props.weatherData, this.props.dateData)
        return (
            <>
                <p>On {this.props.dateData} it will be {this.props.weatherData}.</p>
            </>
        )
    }
}

export default Weather;