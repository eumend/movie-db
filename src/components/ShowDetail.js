import React from "react";
import { Jumbotron } from "react-bootstrap"
import Credits from './Credits'

export default function Show({ show, onSelected }) {
    return (
        <>
            <Jumbotron>
                <h1>{show.name}</h1>
                <p>
                    {show.overview}
                </p>
            </Jumbotron>
            <Credits credits={show.credits} onSelected={onSelected}/>
        </>
    )
}