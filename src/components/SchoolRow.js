import React, {Component} from 'react';
//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import t from '../languages/locale';

const styles = {
    card: {
        display: 'flex'
    }
}

class SchoolRow extends Component{
    schoolStats() {
        const url = `/schools/${this.props.school.id}`
        window.location.href = url
    }
    
    render(){
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">{this.props.school.name}</Typography>
                    <Typography variant="h6">{this.props.school.state} - {this.props.school.year}</Typography>
                    <Typography variant="h6">{this.props.school.type}</Typography>
                </CardContent>
                <Button 
                variant="contained" 
                onClick={this.schoolStats.bind(this)} 
                value="Estatisticas" 
                color="primary">
                {t('statistics')}
                </Button>
            </Card>
            // <div key={this.props.school.id}>
            //     <h5>{this.props.school.name}</h5>
            //     <h5>{this.props.school.state} - {this.props.school.year}</h5>
            //     <h6>{this.props.school.type}</h6>
            //     {/* <input id="stats-btn" type="button" onClick={this.schoolStats.bind(this)} value="Estatisticas"></input> */}
            //     
            // </div>
        )
    }
}

export default SchoolRow;
