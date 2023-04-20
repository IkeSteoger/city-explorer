import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Results extends React.Component {
    render() {
        return (
        <Card className="text-center card">
            <Card.Body>
                <Card.Title>{this.props.display_name}</Card.Title>
            <Row>
                <Col>
                    <Card.Text>Latitude: {this.props.lat}</Card.Text>
                </Col>
                <Col>
                    <Card.Text>Longitude: {this.props.lon}</Card.Text>
                </Col>
            </Row>
                <Card.Text><img src={this.props.map} alt="" /></Card.Text>
            </Card.Body>
        </Card>
        )
    }
}

export default Results;