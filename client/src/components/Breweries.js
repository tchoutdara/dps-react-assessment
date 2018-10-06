// Notes: stated this component around 1:30PM, but utilized the beers component and finised around 1:45PM
import React from 'react'
import axios from 'axios'
import { Container, Card, Header, Divider } from 'semantic-ui-react'

class Breweries extends React.Component {
  state = { breweries: [] }

componentDidMount() {
    axios.get('/api/all_breweries')
    .then( res => this.setState({ breweries: res.data.entries }) )
}



showBreweries = () => {
  return this.state.breweries.map( (brewery, i) => {
    return(
    <Card key={i}>
        <Card.Content>
        <Card.Header>
            {brewery.name}
        </Card.Header>
        </Card.Content>
    </Card>
    )
  })
}

  render() {
    return(
      <Container textAlign='center'>
      <Divider />
        <Header as='h1' color='green'>Brewery List</Header>
        <Card.Group itemsPerRow={4}>
          {this.showBreweries()}
        </Card.Group>
      </Container>
      )
    }
  }

export default Breweries
