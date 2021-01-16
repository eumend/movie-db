import React, { useEffect, useState } from "react";
import { Jumbotron, ListGroup, Spinner } from "react-bootstrap"
import api from '../../api'

export default function Show({ data: show, onSelected }) {
    const [showDetails, setShowDetails] = useState(null)
    useEffect(() => {
        async function fetchDetails() {
            const details = await api.getShowDetails(show.id)
            console.log('show details', details)
            setShowDetails(details)
        }
        fetchDetails()
    }, [show.id]);
    return (
        <>
            <Jumbotron>
                <h1>{show.name}</h1>
                <p>
                    {show.overview}
                </p>
            </Jumbotron>
            {
                showDetails !== null
                    ? (
                        <>
                            <ListGroup>
                                {
                                    showDetails.credits.crew.map(item => (
                                        <ListGroup.Item key={`crew-${item.id}`} onClick={() => onSelected(item)}>
                                            {item.label}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <ListGroup>
                                {
                                    showDetails.credits.cast.map(item => (
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