import React, {Component} from 'react';

class SchoolRow extends Component{
    render(){
        return <div key={this.props.school.id}>
                <h4>
                    {this.props.school.name}, {this.props.school.uf}
                </h4>
                <p>
                    {this.props.school.owner}
                </p>
      </div>
    }
}

export default SchoolRow;
