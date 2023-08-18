import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props)
  
    this.onNewCategory = this.onNewCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        category_name: ""
    }
  }

  onNewCategory(e) {
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
     axios.post("http://localhost:5000/api/categorys/add", category,config)
    .then(res => {console.log(res.data);     window.location = '/category';  })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    if (this.props.user.role===0)
    return (
      <div>
        <h3>Create New Category</h3>
        <form onSubmit = {this.onSubmit}>
          <div className='form-group'>
            <label>Category Name: </label>
            <input type="text"
                  required
                  className='form-control'
                  value={this.state.category_name}
                  onChange={this.onNewCategory}
                  />
          </div>
          <div className='form-group'>
              <input type="submit" value="Create Category" className='btn btn-primary'/>
          </div>
        </form>
      </div>
    )
  }
}