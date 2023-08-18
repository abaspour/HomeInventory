import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Inventory = props => (
    <tr>
      {/* <td>{props.inventory.userId}</td> */}
      <td>{props.categorys.filter(category=>category._id===props.inventory.categoryId)[0].category_name
      
      }</td>
      <td>{props.inventory.name}</td>
      <td>{props.inventory.price}</td>
      <img src={"http://localhost:5000/api/files/"+props.inventory._id}  width="50" height="50"/> 
      <td>
        <Link to={"/inventory-edit/"+props.inventory._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInventory(props.inventory._id) }}>delete</a>
      </td>
    </tr>
  )
  
export default class InventoryItemsList extends Component {
    
    constructor(props) {
        super(props);

        this.deleteInventory = this.deleteInventory.bind(this);

        this.state = {inventorys: [], categorys: [] ,errors: []};
        }

    componentDidMount() {

        const config = {
            headers:{
                'Content-Type':'application/json',
                'x-auth-token': this.props.user.token
            }
        }
        axios.get('http://localhost:5000/api/categorys/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    categorys: response.data, //.map(category => category.categoryName),
                })
                axios.get('http://localhost:5000/api/inventories',config)
                  .then( response => {
                    this.setState({ inventorys : response.data})
                    })
                  .catch((err)=> {
                      console.log(err);
                      if (err.response.data.errors)
                          this.setState( { errors: err.response.data.errors});
                      else 
                         this.setState( {errors: [{msg:err.response.data.msg}] });
                      const i=0
                      });
                        
              }
        })
    }

    deleteInventory(id) {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': this.props.user.token
            }
        }
        axios.delete('http://localhost:5000/api/inventories/'+id,config)
        .then(res => console.log(res.data));

        this.setState({
            inventorys: this.state.inventorys.filter(el => el._id !== id)
        })
    }

    inventoryList() {
        return this.state.inventorys.map(currentinventory => {
            return <Inventory categorys={this.state.categorys} inventory={currentinventory} deleteInventory={this.deleteInventory} key={currentinventory._id}/>;
        })
    }

    render() {
        return (
        <div>
            <h3>All items in the Inventory  <Link className="btn btn-primary " to="/inventory-add">Add Item</Link></h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                {/* <th>UserId</th> */}
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Picture</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.inventoryList() }
            </tbody>
            </table>
            <div>
            {
                      this.state.errors.map(err=>{
                              let msg='';
                              if (err.msg==='Token is not valid' || err.msg==='No token, authorization denied') 
                                 msg='Please login or register'
                              else
                                 msg=err.msg
                              return (
                                <div className="alert alert-danger">{msg}</div>
                              );
                        })
            }
        </div>
        </div>
        )
    }
}
