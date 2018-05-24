import {HashRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
import React, {Component} from 'react';
import jwt from 'jsonwebtoken';

import { Centered1000 } from './arkulpa-fec/components/Container';
import {ROLE_ADMIN, ROLE_USER} from './constants/userConstants';
import {
  Sidebar,
  SidebarLogout,
  SidebarNaviItem,
  SidebarNexGroupNavItem,
  SidebarWrapper,
} from './arkulpa-fec/components/Sidebar';
import AuthRoute from './arkulpa-fec/components/AuthRoute';
import ChangePasswordPage from './containers/ChangePasswordPage';
import ContentEdit from './containers/ContentEdit';
import ContentNew from './containers/ContentNew';
import ContentsPage from './containers/ContentsPage';
import LoginPage from './containers/LoginPage';
import MeEdit from './containers/MeEdit';
import ProjectEdit from './containers/ProjectEdit';
import ProjectNew from './containers/ProjectNew';
import ProjectSelector from './containers/ProjectSelector';
import ProjectsPage from './containers/ProjectsPage';
import RegisterPage from './containers/RegisterPage';
import RegisterSuccessPage from './containers/RegisterSuccessPage';
import SnippetEdit from './containers/SnippetEdit';
import SnippetNew from './containers/SnippetNew';
import SnippetsPage from './containers/SnippetsPage';
import UserEdit from './containers/UserEdit';
import UserNew from './containers/UserNew';
import UsersPage from './containers/UsersPage';
import config from './config.js';

const logo = require('./img/A_white.svg');
const logoLogin = require('./img/logo.svg');

function getUser() {
  let user;
  let token = config.getAuthToken();
  if (token) {
    token = token.replace('JWT ', '');
    user = jwt.decode(token);
    user.token = 'JWT ' + token;
  }
  return user;
}

export default class Navigation extends Component {
  _renderLoggedInContent = user => {
    return (
      <Centered1000>
        <Switch>
          <AuthRoute user={user} role={ROLE_ADMIN} exact path="/users" component={UsersPage} />
          <AuthRoute user={user} role={ROLE_ADMIN} exact path="/new/user" component={UserNew} />
          <AuthRoute user={user} role={ROLE_ADMIN} path="/user/:id" component={UserEdit} />
          <AuthRoute user={user} path="/me" component={MeEdit} />
          <AuthRoute user={user} path="/contents" exact component={ContentsPage} />
          <AuthRoute user={user} path="/new/content"  component={ContentNew} />
          <AuthRoute user={user} path="/content/:id" component={ContentEdit} />
          <AuthRoute user={user} path="/snippets"  component={SnippetsPage} />
          <AuthRoute user={user} path="/new/snippet" component={SnippetNew} />
          <AuthRoute user={user} path="/snippet/:id" component={SnippetEdit} />
          <AuthRoute user={user} role={ROLE_ADMIN} exact path="/projects" component={ProjectsPage} />
          <AuthRoute user={user} role={ROLE_ADMIN} exact path="/new/project" component={ProjectNew} />
          <AuthRoute user={user} role={ROLE_ADMIN} path="/project/:id" component={ProjectEdit} />
          <Redirect to="/contents" />
        </Switch>
        <ProjectSelector />
      </Centered1000>
    );
  };
  _renderSidebarContent = ({role}) => {
    return (
      <SidebarWrapper>
        <SidebarNexGroupNavItem>
          <Link to={'/contents'}>Content</Link>
        </SidebarNexGroupNavItem>
        <SidebarNaviItem>
          <Link to={'/snippets'}>Snippets</Link>
        </SidebarNaviItem>
        {role === ROLE_USER && (
          <SidebarNaviItem>
            <Link to={'/me'}>My Profile</Link>
          </SidebarNaviItem>
        )}
        {role === ROLE_ADMIN && (
          <div>
            <SidebarNaviItem>
              <Link to={'/users'}>Users</Link>
            </SidebarNaviItem>
            <SidebarNaviItem>
              <Link to={'/projects'}>Projects</Link>
            </SidebarNaviItem>
          </div>
        )}
        <SidebarLogout
          onClick={() => {
            config.logout();
            window.location.reload();
          }}>
          Logout
        </SidebarLogout>
      </SidebarWrapper>
    );
  };

  render() {
    let user = getUser();

    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/reset-password/:token" component={ChangePasswordPage} />
            <Route
              exact
              path="/login"
              render={props =>
                user ? (
                  <Redirect to={{pathname: '/users', state: {from: props.location}}} />
                ) : (
                  <LoginPage
                    {...props}
                    options={{logo: logoLogin}}
                    rerender={() => this.setState({update: Date.now()})}
                  />
                )
              }
            />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/register-success" component={RegisterSuccessPage} />
            <Sidebar logo={logo} sidebarContent={this._renderSidebarContent(user || {})}>
              {this._renderLoggedInContent(user)}
            </Sidebar>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
