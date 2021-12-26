import axios from 'axios';
import React,{ Component } from 'react';

import './font-awesome/css/font-awesome.css';

import logo from './images/smartserv_logo.png';
import './App.css';

class Toots extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:[],
    }
  }

  async componentDidMount(){
    try{
      const data = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
      // console.log(data.data.products);
      const p = data.data.products;
      const t = [];
      for(const [,val] of Object.entries(p)){

        t.push([val.popularity,val.subcategory,val.title,val.price]);
        // console.log(val.popularity);
      }
      t.sort( function(a,b) { return b[0] - a[0]});
      console.log(t);
      this.setState({
        data: t
      });
    }
    catch(err){
      console.log(err);
    }
  }

  render(){
    let data = this.state.data;
    let l = [];
    let i = 0;
    data.forEach(p => {
      i += 1;
      l.push( 
        <tr> 
          <td> {i} </td>
          <td> {p[2]}</td>
          <td> {p[3]}</td>
        </tr>);
    });

    return(
      <div>
        <h3 id="dis"> Table 1.1 List of Devices with their Prices </h3>
        <table  id="tab">
          <thead>
            <tr>
              <th> SNo. </th>
              <th> Title </th>
              <th> Price </th>
            </tr>
          </thead>
          <br />
          <tbody>
            {l}
          </tbody>
        </table>
      </div>
    );
  }

}

function App() {
  return (
    <div className="App">
      <div id="top"> <img src={logo} alt="app logo" /> </div>
      <Toots />
      <div id="bottom">
        <h5> Developed by - <a href = "mailto: pranaybhatia707@gmail.com">Pranay</a></h5> 
        
      </div>
    </div>
  );
}

export default App;
