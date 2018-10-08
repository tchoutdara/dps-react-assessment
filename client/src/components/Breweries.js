// Notes: stated this component around 1:30PM, but utilized the beers component and finised around 1:45PM
import React from 'react'
import axios from 'axios'
import { Container, Card, Header, Divider, Button } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

class Breweries extends React.Component {
  state = { breweries: [], page: 1, totalPages: 0 }

componentDidMount() {
    axios.get('/api/all_breweries')
    .then( res => this.setState({ breweries: res.data.entries, totalPages: res.data.total_pages }) )
}

showBreweries = () => {
  return this.state.breweries.map( (brewery, i) => {
    return(
    <Card key={i}>
        <Card.Content>
        <Card.Header>
            {brewery.name}
        </Card.Header>
        <Card.Description>
            Description: {brewery.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* Add link to button to show brewery details page */}
          <Button basic fluid color='green'> View Brewery</Button>
        </Card.Content>
    </Card>
    )
  })
}

moreBreweriesPlz = () => {
    axios.get(`/api/all_breweries?page=${this.state.page + 1}`)
      .then( ({ data }) => {
        this.setState( state => {
          return { breweries: [...state.breweries, ...data.entries], page: state.page + 1  }
        })
      })
   }

  render() {
    return(
      <Container textAlign='center'>
      <Divider />
        <Header as='h1' color='green'>Brewery List</Header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.moreBreweriesPlz}
          hasMore={this.state.page < this.state.totalPages}
          loader={<div className='loader' key={0}>Loading ...</div>}
        >
        <Card.Group itemsPerRow={4}>
          {this.showBreweries()}
        </Card.Group>
        </InfiniteScroll>
      </Container>
      )
    }
  }

export default Breweries
