import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import Timetable from './components/Timetable';
import Courses from './components/Courses';


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/timetable" component ={Timetable}/>
    <Route path="/courses" component = {Courses}/>
  </Route>
);

export default routes;
