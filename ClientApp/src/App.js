import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './components/Home.jsx';
import { CreateQueue } from './components/CreateQueue';
import { MyQueues } from './components/MyQueues';
import { About } from './components/About';
import { Account } from './components/Account.jsx';
import { Login } from './components/Login';
import { ForgotPass } from './components/ForgotPass';
import { GeneralQueue } from './components/GeneralQueue';

import QueueList from './components/GeneralQueue';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/createqueue' component={CreateQueue} />
        <Route path='/myqueues' component={MyQueues} />
        <Route path='/about' component={About} />
        <Route path='/account' component={Account} />
        <Route path='/login' component={Login} />
        <Route path='/forgotpass' component={ForgotPass} />
        <Route path='/queue' component={GeneralQueue} />

        <Route path='/queuet' component={QueueList} />
      </Layout>
    );
  }
}
