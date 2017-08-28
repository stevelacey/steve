import React from 'react'

class Fetch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/' + this.props.url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return this.props.children(this.state.data);
  }
}

export default Fetch
