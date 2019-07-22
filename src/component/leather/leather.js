import React from 'react';
import fetchItem from '../../classes/fetchItem'

export default class Leather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            store:[],
            name_leather: "",
            id_for_update: -1
        }
        this.changeItem = this.changeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getDataLeather = this.getDataLeather.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.resetItem = this.resetItem.bind(this);
        this.setUpdateForm = this.setUpdateForm.bind(this);
    }
    fetchItem = new fetchItem();
    componentDidMount(){
        this.getDataLeather();
    }
    getDataLeather = async () =>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/leather/GetLeather");
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
        var object_data = JSON.stringify({"Id_leather": this.state.id_for_update, "Name": this.state.name_leather});
        await this.fetchItem.update_Data("http://localhost:55739/leather/UpdateLether", object_data);
        this.setState({
            name_leather: "",
            id_for_update: -1
        })
        this.getDataLeather();
    }
    
    deleteItem = async (id) =>{
        await this.fetchItem.delete_Data("http://localhost:55739/leather/RemoveLether", `${id}`);
        this.getDataLeather();
    }
    addItem = async () =>{
        if(this.state.name_leather === ""){
            alert("Поле должно быть заполнено");
            return;
        }
        await this.fetchItem.add_Data("http://localhost:55739/leather/AddLether", `"${this.state.name_leather}"`);
        this.setState({
            name_leather: ""
        })
        this.getDataLeather();
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
                <h1>Leather</h1>
                <div className="input-group">
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
                            return <tr key={item.id_leather}>
                                <th scope="row">{item.id_leather}</th>
                                <td >{item.name}</td>
                                <td><button className="btn btn-outline-warning" onClick={() => this.setUpdateForm(item.name, item.id_leather)}>Update</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => this.deleteItem(item.id_leather)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}