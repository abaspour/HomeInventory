import React, { Component } from 'react';

export default class Logoff extends Component {
    constructor(props) {
      super(props)
      props.setUser({
        firstName: '',
        lastName: '',
        _id: '',
        token: ''
         });
    }
    
    render (){
        return ( 
            <div className="alert alert-success">
                user successfuly loged off 
            </div>
    )};
}