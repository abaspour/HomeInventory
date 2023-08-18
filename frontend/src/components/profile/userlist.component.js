import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td>{props.user.roleName}</td>
      <td>{props.user.statusName}</td>
      <td><img src={"http://localhost:5000/api/files/"+props.user._id}  width="50" height="50"/> </td>

      <td>
        <Link to={"/admin-edit-profile/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )
  
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {users: [] ,errors: []};
        }

    componentDidMount() {

        const config = {
            headers:{
                'Content-Type':'application/json',
                'x-auth-token': this.props.user.token
            }
        }
        axios.get('http://localhost:5000/api/users',config)
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data, errors: []
                })
            }})
        .catch((err)=> {
            console.log(err);
            if (err.response.data.errors)
                this.setState( { errors: err.response.data.errors});
            else 
                this.setState( {errors: [{msg:err.response.data.msg}] });
            const i=0
            });
    }                 
    deleteUser(id) {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': this.props.user.token
            }
        }
        axios.delete('http://localhost:5000/api/profile/'+id,config)
        .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    usersList() {
        return this.state.users.map(user => {
            if(user.status===1)
                 user.statusName='Active';
            else
                 user.statusName='Inctive';
            if(user.role===0)
                 user.roleName='Admin';
            else
                 user.roleName='User';
            return <User user={user}  deleteUser={this.deleteUser} key={user._id}/>;
        })
    }

    render() {
        return (
        <div>
            <h3>All Users   <Link className="btn btn-primary " to="/admin-create-user">Add User</Link></h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                {/* <th>UserId</th> */}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Photo</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.usersList() }
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
