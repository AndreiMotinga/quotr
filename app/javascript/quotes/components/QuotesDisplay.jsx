import React from 'react'
import { Link } from 'react-router-dom'
// parsing params string
import queryString from 'query-string'
import axios from 'axios'

class QuotesDisplay extends React.Component {
  state = {
    quote: []
  }

  componentDidMount () {
    this.init(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.init(nextProps)
  }

  init (props) {
    const params = props.location.search
    const quoteId = this.setQuoteIdFromQueryString(params)
    this.fetchQuote(quoteId);
  }

  fetchQuote (id) {
    axios.get(`/api/quotes/${id}`)
      .then(res => {
        this.setState({ quote: res.data })
      })
      .catch(err => {
        console.error(err)
      })
  }

  setQuoteIdFromQueryString (params) {
    const qsParams = queryString.parse(params)
    const quote = qsParams.quote
    if (quote) {
      return Number(quote)
    } else {
      const startingQuoteId = this.props.startingQuoteId
      this.setInitialQuoteId(startingQuoteId)
      return startingQuoteId
    }
  }

  setInitialQuoteId (startingQuoteId) {
    this.props.history.push(`/?quote=${startingQuoteId}`)
  }

  render () {
    const { quote } = this.state
    const { text, author, next_id, previous_id } = quote

    return (
      <div>
        {previous_id && <Link to={`/?quote=${previous_id}`}>Previous</Link>}
        <p>{text}</p>
        <p>{author}</p>
        {next_id && <Link to={`/?quote=${next_id}`}>Next</Link>}
      </div>
    )
  }
}

export default QuotesDisplay;
