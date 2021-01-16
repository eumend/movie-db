import React, { useEffect, useState, useRef } from "react";
import { Form, Button, InputGroup, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap"
import { getShortLabel } from "./utils";

const CATEGORIES = ['all', 'movie', 'tv', 'person']

const CAT_TO_TITLE = {
    'all': 'All',
    'movie': 'Movies',
    'tv': 'Shows',
    'person': 'Actors',
}

function SearchBar({ currentCategory, suggestions, onSearch, onCategorySelected, onSearchTerm, onSuggestionSelected }) {
    const [search, setSearch] = useState("")
    const searchEl = useRef(null)
    useEffect(() => {
        setTimeout(() => searchEl.current.focus(), 1)
    }, []);
    function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        onSearch(search)
    }
    function onSearchInput(e) {
        const term = e.target.value
        setSearch(term)
        onSearchTerm(term)
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <InputGroup className="mb-3">
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={CAT_TO_TITLE[currentCategory]}
                        id="input-group-dropdown-1"
                        onSelect={onCategorySelected}
                    >
                        {
                            CATEGORIES.map(cat => <Dropdown.Item key={cat} eventKey={cat}>{CAT_TO_TITLE[cat]}</Dropdown.Item>)
                        }
                    </DropdownButton>
                    <Form.Control
                        ref={searchEl} value={search} onChange={onSearchInput} type="text" placeholder="The Walking Dead, Johnny Depp..."
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => onSearch(search)}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>

            </Form>
            {suggestions.length > 0 && (
                <ButtonGroup aria-label="Search Suggestions">
                    {
                        suggestions.slice(0, 6).map(s => <Button key={s.id} onClick={() => onSuggestionSelected(s)} variant="secondary">{getShortLabel(s)}</Button>)
                    }
                </ButtonGroup>
            )}
        </>
    )
}

export default SearchBar;