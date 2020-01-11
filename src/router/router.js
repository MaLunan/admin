import React,{Fragment,Component} from 'react';
import {BrowserRouter,NavLink,Link,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import Home from '../pages/home/home'
import Inbox from '../pages/inbox/inbox'
class App extends Component{
  render(){
    return (
     <BrowserRouter>
     <NavLink to='/login'>
     </NavLink>
     <NavLink to='/admin'></NavLink>
        <Switch>
            <Redirect exact from='/' to='admin'></Redirect>
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' render={()=>{
              return( 
                <Admin>
                  <Switch>
                    <Route path='/admin/home' component={Home}></Route>
                    <Route path='/admin/inbox' component={Inbox}></Route>
                  </Switch>
                </Admin>
              )
            }}> 
            </Route>
        </Switch>
     </BrowserRouter>
    )
  }
}

export default App;
