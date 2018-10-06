// Note: Started this componenet around 11AM finally beers to render around 1PM
import React from 'react'
import axios from 'axios'
import { Container, Card, Header, Divider } from 'semantic-ui-react'

class Beers extends React.Component {
  state = { beers: [] }

componentDidMount() {
    axios.get('/api/all_beers')
    .then( res => this.setState({ beers: res.data.entries }) )
}



showBeers = () => {
  return this.state.beers.map( (beer, i) => {
    return(
    <Card key={i}>
        <Card.Content>
        <Card.Header>
            {beer.name}
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
        <Header as='h1' color='green'>Beer List</Header>
        <Card.Group itemsPerRow={4}>
          {this.showBeers()}
        </Card.Group>
      </Container>
      )
    }
  }

export default Beers
