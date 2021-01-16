import React from "react";
import { Jumbotron } from "react-bootstrap"
import Credits from './Credits'
import { getDate } from "./utils";

export default function Movie({ movie, onSelected }) {
    return (
        <>
            <Jumbotron>
                <h1>{movie.title}</h1>
                <h2>
                    {getDate(movie)}
                </h2>
                <p>
                    {movie.overview}
                </p>
            </Jumbotron>
            <Credits credits={movie.credits} onSelected={onSelected}/>
        </>
    )
}