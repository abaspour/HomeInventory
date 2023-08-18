import React, { Component } from 'react';
import axios from 'axios';

export default class CreateInventory extends Component {
    constructor(props){
        super(props);

        this.onChange= this.onChange.bind(this);
        this.onChangeCategory= this.onChangeCategory.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.state = {
            userId: this.props.user._id,
            categoryId: '',
            name: 0,
            price: 0,
            categorys:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/categorys/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    categorys: response.data, //.map(category => category.categoryName),
                    categoryId: response.data[0]._id
                })

            }
        })
    }

    onChange(e){
        this.setState({
            ...this.state,[e.target.name]: e.target.value
        });
    }
    onChangeCategory(e){
        console.log(e.target.value)
        this.setState({
            ...this.state,categoryId: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const config = {
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':this.props.user.token
            }
        }
        const category = {
            userId: this.state.userId,
            categoryId: this.state.categoryId,
            name: this.state.name,
            price: this.state.price,
        }

        axios.post('http://localhost:5000/api/inventories', JSON.stringify(category),config)
        .then(res => {console.log(res.data);        window.location = '/';}        )
        .catch((err)=> {console.log(err); alert('if you are login, Please correct the form field(s)')});

    }

    render() {
        return (
        <div>
            <h3>Create New Inventory Item</h3>
            <form onSubmit={this.onSubmit}>

                <div className="form-group"> 
                <label>Category Name: </label>
                <select
                    required
                    className="form-control"
                    name="categoryName"
                    value={this.state.categoryId}
                    onChange={this.onChangeCategory}>
                    {
                        this.state.categorys.map(function(category) {
                        return <option 
                            key={category._id}
                            value={category._id}>{category.category_name}
                            </option>;
                        })
                    }
                </select>
                </div>

                <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    name="name"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.onChange(e)}
                    />
                </div> 

                <div className="form-group">
                <label>Price: </label>
                <input 
                    type="text" 
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    onChange={(e) => this.onChange(e)}
                    required
                    />
                </div>


                <div className="form-group">
                    <input type="submit" value="Create Item" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}
