import React from 'react';
import './Form.css'

class Form extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        Name:'',
        Model:'',
        Type:'',
        Color:'',
        
    };
}

   handleSubmit = (event) => {
    event.preventDefault();
  }

  handleInput= (event) => {
      console.log("in form comp", this.state)
      const stateObj=this.state;
      console.log (stateObj)
      this.props.parentCallback(stateObj);
  }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h2>New Vehicle Form</h2>
              <label>Enter Vehicle name:
              <input 
                type="text" 
                name="Vehicle" 
                value={this.state.Name} 
                onChange={e=> this.setState({Name:e.target.value })}/>
         
              </label>
              </div>

              <div><label>Enter Vehicle Model:
                <input 
                  type="text" 
                  name="Model" 
                  value={this.state.Model} 
                  onChange={e=> this.setState({Model:e.target.value })}/>
              
                </label>
                </div>
              <div><label>Enter Vehicle Type:
                <input 
                  type="text" 
                  name="Color" 
                  value={this.state.Type} 
                  onChange={e=> this.setState({Type:e.target.value })}/>
              
                </label>
                </div>
              
              <label>Enter Vehicle Color:
                <input 
                  type="text" 
                  name="Type" 
                  value={this.state.Color} 
                  onChange={e=> this.setState({Color:e.target.value })}/>
               
                </label>
                <input type="submit" onClick={this.handleInput} />
            </form>
          )
    }
}



export default Form;