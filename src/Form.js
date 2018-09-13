import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: props.inicial
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit() {
    console.log(this.state.nombre)
  }
  render() {
    return <div>
      <input type="text" value={this.state.nombre} onChange={(evt) => {
        this.setState({ nombre: evt.target.value })
      }}/>
      <br />
      <button onClick={this.onSubmit} >hola!</button>
    </div>
  }
}

export default Form