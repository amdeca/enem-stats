import React, {Component} from 'react';
//Material UI
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
//Localization
import t from '../languages/locale';

//Styles
const style = {
    Paper: {padding: 20, marginTop: 10, marginBottom: 10 }
}

class SchoolRow extends Component{
    schoolStats() {
        const url = `/schools/${this.props.school.id}`
        window.location.href = url
    }
    
    render(){
        return (
            <Paper style={style.Paper}>
                <CardContent>
                    <Typography variant="h6">{this.props.school.name}</Typography>
                    <Typography variant="subtitle1">{this.props.school.state} - {this.props.school.year}</Typography>
                    <Typography variant="caption">{this.props.school.type}</Typography>
                </CardContent>
                <Button 
                variant="contained" 
                onClick={this.schoolStats.bind(this)} 
                value="Estatisticas" 
                color="primary">
                {t('statistics')}
                </Button>
            </Paper>
            
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
