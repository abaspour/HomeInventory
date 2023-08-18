import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateCategory from "./create-catagory.component";

const Category = props => {
  if (props.user.role===0) 
    return(
      <tr>
        <td><b>{props.category.category_name}</b></td>
        <td>
          <Link to={"/category-edit/"+props.category._id}>edit</Link>
        </td>
      </tr>);
  return (
  <tr>
    <td><b>{props.category.category_name}</b></td>
    <td>
    </td>
  </tr>);
}

export default class CategoryList extends Component {
constructor(props) {
  super(props)

  this.state = {
    categories: []
  };
}

componentDidMount() {
  const config = {
    headers:{
        'x-auth-token': this.props.user.token
    }
  }
  axios.get('http://localhost:5000/api/categorys/',config)
    .then(res => {
        this.setState({categories: res.data})
    })
    .catch((err) => {
        console.log(err);
    })
}

categoryList() {
    return this.state.categories.map(currentCategory => {
        return <Category category={currentCategory} key={currentCategory._id} user={this.props.user} />
    })
}

render() {
    return (
      <div>
        <h3>Logged Catagories</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Edit Category Name</th>
            </tr>
          </thead>
          <tbody>
            {this.categoryList()}
          </tbody>
        </table>
        <CreateCategory user={this.props.user}/>
      </div>
    )
  }
}