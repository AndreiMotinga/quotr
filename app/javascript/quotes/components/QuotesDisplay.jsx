import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

class QuotesDisplay extends React.Component {
  constructor() {
    super()

    this.state = {
      quote: []
    }
  }

  fetchQuote (id) {
    axios.get(`/api/quotes/${id}`)
      .then(res => {
        this.setState({ quote: res.data })
      })
      .catch( err => {
        console.error(err)
      })
  }

  setQuoteIdFromQueryString (qs) {
    this.qsParams = queryString.parse(qs)
    if (this.qsParams.quote) {
      this.quoteId = Number(this.qsParams.quote)
    } else {
      this.quoteId = 1
      this.props.history.push(`/?quote=${this.quoteId}`)
    }
  }

  componentDidMount () {
    this.setQuoteIdFromQueryString(this.props.location.search)
    this.fetchQuote(this.quoteId)
  }

  componentWillReceiveProps (nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search)
    this.fetchQuote(this.quoteId);
  }

  render () {
    const nextQuoteId = Number(this.state.quote.id) + 1

    return (
      <div>
        <Link to={`/?quote=${nextQuoteId}`}>Next</Link>
        <p>{this.state.quote.text}</p>
        <p>{this.state.quote.author}</p>
      </div>
    )
  }
}

export default QuotesDisplay;
