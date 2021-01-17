import React from "react";
import { Jumbotron, Image, Col, Row } from "react-bootstrap"
import Credits from './Credits'
import { getDate } from "./utils";

export default function Person({ person, onSelected }) {
    return (
        <div className="item-detail">
            <Jumbotron>
                <Row>
                    {
                        person.image_big && (
                            <Col>
                                <Image src={person.image_big} fluid></Image>
                            </Col>
                        )
                    }
                    <Col>
                        <h1>{person.name}</h1>
                        <h3>
                            {[getDate(person), person.known_for_department || '', person.place_of_birth || ''].filter(t => t !== '').join(' - ')}
                        </h3>
                        <p>
                            {person.biography}
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
                <Credits credits={person.credits} onSelected={onSelected} />
        </div>
    )
}