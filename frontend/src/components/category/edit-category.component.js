import React, { Component } from 'react';
import axios from 'axios';

export default class EditCategory extends Component {
    constructor(props) {
        super(props)
      
        this.onUpdateCategory = this.onUpdateCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            category_name: ""
        }
      }
    
      componentDidMount() {
        axios.get("http://localhost:5000/api/categorys/"+ this.props.id)
        .then(res => {
            this.setState({
                category_name: res.data.category_name
            })
        }).catch(err => {
            console.log(err)
          })
      }

      onUpdateCategory(e) {
        this.setState({
            category_name: e.target.value
        });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const category = {
          category_name: this.state.category_name
        }
        console.log(category);
        const config = {
          headers:{
              'x-auth-token': this.props.user.token
          }
         }
  
        axios.post("http://localhost:5000/api/categorys/"+this.props.id, category,config)
        .then(res => {console.log(res.data);window.location = '/category'; })
        .catch(err => {
          console.log(err)
        })
        
      }
    
      render() {
        return (
          <div>
            <h3>Update Category</h3>
            <form onSubmit = {this.onSubmit}>
              <div className='form-group'>
                <input type="text"
                      required
                      value={this.state.category_name}
                      onChange={this.onUpdateCategory}
                      />
              </div>
              <div className='form-group'>
                  <input type="submit" value="Update Category" className='btn btn-primary'/>
              </div>
            </form>
          </div>
        )
      }
    }