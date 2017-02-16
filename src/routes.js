import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import Timetable from './components/Timetable';
import Courses from './components/Courses';
import Login from './components/Login';


const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={Login}/>
      <Route path="/timetable" component={Timetable}/>
      <Route path="/courses" component={Courses}/>
      <Route path="/login" component={Login}/>
    </Route>
);

export default routes;
