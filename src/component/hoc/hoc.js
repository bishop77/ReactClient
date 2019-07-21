import React from 'react';

function withHover(Component, url){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                store: [],
                loading : false,
                values: ""
            }
        }
        componentDidMount(){
            this.getData();
        }
        set = ()=>{
            a = [];
            a.push("app");
            this.setState({
                store: a
            });
        }
        render(){
            return(
                <Component {...this.props} store={this.state.store} set={this.set}/>
            )
        }
    }
}

export default withHover;