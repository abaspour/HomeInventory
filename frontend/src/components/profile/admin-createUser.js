import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../profile/edit-profile.css'

const AdminCreateUser = (props) =>  {
    const [formData,setFormData]=useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '', 
        password2: '', 
        role : 1,
        status : 1,
        errors:[]
    });


    const {errors,firstName,lastName,phoneNumber,email,password,password2} = formData;

    const onChange =(e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if (password!==password2) {
          setFormData({...formData,errors:[{msg:"passwords aren't equal"}]  });
          return;
        }
        const body=JSON.stringify(formData);
        console.log(formData)
        const config = {
          headers:{
              'Content-Type':'application/json',
          }
      }
      axios.post('http://localhost:5000/api/users', formData,config)
        .then(response => {
          window.location = '/user-list'
        })
        .catch((err)=> {console.log(err);
          setFormData({...formData,errors:err.response.data.errors})});
    }

    return (
        <div>
            <div className="container">
            <div className="row gutters">
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <form onSubmit={e => onSubmit(e)} className="card h-100">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary">Personal Details: Please Fill the form then press Create button</h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name='firstName' value={firstName} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name='lastName' value={lastName} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" name='phoneNumber' value={phoneNumber} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name='email' value={email} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>password</label>
                                <input type="password" name='password' value={password} onChange={e => onChange(e)} className="form-control" required />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>confirm password</label>
                                <input type="password" name='password2' value={password2} onChange={e => onChange(e)} className="form-control" required />
                            </div>
                        </div>
                    </div>
                    <div className="className=col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="button-container">
                        <div className="text-right te">
                                <button type="Submit" className="btn btn-primary button">Create</button>
                        </div>
                        </div>
                    </div>
                    {
                      errors.map(err=>{
                        return (
                          <div className="alert alert-danger" role="alert">{err.msg}</div>
                        )
                      })
                    }
                </div>
            </form>
            </div>
            </div>
            </div>
        </div>
    );
}
export default AdminCreateUser;