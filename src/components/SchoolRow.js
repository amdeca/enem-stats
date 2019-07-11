import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class SchoolRow extends Component{
    schoolStats() {
        const url = `/schools/${this.props.school.id}`
        window.location.href = url
    }
    
    render(){
        return (
            <div key={this.props.school.id}>
                <h5>{this.props.school.name}</h5>
                <h5>{this.props.school.state} - {this.props.school.year}</h5>
                <h6>{this.props.school.type}</h6>
                {/* <input id="stats-btn" type="button" onClick={this.schoolStats.bind(this)} value="Estatisticas"></input> */}
                <Button type="button" onClick={this.schoolStats.bind(this)} value="Estatisticas" variant="outline-primary">Estatisticas</Button>
            </div>
        )
    }
}

export default SchoolRow;
