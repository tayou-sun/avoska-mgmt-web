import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Test from './Test';
import { render } from '@testing-library/react';
import Order from './Components/Order/Order';
import OrderCreate from './Components/Order/Create';



export default class App extends React.Component{



render() {


  return (
    <div className="App-intro">
      <Routes>
    <Route path="/order" element={<Test  id={(this.props as any)} />}/>
    <Route path="/result" element={<Order />}/>
    <Route path="/create" element={<OrderCreate />}/>
  </Routes>
  </div>
  );
}

}