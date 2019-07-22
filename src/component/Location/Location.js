import React from 'react';
import fetchItem from '../../classes/fetchItem'

export default class Location extends React.Component{
    constructor(props){
        super(props);
        this.OnSelect = this.OnSelect.bind(this);
        this.state = {
            store_Region: [],
            changeId: -1,
            store: [],
            Name_location: "",
            selectedID: 0,
            Name_change: "",
            changes: false,
            id_change_location: -1,
            hasError: false
        }

        this.add_DataRegion = this.add_DataRegion.bind(this);
        this.getData_location = this.getData_location.bind(this);
    }
    componentDidMount(){
        this.getData_region();
        this.getData_location();
    }

    fetchItem = new fetchItem();
    getData_region = async ()=>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/region/GetRegion");
        if(a.length === 0) return;
        this.setState({
            store_Region : a,
            selectedID : a[0].id_region
        });
    }
    getData_location = async()=>{
        var a = await this.fetchItem.get_Data("http://localhost:55739/Location/GetLocation");
        this.setState({
            store : a,
        });
    }
    add_DataRegion = async() => {
        if(this.state.Name_location === ""){
            alert("Поле должно быть заполнено");
            return;
        }
        if(this.state.selectedID === 0){
            alert("Заполните справочник Region");
            return;
        }
        var obj = {name: this.state.Name_location, Region: { id_region: this.state.selectedID }};
        await this.fetchItem.add_Data("http://localhost:55739/Location/AddLocation", JSON.stringify(obj));
        this.getData_location();
        this.cancel();
    }
    deleteItem = async(id)=>{
        await this.fetchItem.delete_Data("http://localhost:55739/Location/RemoveLocation", `${id}`);
        this.getData_location();
    }

    onChangeName = (e)=>{
        this.setState({
            Name_location: e.target.value
        })
    }
    OnSelect = (e) =>{
        this.setState({
            selectedID: e.target.value
        });
        
    }
    onUpdate = async () =>{
        var obj = JSON.stringify({id_location: this.state.id_change_location, name: this.state.Name_location, 
            region : { id_region: this.state.selectedID }});
        await this.fetchItem.update_Data("http://localhost:55739/Location/UpdateLocation", obj);
        this.getData_location();
        this.cancel();
    }
    cancel =()=>{
        this.setState({
            changes: false,
            Name_location:""
        })
    }
    setUpdateForm = (id, name, id_location)=>{
        this.setState({
            selectedID: id,
            Name_location: name,
            id_change_location: id_location,
            changes: true
        });
    }
    render(){
        var data;
        if(!this.state.changes){
            data = <button type="submit" className="btn btn-success" onClick={this.add_DataRegion}>Add</button>
        }
        else{
            data = <React.Fragment>
                <button className="btn btn-warning" onClick={this.onUpdate}>Save</button>
                <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
            </React.Fragment>
        }
        
        return(
            <div>
                <h1>Location</h1>
                <div className="form-group">
                    <label>Введите название площадки</label>
                    <input placeholder="Введите название" onChange={this.onChangeName} className="form-control" value={this.state.Name_location}></input>
                </div>
                <div className="form-group">
                    <label>Выберите регион</label>
                    <select onChange={this.OnSelect} className="form-control" value={this.state.selectedID}>
                        {this.state.store_Region.map(item=>{
                        return <option key={item.id_region} value={item.id_region}>{item.name}</option>
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
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.store.map((item) =>{
                            return <tr key={item.id_location}>
                                <th scope="row">{item.id_location}</th>
                                <td >{item.name}</td>
                                <td>{item.region.name}</td>
                                <td><button className="btn btn-outline-warning" onClick={() => this.setUpdateForm(item.region.id_region, item.name, item.id_location)}>Update</button></td>
                                <td><button className="btn btn-outline-danger" onClick={() => this.deleteItem(item.id_location)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>
            
        )
    }
}