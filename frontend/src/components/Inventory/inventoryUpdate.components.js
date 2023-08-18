import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateInventory extends Component {
    constructor(props){
        super(props);

        this.onChange= this.onChange.bind(this);
        this.onChangeCategory= this.onChangeCategory.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
// userId,categoryId,name,price
        this.state = {
            _id: '',
            userId: '',
            categoryId: '',
            name: 0,
            price: 0,
            categorys:[],
            file: null
        }
    }

    componentDidMount(){
        const config = {
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':this.props.user.token
            }
        }
        axios.get('http://localhost:5000/api/categorys/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    categorys: response.data, //.map(category => category.categoryName),
                })
                axios.get('http://localhost:5000/api/inventories/'+this.props.id,config)
                .then(response => {
                        this.setState({
                            _id: response.data._id,
                            userId: response.data.userId,
                            categoryId: response.data.categoryId,
                            name: response.data.name,
                            price: response.data.price,
                         })
        
                })
        
            }
        })
    }
    saveFile(e){
        this.setState({
            ...this.state,file: e.target.files[0]
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
            _id: this.state._id,
            userId: this.state.userId,
            categoryId: this.state.categoryId,
            name: this.state.name,
            price: this.state.price,
        }
        if (this.state.file){
            let data=new FormData();
            data.append('file',this.state.file);
            axios.post('http://localhost:5000/api/profile/update-upload-photo/'+ this.props.id, data,config);    
        }
        axios.put('http://localhost:5000/api/inventories/'+this.props.id, JSON.stringify(category),config)
        .then(res => {console.log(res.data);        window.location = '/';}        )
        // .catch((err)=> console.err(err));

    }

    render() {
        return (
        <div>
            <h3>Update Inventory Item</h3>
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
                                <label>Photo</label>
                                <input type="file" onChange={e => this.saveFile(e)} className="form-control" />
                            </div>

                <div className="form-group">
                    <input type="submit" value="update Item" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}
