import React from 'react';
import {Route, IndexRedirect, Redirect} from 'react-router';

import authStore from './common/stores/AuthStore';

import App from './App';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';

function ensureLoggedIn(nextState, replace) {
    if (!authStore.isLoggedIn) {
        replace('/login');
    }
}

function ensureLoggedOut(nextState, replace) {
    if (authStore.isLoggedIn) {
        replace('/dashboard');
    }
}
/*
<Route path='/' component={App} >
        <IndexRedirect to='/dashboard'/>
        <Route path='login' onEnter={ensureLoggedOut} component={Login}/>
        <Route path='dashboard' onEnter={ensureLoggedIn} component={Dashboard}>
            <IndexRedirect to='/dashboard/comments'/>
            <Route path='comments' component={Comments}>
                <IndexRedirect to='/dashboard/comments/videos'/>
                <Route path='videos' component={CommentsVideos}/>
                <Route path='videos/:videoId' component={CommentsVideoDetail}/>
                <Route path='users/:userId' component={CommentsUserDetail}/>
                <Redirect from='*' to='/dashboard/comments/videos'/>
            </Route>
            <Redirect from='*' to='/dashboard'/>
        </Route>
        <Redirect from='*' to='/dashboard'/>
    </Route>*/

export default (
    <Route path='/' component={App} >
        <IndexRedirect to='/dashboard'/>
        <Route path='dashboard' onEnter={ensureLoggedIn} component={Dashboard}>
        </Route>
    </Route>
)

/*<Route path='dashboard' onEnter={ensureLoggedIn} component={Dashboard}>
            <IndexRedirect to='/dashboard/comments'/>
            <Route path='comments' component={Comments}>
                <IndexRedirect to='/dashboard/comments/videos'/>
                <Route path='videos' component={CommentsVideos}/>
                <Route path='videos/:videoId' component={CommentsVideoDetail}/>
                <Route path='users/:userId' component={CommentsUserDetail}/>
                <Redirect from='*' to='/dashboard/comments/videos'/>
            </Route>
            <Redirect from='*' to='/dashboard'/>
        </Route>*/