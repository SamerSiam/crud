
import './App.css';
import React, { Component } from 'react'
import CRUD from './Api/crud'
import Spinner from './Components/Spinner.js'
import Form from './Components/Form.js'



class App extends Component {
  state={
    data:[],errorMsg:'',
  isLoading: true,
  selectedVehicle:{},
  newVehicle:{},
  isNew:false,
}

  /* Get Data from API upon Mount***************************/

  async componentDidMount(){
    try {
        const {data}=await CRUD.get('Vehicles')
        this.setState({data:data,isLoading: false});
        } 
        catch (err) {
            this.setState ({errorMsg:err.message})
        }
        console.log(this.state.data)
    }
/****************************************************************
 * Display
 */
    displayVehicles=() =>{
      return(
        
        <div className="display">
          
            <table border="1">
             
          <tbody>
          <div className="heading"> <h1> Vehicle List API</h1></div>
                <tr>
                  <td> ID</td>
                  <td> Name</td>
                  <td> Model</td>
                  <td> Type</td>
                  <td> Color</td>
                  <button onClick={() => this.setState({isNew:true})}>Add New</button>
                </tr>
                { 
            this.state.data
            
            .map((item,i) =>
            <tr key={i}>
            <td>{item.id} </td>
            <td>{item.Vehicle} </td>
            <td>{item.Model} </td>
            <td>{item.Type} </td>
            <td>{item.Color} </td>
            <button onClick={() => this.deleteRecord(item.id)}>Delete</button>
            <button onClick={() => this.selectRecord(item.id)}>Update</button>
        
            </tr>
            )
                }
              </tbody>
            </table>
            <div className="update-vehicle">
              <h3>Update Vehicle Form</h3>
               <label> Vehicle: </label>
               <input type="text" value={this.state.selectedVehicle.Vehicle} 
               onChange={e=>this.setState((prevState=>({ selectedVehicle: {...prevState.selectedVehicle,Vehicle:e.target.value}})))}/> <br/> <br/>
               
               <label> Model: </label>
               <input type="text" value={this.state.selectedVehicle.Model}
                onChange={e=>this.setState((prevState=>({ selectedVehicle: {...prevState.selectedVehicle,Model:e.target.value}})))}/> <br/> <br/>
               
               <label> Type: </label>
               <input type="text" value={this.state.selectedVehicle.Type}
                onChange={e=>this.setState((prevState=>({ selectedVehicle: {...prevState.selectedVehicle,Type:e.target.value}})))}/> <br/> <br/>
               
               <label> Color: </label>
               <input type="text" value={this.state.selectedVehicle.Color}
                onChange={e=>this.setState((prevState=>({ selectedVehicle: {...prevState.selectedVehicle,Color:e.target.value}})))}/> <br/> <br/>
               
               <button onClick={() => this.updateRecord()}>Update Vehicle</button>
            </div>
        </div>
       
      )
               
      
    }
    createNew = async (childData)=>{
        this.setState({newVehicle:childData})

        console.log("create new", childData)
  try{
        const { data } = await CRUD.post("/Vehicles/", childData);
        this.setState((state) => {
        return { data: [...state.data, data] };
        }); 

      } catch (e) {
        this.setState({ errorMsg: e.message });
      }
    }

/****************************************************************
 * Delete Record by ID
 */
    deleteRecord = async (id)=>{
      console.log("inside delete" ,id)
      try{
         await CRUD.delete(`Vehicles/${id}`)
      }
      catch (err) {
        this.setState ({errorMsg:err.message})
    }
     
      const data=this.state.data.filter((el)=> el.id!==id)
      console.log(data);
      this.setState({ data });
   } 
   
   /****************************************************************
 * Select Record by ID
 */
    selectRecord = async (id)=>{
      
      const myData=this.state.data.find((item)=>{
        return item.id===id
      })
      await this.setState({selectedVehicle:myData})
      console.log("inside select",id, this.state.selectedVehicle.Vehicle)
      
       };
 /****************************************************************
 * Update Record by ID
 */
       updateRecord = async ()=>{
        const updatedItem= this.state.selectedVehicle
        console.log("inside update",updatedItem)
        try{
        const {data} = await CRUD.put(`Vehicles/${updatedItem.id}`, updatedItem);
        const index = this.state.data.findIndex((el) => el.id === updatedItem.id);
        const newItems = [...this.state.data];
        newItems[index] = data;
        this.setState({ data: newItems,selectedVehicle:{} });

        } catch (err) {
          this.setState ({errorMsg:err.message})
      }
      };

/****************************************************************
 * RENDER
 */
  render() {
    return (
      <div className='App'>
        {this.state.isLoading? <Spinner/> : this.displayVehicles()}
       
        <div className="newItem">
          { this.state.isNew && 
          <Form parentCallback ={this.createNew}/>
          }
          </div>
      </div>
    )
  }
}



export default App;
