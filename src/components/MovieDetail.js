import React from "react";
import { Jumbotron, Image, Container, Col, Row } from "react-bootstrap"
import Credits from './Credits'
import { getDate, getGenres, getPopularity } from "./utils";

export default function Movie({ movie, onSelected }) {
    return (
        <div className="item-detail">
            <Jumbotron>
                <Row>
                    {
                        movie.image_big && (
                            <Col>
                                <Image src={movie.image_big} fluid></Image>
                            </Col>
                        )
                    }
                    <Col>
                        <h1>{movie.title}</h1>
                        <h3>
                            {[getDate(movie), getGenres(movie), getPopularity(movie)].filter(t => t !== '').join(' - ')}
                        </h3>
                        <p>
                            {movie.overview}
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
                <Credits credits={movie.credits} onSelected={onSelected} />
        </div>
    )
}