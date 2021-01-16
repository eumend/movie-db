import React from "react";
import { ListGroup } from "react-bootstrap"

function Item({ item }) {
    switch (item.media_type) {
        case 'movie':
            return `(Movie) ${item.title} (${(new Date(item.release_date)).getFullYear()})`
        case 'tv':
            return `(TV) ${item.name} (${(new Date(item.first_air_date)).getFullYear()})`
        case 'person':
            return `(Person) ${item.name} (${item.department || item.known_for_department})`
        default:
            return ""
    }
}

function ItemList({ items, onSelected }) {
    return (
        <ListGroup>
            {
                items.map(item => (
                    <ListGroup.Item key={`${item.media_type ? item.media_type + item.id : item.id}`} onClick={() => onSelected(item)}>
                        <Item item={item}></Item>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ItemList;