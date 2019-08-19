import React, { Component } from 'react';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import t from '../languages/locale';

export class Navbar extends Component {
    handleEngSelection() {
        localStorage.setItem('locale', 'en');
        this.forceUpdate();
    }

    handlePtSelection() {
        localStorage.setItem('locale', 'pt');
        this.forceUpdate();
    }

    render() {
        return (
            <div>
				<AppBar>
					<Toolbar className="nav-container">
                        <Button color="inherit" href="/">
                            {t('home')}
                        </Button>
						<Button color="inherit" href="/ranking">
                            {t('ranking')}
                        </Button>

                        <div className="language-select">
                            <Button onClick={this.handleEngSelection.bind(this)}>en</Button>
                            <Button onClick={this.handlePtSelection.bind(this)}>pt</Button>                        
                        </div>

					</Toolbar>
				</AppBar>
            </div>
        )
    }
}

export default Navbar
