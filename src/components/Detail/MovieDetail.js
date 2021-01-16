import React, { useEffect, useState } from "react";
import { Jumbotron, ListGroup, Spinner } from "react-bootstrap"
import api from '../../api'

export default function Movie({ data: movie, onSelected }) {
    const [movieDetails, setMovieDetails] = useState(null)
    useEffect(() => {
        async function fetchDetails() {
            const details = await api.getMovieDetails(movie.id)
            console.log('movie details', details)
            setMovieDetails(details)
        }
        fetchDetails()
    }, [movie.id]);
    return (
        <>
            <Jumbotron>
                <h1>{movie.title}</h1>
                <p>
                    {movie.overview}
                </p>
            </Jumbotron>
            {
                movieDetails !== null
                    ? (
                        <>
                            <ListGroup>
                                {
                                    movieDetails.credits.crew.map(item => (
                                        <ListGroup.Item key={`crew-${item.id}`} onClick={() => onSelected(item)}>
                                            {item.label}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <ListGroup>
                                {
                                    movieDetails.credits.cast.map(item => (
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