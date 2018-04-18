import React, { Component } from 'react';
import './App.css';
import Card from './component/card';

class App extends Component {
  state = {
    data: [
      {
        key: 1,
        title: "Room1",
        showCheckBox: false,
        isChecked: true,
        selectBoxValue: {
          adult: 2,
          children: 0
        }
      },
      {
        key: 2,
        title: "Room2",
        showCheckBox: true,
        isChecked: false,
        selectBoxValue: {
          adult: 1,
          children: 0
        }
      },
      {
        key: 3,  
        title: "Room3",
        showCheckBox: true,
        isChecked: false,
        selectBoxValue: {
          adult: 1,
          children: 0
        }
      },
      {
        key: 4,
        title: "Room4",
        showCheckBox: true,
        isChecked: false,
        selectBoxValue: {
          adult: 1,
          children: 0
        }
      }
    ]
  }

  constructor () {
    super();
    this.submitData = this.submitData.bind(this);
    this.updateSelectBox = this.updateSelectBox.bind(this);
    this.makeNextCardsDisable = this.makeNextCardsDisable.bind(this);
    this.makePreviousCardsEnable = this.makePreviousCardsEnable.bind(this);
  }

  makePreviousCardsEnable (position) {
    const data = this.state.data.map((item, index) => {
      if (index && index <= position) {
        return { ...item, isChecked: true };
      }
      return item;
    })
    this.setState({ data });
  }
  
  makeNextCardsDisable (position) {
    const data = this.state.data.map((item, index) => {
      if (index && index >= position) {
        return { ...item, isChecked: false, selectBoxValue: { adult: 1, children: 0 } };
      }
      return item;
    })
    this.setState({ data })
  }

  updateSelectBox (value, type, position) {
    const { data } = this.state;
    data[position].selectBoxValue[type] =  value ;
    this.setState({ data })
  }

  submitData () {
    localStorage.setItem('data', JSON.stringify(this.state.data));
  }

  componentDidMount() {
    const data = localStorage.getItem('data');
    if (data) {
      this.setState({ data: JSON.parse(data) });
    }
  }

  render () {
    return ( 
      <div className="App">
        <div className="container-fluid mt-3">
          <div className="row">
            {
              this.state.data.map((item, index) => {
                return (
                  <div  className="col-sm-3" key={item.key}> 
                    <Card
                      key={item.key}
                      position={index}
                      title={item.title}
                      isChecked={item.isChecked}
                      showCheckBox={item.showCheckBox}
                      selectBoxValue={item.selectBoxValue}
                      updateSelectBox={this.updateSelectBox}
                      makeNextCardsDisable={this.makeNextCardsDisable}
                      makePreviousCardsEnable={this.makePreviousCardsEnable}
                    />
                  </div>
                )    
              })
            } 
          </div>
          <button onClick={this.submitData} className="btn btn-outline-secondary mt-3">Submit</button>   
        </div>
        
      </div>
    );
  }
}

export default App;
