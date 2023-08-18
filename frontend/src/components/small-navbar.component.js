import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Greeting = (props) =>{
  const user = props.user;
  if (user && user.firstName && user.firstName!=='' ) 
     return (<> <li className="navbar-item"><Link to="/user" className="nav-link">Welcome {props.user.firstName+' '+props.user.lastName}</Link> </li>
               <li className="nav-item"> <Link className="nav-link" to="/logoff">Logoff</Link> </li>			</>)

  return (<></>)
 }
 const UserListAdmin = (props) =>{
  const user = props.user;
  console.log(user && user.firstName && user.firstName!=='' && user.role===0)
  if (user && user.firstName && user.firstName!=='' && user.role===0 ) 
     return ( 
       <li className="nav-item"> <Link className="nav-link" to="/user-list">Users</Link> </li>		)	

  return (<></>)
 }

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
render() {
     return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home Inventory</Link>
        <div className="collapse navbar-collapse">
            
            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="#">Page 1-1</a></li>
                    <li><a href="#">Page 1-2</a></li>
                    <li><a href="#">Page 1-3</a></li>
                </ul>
            </li>
            
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Inventory Items</Link>
          </li>
          <li className="navbar-item">
          <Link to="/category" className="nav-link">Category</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Profile</Link>
          </li>
          <UserListAdmin user={this.props.user} />          
          <Greeting user={this.props.user} />          
		      	<li className="nav-item">
		      	  <Link className="nav-link" aria-current="page" to="/register">SignUp</Link>
		      	</li>
		      	<li className="nav-item">
		      	  <Link className="nav-link" to="/login">Login</Link>
			      </li>			
		     </ul>		  
		    </div>
    </nav>
    );
  }
}