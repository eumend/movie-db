import React from "react";
import { ListGroup } from "react-bootstrap"
import { getDate } from "./utils";
import { PersonFill, Film, TvFill } from 'react-bootstrap-icons'

function getIcon(item) {
    switch (item.media_type) {
        case 'movie':
            return <Film />
        case 'tv':
            return <TvFill />
        case 'person':
            return <PersonFill />
        default:
            return ""
    }
}

function getLabel(item) {
    switch (item.media_type) {
        case 'movie':
            return `${item.title} (${getDate(item)})`
        case 'tv':
            return `${item.name} (${getDate(item)})`
        case 'person':
            return `${item.name} (${item.department || item.known_for_department})`
        default:
            return ""
    }
}

function ItemList({ items, onSelected }) {
    return (
        <ListGroup className="item-list">
            {
                items.map(item => (
                    <ListGroup.Item className="list-item" key={`${item.media_type ? item.media_type + item.id : item.id}`} onClick={() => onSelected(item)}>
                        <span className="icon">{getIcon(item)}</span>
                        <span className="label">{getLabel(item)}</span>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ItemList;