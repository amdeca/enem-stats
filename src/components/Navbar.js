import React, { Component } from 'react';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import t from '../languages/locale';

export class Navbar extends Component {
    
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
                            {/* <Button onClick={localStorage.setItem('locale', 'en')}>PT</Button> */}
                        </div>
                        {/* <Button onClick={console.log('clicou')}>EN</Button> */}

					</Toolbar>
				</AppBar>
            </div>
        )
    }
}

export default Navbar
