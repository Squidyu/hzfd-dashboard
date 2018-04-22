import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'dva/router';
import auth from './services/auth'

//==================================================login
import Login from './components/login/Login'

//==================================================MainLayout
import MainLayout from './components/layout/MainLayout'

//==================================================UpdatePassword
import UpdatePassword from './components/user/updatepassword/Index'
//==================================================default
import Default from './components/default/Index'

//==================================================admin
import MenuAdd from './components/admin/menu/add/Index'
import MenuList from './components/admin/menu/list/Index'
import RoleAdd from './components/admin/role/add/Index'
import RoleList from './components/admin/role/list/Index'
import RoleMenu from './components/admin/role/menu/Index'
import UserAdd from './components/admin/user/add/Index'
import UserList from './components/admin/user/list/Index'
import LogManagement from './components/admin/role/logmanagement/Index'


//==================================================test
import Upload from './components/upload/Index'
import Dnd from './components/dnd/Index'

//==========================================用户列表
import UserManagement from './components/usermanagement/users/list/Index'


//检查是否登录
const requireAuth = (nextState, replace) => {
  console.log(nextState.location.pathname);
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
};


function RouterConfig({history}) {
  return (
    <Router history={history}>


      <Router path="/login" component={Login}/>

      <Route path="/user/updatepassword" component={UpdatePassword} onEnter={requireAuth}/>

      <Route path="/" component={MainLayout} onEnter={requireAuth}>


        <IndexRoute component={Default}/>

        <Route path="/admin">
          <Route path="menu/add" components={MenuAdd}/>
          <Route path="menu/list" components={MenuList}/>
          <Route path="role/list" components={RoleList}/>
          <Route path="role/add" components={RoleAdd}/>
          <Route path="role/menu" components={RoleMenu}/>
          <Route path="user/add" components={UserAdd}/>
          <Route path="user/list" components={UserList}/>
          <Route path="logmanagement/list" components={LogManagement}/>
        </Route>


        <Route path="/upload" component={Upload}/>
        <Router path="/default" component={Default}/>
        <Route path="/dnd" components={Dnd}/>

        <Route path="/usermanagement">
          <Route path="users/list" components={UserManagement}/>
        </Route>

      </Route>

    </Router>
  );
}

export default RouterConfig;
