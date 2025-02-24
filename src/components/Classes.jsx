import React from 'react';

class ContadorClase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementar = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    console.log('Componente montado');
  }

  render() {
    return (
      <div>
        <p>Contador: {this.state.count}</p>
        <button onClick={this.incrementar}>Incrementar</button>
      </div>
    );
  }
}