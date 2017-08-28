import { Component } from 'react'

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('https://api.steve.ly/' + this.props.url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return this.props.children(this.state.data);
  }
}

export default Fetch
