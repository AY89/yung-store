import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import appConfig from '../appConfig';
//import authStore from '../common/stores/AuthStore';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import DashboardStore from './DashboardStore';
import CircularProgress from 'material-ui/CircularProgress';
import './Dashboard.scss';

@observer
class Dashboard extends Component {

    handleLogout() {
        // authStore.logout().then((success) => {
        //     this.props.router.replace('/login');
        // }, (error) => {
        //     this.props.router.replace('/login');
        // });
    }

    componentWillMount() {
        if (!this.store) {
            this.store = new DashboardStore();
        }

        this.store.load();
    }

    render() {
        let title =  <Link to="/dashboard" className="user-clickable">{appConfig.title[process.env.REACT_APP_ENVIRONMENT]}</Link>;
        return (
            <div className="dashboard">
                <AppBar title={title}
                            showMenuIconButton={false}
                            iconElementRight={<FlatButton onClick={this.handleLogout.bind(this)} label="Logout" />}/>
                <div>test</div>
            </div>
        );
    }
}

export default Dashboard;