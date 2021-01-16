import React from "react";
import { ListGroup } from "react-bootstrap"

function Item({ item }) {
    switch (item.media_type) {
        case 'movie':
            return `(Movie) ${item.label}`
        case 'tv':
            return `(TV) ${item.label}`
        case 'person':
            return `(Person) ${item.label}`
        default:
            return ""
    }
}

function ResultsPage({ results, onSelected }) {
    return (
        <ListGroup>
            {
                results.map(item => (
                    <ListGroup.Item key={`${item.media_type ? item.media_type + item.id : item.id}`} onClick={() => onSelected(item)}>
                        <Item item={item}></Item>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ResultsPage;