import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Form extends React.Component {
    render() {
        return (
            <Row>
                <Col className="text-center">
                    <form className="form" onSubmit={this.props.onSubmit} >
                        <label> Enter a city name:
                            <input type="text" onInput={this.props.onInput} />
                        </label>
                        <button className="button" type="submit">Explore!</button>
                    </form>
                </Col>
            </Row>
        )
    }
}

export default Form;