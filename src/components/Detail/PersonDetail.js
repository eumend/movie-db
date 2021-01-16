import React, { useEffect, useState } from "react";
import { Jumbotron, ListGroup, Spinner } from "react-bootstrap"
import api from '../../api'

export default function Person({ data: person, onSelected }) {
    const [personDetails, setPersonDetails] = useState(null)
    useEffect(() => {
        async function fetchDetails() {
            const details = await api.getPersonDetails(person.id)
            console.log('person details', details)
            setPersonDetails(details)
        }
        fetchDetails()
    }, [person.id]);
    return (
        <>
            <Jumbotron>
                <h1>{person.name}</h1>
                <p>
                    {person.biography}
                </p>
            </Jumbotron>
            {
                personDetails !== null
                    ? (
                        <>
                            <ListGroup>
                                {
                                    personDetails.credits.crew.map(item => (
                                        <ListGroup.Item key={`crew-${item.id}`} onClick={() => onSelected(item)}>
                                            {item.label}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <ListGroup>
                                {
                                    personDetails.credits.cast.map(item => (
                                        <ListGroup.Item key={`cast-${item.id}`} onClick={() => onSelected(item)}>
                                            {item.label}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </>
                    )
                    : <Spinner animation="border" />
            }
        </>
    )
}