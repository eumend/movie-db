import React, { useEffect, useState, useRef } from "react";
import { Form, Button, ButtonGroup, Container, InputGroup, DropdownButton, Dropdown } from "react-bootstrap"

const CATEGORIES = ['all', 'movie', 'tv', 'person']

const CAT_TO_TITLE = {
    'all': 'All',
    'movie': 'Movies',
    'tv': 'Shows',
    'person': 'Actors',
}

function SearchBar({ currentCategory, suggestions, onSearch, onCategorySelected, onSearchTerm, onSuggestionSelected }) {
    // let history = useHistory();
    const [search, setSearch] = useState("")
    const searchEl = useRef(null)
    useEffect(() => {
        setTimeout(() => searchEl.current.focus(), 1)
    }, []);
    function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log('this', this.props)
        onSearch(search)
    }
    function onSearchInput(e) {
        const term = e.target.value
        setSearch(term)
        onSearchTerm(term)
    }

    return (
        <Container fluid>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="searchForm">
                    <Form.Label>Search</Form.Label>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            as={Form.Control.Prepend}
                            variant="outline-secondary"
                            title={CAT_TO_TITLE[currentCategory]}
                            id="input-group-dropdown-1"
                            onSelect={onCategorySelected}
                        >
                            {
                                CATEGORIES.map(cat => <Dropdown.Item key={cat} eventKey={cat}>{CAT_TO_TITLE[cat]}</Dropdown.Item>)
                            }
                        </DropdownButton>
                        {/* <FormControl aria-describedby="basic-addon1" /> */}
                    </InputGroup>
                    <Form.Control ref={searchEl} value={search} onChange={onSearchInput} type="text" placeholder="The Walking Dead, Johnny Depp..." />
                    <Form.Text className="text-muted">
                        Enter the name of a Show, Movie, or Actor.
                    </Form.Text>
                </Form.Group>
                {suggestions.length > 0 && (
                    <ButtonGroup aria-label="Search Suggestions">
                        {
                            suggestions.map(s => <Button key={s.id} onClick={() => onSuggestionSelected(s)} variant="secondary">{s.label}</Button>)
                        }
                    </ButtonGroup>
                )}
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        </Container>
    )
}

export default SearchBar;