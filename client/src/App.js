import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      history: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({message: e.target.value});
  }

  onSubmit() {
    const {message, history} = this.state;
    history.push(message);

    this.setState({
      message: '',
      history: history
    }, () => {
      axios.post('/send', {message})
    });
  }

  renderHistory() {
    return this.state.history.map((val, key) =>
      <div key={key}>{val}</div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="chat-history">
          {this.renderHistory()}
        </div>
        <textarea cols="30" rows="10" onChange={e => this.onChange(e)} value={this.state.message} />
        <button type="button" onClick={this.onSubmit}>Manda</button>
      </div>
    );
  }
}

export default App;
