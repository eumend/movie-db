import React from "react";
import { ListGroup } from "react-bootstrap"
import { getDate } from "./utils";

function Item({ item }) {
    switch (item.media_type) {
        case 'movie':
            return `(Movie) ${item.title} (${getDate(item)})`
        case 'tv':
            return `(TV) ${item.name} (${getDate(item)})`
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