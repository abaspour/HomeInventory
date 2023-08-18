import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../profile/edit-profile.css'

const Login = (props) =>  {
    const [formData,setFormData]=useState({
        email: '',
        password: '', 
        errors:[]
    });


    const {errors,email,password} = formData;

    const onChange =(e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        const body=JSON.stringify(formData);
        console.log(formData)
        const config = {
          headers:{
              'Content-Type':'application/json',
          }
      }
      axios.post('http://localhost:5000/api/auth', formData,config)
        .then(response => {
            let user=response.data.user;
            user.token=response.data.token;
            props.setUser(user)
            window.location = '/'
        })
        .catch((err)=> {console.log(err);
            sessionStorage.removeItem('token')
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
                            <h6 className="mb-2 text-primary">Login Form: Please Fill the form then press Login button</h6>
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
                    </div>
                    <div className="className=col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="button-container">
                        <div className="text-right te">
                                <button type="Submit" className="btn btn-primary button">Login</button>
                        </div>
                        </div>
                            <div className="text-right te">
                              Don't have an account? 
                          
                            <div className="text-right te">
                                <Link to="/register" className="my-1">SignUp</Link>
                            </div></div>
                    </div>
                    {
                      errors.map(err=>{
                        return (
                          <div className="alert alert-danger"> {err.msg}</div>
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
export default Login;