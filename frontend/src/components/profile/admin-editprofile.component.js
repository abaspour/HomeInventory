import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import './edit-profile.css'

const AdminEditProfile = (props) =>  {
    const { id } = useParams();
    const count = 0;
    const [formData,setFormData]=useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: 0, 
        status: 0,
        role: 0,
        fileName:'',
        errors:[]
    });
    const [file, setFile] = useState();

    useEffect(() => {
        const config = {
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':props.user.token

            }
        }
        const iid= props.id;
        axios.get('http://localhost:5000/api/users/'+ iid, config)
        .then(response => {
            let user=response.data
            setFormData({_id:user._id,
                firstName:user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber, 
                status: user.status,
                role: user.role,
                errors:[] })
            const i=0;
        })
        .catch((err)=> {console.log(err);
            setFormData({...formData,errors:err.response.data.errors});
            const i=0;
            // setFormData({...formData,errors:[err.response.data.msg] })
        });

    }, [count]);



    const onChange =(e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const onChangeRole =(e) =>{
        setFormData({...formData,role: e.target.value});
    }
    const onChangeStatus =(e) =>{
        setFormData({...formData,status: e.target.value});
    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
      setFormData({...formData,fileName: e.target.files[0].name });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        const config = {
            headers:{
                'x-auth-token': props.user.token
            }
        }
        if (file){
            let data=new FormData();
            data.append('file',file);
            axios.post('http://localhost:5000/api/profile/update-upload-photo/'+ formData._id, data,config);    
        }
        axios.post('http://localhost:5000/api/profile/update/'+ formData._id, formData,config)
        .then(response => {
            alert(response.data)
            })
        .catch((err)=> {console.log(err);
            if (err.response.data.errors)
            setFormData({...formData,errors:err.response.data.errors});
            else
            setFormData({...formData,errors:[err.response.data.msg] })
        });
      
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
                            <h6 className="mb-2 text-primary">Personal Details</h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" name='firstName' value={formData.firstName} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" name='lastName' value={formData.lastName} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name='email' value={formData.email} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="number" name='phoneNumber' value={formData.phoneNumber} onChange={e => onChange(e)} className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <label>Role</label>
                            <div className="form-group">
                                <select
                                required
                                name='role'
                                value={formData.role}
                                onChange={e => onChangeRole(e)} 
                                className="form-control">
                                    <option key='0' value='0'>admin</option>
                                    <option key='1' value='1'>user</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <label>Status</label>
                            <div className="form-group">
                                <select
                                required
                                name="status"
                                value={formData.status}
                                onChange={e => onChangeStatus(e)} 
                                className="form-control">
                                    <option key='0' value='0'>inActive</option>
                                    <option key='1' value='1'>Active</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label>Photo</label>
                                <input type="file" onChange={e => saveFile(e)} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="className=col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="button-container">
                        <div className="text-right te">
                            <label></label>
                                <button type="Submit" className="btn btn-primary button">Update</button>
                            </div>
                            <div className="text-right te">
                                <Link to="/user-list" className="btn btn-primary button cancel">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {
                      formData.errors.map(err=>{
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
            </div>
        </div>
    );
}
export default AdminEditProfile;