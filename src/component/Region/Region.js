import React from 'react';
import fetchItem from '../../classes/fetchItem'

export default class Region extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            store:[],
            name_leather: "",
            id_for_update: -1,
            store_location: []
        }
        this.changeItem = this.changeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getDat = this.getDat.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.resetItem = this.resetItem.bind(this);
        this.setUpdateForm = this.setUpdateForm.bind(this);
    }
    fetchItem = new fetchItem();
    componentDidMount(){
        this.getDat();
    }
    getDat = async () =>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/region/GetRegion");
        this.setState({
            store : a,
        });
    }
    changeItem = (e) =>{
        e.preventDefault();
        this.setState({
            name_leather: e.target.value
        })
    }
    setUpdateForm = (item, id) =>{
        this.setState({
            id_for_update: id,
            name_leather: item
        })
    }
    updateItem = async () =>{
        if(this.state.name_leather === ""){
            alert("Поле должно быть заполнено");
            return;
        }
        var object_data = JSON.stringify({"Id_region": this.state.id_for_update, "Name": this.state.name_leather});
        var a = await this.fetchItem.update_Data("http://localhost:55739/region/UpdateRegion", object_data);
        this.setState({
            name_leather: "",
            id_for_update: -1
        })
        this.getDat();
    }
    
    deleteItem = async (id) =>{
        var a = await this.fetchItem.delete_Data("http://localhost:55739/Region/RemoveRegion", `${id}`);
        this.getDat();
    }
    addItem = async () =>{
        if(this.state.name_leather === ""){
            alert("Поле должно быть заполнено");
            return;
        }
        await this.fetchItem.add_Data("http://localhost:55739/Region/AddRegion", `"${this.state.name_leather}"`);
        this.setState({
            name_leather: ""
        })
        this.getDat();
    }
    resetItem = ()=>{
        this.setState({
            name_leather: "",
            id_for_update: -1
        })
    }

    render(){
        var data_render;
        if(this.state.id_for_update < 0){
            data_render = <React.Fragment>
                    <button className="btn btn-success" onClick={this.addItem}>Add</button>
                </React.Fragment>
        }
        else{
            data_render = <React.Fragment>
                    <button className="btn btn-warning" onClick={this.updateItem}>Update</button>
                    <button className="btn btn-danger" onClick={this.resetItem}>Cancel</button>
                </React.Fragment>
        }
        return(
            <div>
                <h1>Region</h1>
            <div className="form-group">
                <label>Region</label>
                <input className="form-control" placeholder="Введите наименование шкуры" onChange={this.changeItem} value={this.state.name_leather}></input>
                {data_render}
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.store.map((item) =>{
                        return <tr key={item.id_region}>
                            <th scope="row">{item.id_region}</th>
                            <td >{item.name}</td>
                            <td><button className="btn btn-outline-warning" onClick={() => this.setUpdateForm(item.name, item.id_region)}>Update</button></td>
                            <td><button className="btn btn-outline-danger" onClick={() => this.deleteItem(item.id_region)}>Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}