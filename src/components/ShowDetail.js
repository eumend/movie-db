import React from "react";
import { Jumbotron, Image, Container, Col, Row } from "react-bootstrap"
import Credits from './Credits'
import { getDate, getGenres, getPopularity } from "./utils";

export default function Show({ show, onSelected }) {
    return (
        <div className="item-detail">
            <Jumbotron>
                <Row>
                    {
                        show.image_big && (
                            <Col>
                                <Image src={show.image_big} fluid></Image>
                            </Col>
                        )
                    }
                    <Col>
                        <h1>{show.name}</h1>
                        <h3>
                            {[getDate(show), getGenres(show), getPopularity(show)].filter(t => t !== '').join(' - ')}
                        </h3>
                        <p>
                            {show.overview}
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
            <Credits credits={show.credits} onSelected={onSelected} />
        </div>
    )
}
