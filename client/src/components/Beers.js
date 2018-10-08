// Note: Started this componenet around 11AM finally beers to render around 1PM
import React from 'react'
import axios from 'axios'
import { Container, Card, Header, Divider, Button } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

class Beers extends React.Component {
  state = { beers: [], page: 1, totalPages: 0 }

componentDidMount() {
    axios.get('/api/all_beers')
    .then( res => this.setState({ beers: res.data.entries, totalPages: res.data.total_pages }) )
}

showBeers = () => {
  return this.state.beers.map( (beer, i) => {
    return(
    <Card key={i}>
        <Card.Content>
        <Card.Header>
            {beer.name}
        </Card.Header>
        <Card.Description>
            Description: {beer.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* Add link to button to show beer details page */}
          <Button basic fluid color='green'> View Beer</Button>
        </Card.Content>
    </Card>
    )
  })
}

moreBeersPlz = () => {
    axios.get(`/api/all_beers?page=${this.state.page + 1}`)
      .then( ({ data }) => {
        this.setState( state => {
          return { beers: [...state.beers, ...data.entries], page: state.page + 1  }
        })
      })
   }

  render() {
    return(
      <Container textAlign='center'>
      <Divider />
        <Header as='h1' color='green'>Beer List</Header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.moreBeersPlz}
          hasMore={this.state.page < this.state.totalPages}
          loader={<div className='loader' key={0}>Loading ...</div>}
        >
        <Card.Group itemsPerRow={4}>
          {this.showBeers()}
        </Card.Group>
        </InfiniteScroll>
      </Container>
      )
    }
  }

export default Beers
