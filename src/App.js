import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Container } from "react-bootstrap"
import SearchBar from './components/SearchBar'
import ItemList from './components/ItemList'
import MovieDetail from './components/MovieDetail'
import ShowDetail from './components/ShowDetail'
import PersonDetail from './components/PersonDetail'
import api from "./api"

function App() {
  const [results, setResults] = useState([])
  const [page, setPage] = useState('results')
  const [category, setCategory] = useState('all')
  const [currentItem, setCurrentItem] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  async function onSearch(term) {
    const results = await api.searchBy(term, category)
    setResults(results)
    setPage('results')
  }

  async function onSelected(item) {
    setLoading(true)
    const details = await api.getItemDetails(item)
    console.log('details', details)
    setCurrentItem(details)
    setPage(item.media_type)
    setLoading(false)
  }

  function onCategorySelected(category) {
    setCategory(category)
  }

  function onSearchTerm(term) {
    if (term.length > 4) {
      searchSuggestions(term)
    }
  }

  async function searchSuggestions(term) {
    const results = await api.searchBy(term, category)
    setSuggestions(results)
  }

  function renderDetails() {
    switch (page) {
      case 'results':
        return <ItemList items={results} onSelected={onSelected} />
      case 'movie':
        return <MovieDetail movie={currentItem} onSelected={onSelected} />
      case 'tv':
        return <ShowDetail show={currentItem} onSelected={onSelected} />
      case 'person':
        return <PersonDetail person={currentItem} onSelected={onSelected} />
      default:
        return null
    }
  }

  return (
    <Container fluid>
      <SearchBar currentCategory={category} suggestions={suggestions} onSearch={onSearch} onSearchTerm={onSearchTerm} onCategorySelected={onCategorySelected} onSuggestionSelected={onSelected} />
      {
        loading
          ? <Spinner animation="border" />
          : renderDetails()
      }
    </Container>
  );
}

export default App;
