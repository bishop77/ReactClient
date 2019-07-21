import React from 'react';
import fetchItem from '../../classes/fetchItem'

export default class Animals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            store: [],
            store_location: [],
            store_Leather: [],
            selectedLocation_ID: 0,
            selectedLeather_ID: 0,
            animal_name: "",
            changes: false,
            id_update: -1
        }

    }
    fetchItem = new fetchItem();
    componentDidMount(){
        this.getData();
        this.getDataLeather();
        this.getDat();

    }
    getData = async() => {
        var a = await this.fetchItem.get_Data("http://localhost:55739/Animal/GetAnimals");
        
        this.setState({
            store : a,
        });
    }
    getDataLeather = async () =>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/leather/GetLeather");
        if(a.length === 0) return;
        this.setState({
            store_Leather : a,
            selectedLeather_ID: a[0].id_leather
        });
    }
    getDat = async()=>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/Location/GetLocation");
        if(a.length === 0) return;
        this.setState({
            store_location : a,
            selectedLocation_ID: a[0].id_location
        });
    }
    onAddItem = async() =>{

        if(this.state.animal_name === ""){
            alert("Поле должно быть заполнено");
            return;
        }
        if(this.state.selectedLeather_ID === 0){
            alert("Заполните справочник Leather");
            return;
        }
        if(this.state.selectedLocation_ID === 0){
            alert("Заполните справочник Location");
            return;
        }
        var obj = { name: this.state.animal_name, Location: { id_location: this.state.selectedLocation_ID }, Leather:{id_leather: this.state.selectedLeather_ID}};
        await this.fetchItem.add_Data("http://localhost:55739/Animal/AddAnimals", JSON.stringify(obj));
        this.getData();
        this.setState({
            animal_name: ""
        })
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    deleteItem = async(id)=>{
        var a = await this.fetchItem.delete_Data("http://localhost:55739/Animal/RemoveAnimals", `${id}`);
        this.getData();
    }

    setUpdateForm = (name, id_location, id_leather, id_animal)=>{
        this.setState({
            selectedLocation_ID: id_location,
            selectedLeather_ID: id_leather,
            animal_name: name,
            id_update: id_animal,
            changes: true
        })
    }
    onUpdateItem = async() =>{
        var obj = JSON.stringify({ id_animal: this.state.id_update, name: this.state.animal_name, location: { id_location : this.state.selectedLocation_ID}, 
            leather : { id_leather: this.state.selectedLeather_ID }});
        console.log(obj);
        await this.fetchItem.update_Data("http://localhost:55739/Animal/UpdateAnimals", obj);
        this.getData();
        this.onCancel();
    } 
    onCancel = ()=>{
        this.setState({
            animal_name: "",
            changes: false,
            id_update: -1
        })
    }
    render(){
        var data;
        if(!this.state.changes){
            data = <button className="btn btn-success" onClick={this.onAddItem}>Add</button>
        }
        else{
            data = <React.Fragment>
                <button className="btn btn-warning" onClick={this.onUpdateItem}>Update</button>
                <button className="btn btn-danger" onClick={this.onCancel}>Cancel</button>
             </React.Fragment>
        }
            return(
                <div>
                    <h1>Animals</h1>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="animal_name" type="text" className="form-control" onChange={this.onChange} value={this.state.animal_name} />
                    </div>
                    <div className="form-group">
                        <label>Leather</label>
                        <select name="selectedLeather_ID" className="form-control" value={this.state.selectedLeather_ID} onChange={this.onChange}>
                            {this.state.store_Leather.map(item=>{
                                return <option key={item.id_leather} value={item.id_leather}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <select name="selectedLocation_ID" className="form-control" value={this.state.selectedLocation_ID} onChange={this.onChange}>
                            {this.state.store_location.map(item =>{
                                return <option key={item.id_location} value={item.id_location}>{item.name}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className="form-group">
                        {data}
                    </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Region_Name</th>
                            <th scope="col">Location_Name</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.store.map((item) =>{
                            return <tr key={item.id_animal}>
                                <th scope="row">{item.id_animal}</th>
                                <td >{item.name}</td>
                                <td>{item.leather.name}</td>
                                <td>{item.location.name}</td>
                                <td><button className="btn btn-outline-warning" onClick={() => this.setUpdateForm(item.name, item.location.id_location, item.leather.id_leather, item.id_animal)}>Update</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => this.deleteItem(item.id_animal)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                </div>
            )
        }
        
    }