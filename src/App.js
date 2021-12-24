
import './App.css';
import React, { Component } from 'react'
import CRUD from './Api/crud'


class App extends Component {
  state={data:[],errorMsg:''}

  async componentDidMount(){
    try {
        const {data}=await CRUD.get('Items')
        this.setState({data:data});
        } 
        catch (err) {
            this.setState ({errorMsg:err.message})
        }
        console.log(this.state.data)
    }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}



export default App;
