import React from "react";
import { Jumbotron } from "react-bootstrap"
import Credits from './Credits'

export default function Person({ person, onSelected }) {
    return (
        <>
            <Jumbotron>
                <h1>{person.name}</h1>
                <p>
                    {person.biography}
                </p>
            </Jumbotron>
            <Credits credits={person.credits} onSelected={onSelected}/>
        </>
    )
}