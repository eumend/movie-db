import React from "react";
import { Jumbotron } from "react-bootstrap"
import Credits from '../Credits'

export default function Movie({ movie, onSelected }) {
    return (
        <>
            <Jumbotron>
                <h1>{movie.title}</h1>
                <p>
                    {movie.overview}
                </p>
            </Jumbotron>
            <Credits credits={movie.credits} onSelected={onSelected}/>
        </>
    )
}