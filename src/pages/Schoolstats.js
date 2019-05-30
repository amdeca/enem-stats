import React, {Component} from 'react';
//import api from '../../api/api';

export default class Schoolstats extends Component{
    state = { school : {} };

    // async componentDidMount(){
    //     this.newFilesNotification();

    //     const storage = this.props.match.params.id;
    //     const response = await api.get(`storage/${storage}`);
    //     this.setState( {storage: response.data });
    // }    

    // uploadFile = files => {
    //     files.forEach( file => {
    //         const data = new FormData();
    //         const storageId = this.props.match.params.id;
    //         data.append('file', file);
    //         api.post(`storage/${storageId}/files`, data);
    //     });
    // };

    render(){
        return (
            <div id="storage-div">
                <header>
                    <h1>{this.state.school.title}</h1>
                </header>
                <ul>
                </ul>
            </div>
        );
    }
}

// <div key={this.props.school.id}>
//                 <h4>{this.props.school.name}, {this.props.school.state}</h4>
//                 <p>{this.props.school.type}</p>
//             </div>