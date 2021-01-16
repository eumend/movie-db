import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Container } from "react-bootstrap"
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import MovieDetail from './components/Detail/MovieDetail'
import ShowDetail from './components/Detail/ShowDetail'
import PersonDetail from './components/Detail/PersonDetail'
import api from "./api"

function App() {
  const [results, setResults] = useState([])
  const [page, setPage] = useState('results')
  const [category, setCategory] = useState('all')
  const [current, setCurrent] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  async function onSearch(term) {
    const results = await api.searchBy(term, category)
    console.log('results', results)
    setResults(results)
    setPage('results')
    // history.push('/results')
  }

  async function onSelected(item) {
    setLoading(true)
    console.log('selected', item)
    const details = await api.getDetails(item.media_type, item.id)
    console.log('details', details)
    setCurrent(details)
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
    console.log('results', results)
    setSuggestions(results)
  }

  function renderDetails() {
    switch (page) {
      case 'results':
        return <SearchResults results={results} onSelected={onSelected} />
      case 'movie':
        return <MovieDetail data={current} onSelected={onSelected} />
      case 'tv':
        return <ShowDetail data={current} onSelected={onSelected} />
      case 'person':
        return <PersonDetail data={current} onSelected={onSelected} />
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
