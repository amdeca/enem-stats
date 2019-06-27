import React, {Component} from 'react';

class SchoolRow extends Component{
    schoolStats() {
        //need routing to a page with all the school stats. how?
        //https://www.youtube.com/watch?v=bqSSLr8A8PU&list=PL1J2GubvF0gBkbM3R6PaQu8OY42U9flTI&index=6&t=2353s
        //const url = "http://www.google.com"
        //**IMPORTANT** CHECK ROUTES */
        const url = `/schools/${this.props.school.id}`
        window.location.href = url
    }
    
    render(){
        return (
            <div key={this.props.school.id}>
                <h4>{this.props.school.name}, {this.props.school.state} - {this.props.school.year}</h4>
                <p>{this.props.school.type}</p>

                <input type="button" onClick={this.schoolStats.bind(this)} value="Estatisticas"></input>
            </div>
        )
    }
}

export default SchoolRow;
