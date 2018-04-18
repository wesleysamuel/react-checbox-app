import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './card.css';

class Card extends Component {

  state = {
    data: [
      {
        primaryText: 'Adults',
        secondaryText: '(18 yr+)',
        type: 'adult',
        values: [1, 2]
      },
      {
        primaryText: 'Children',
        secondaryText: '(0 - 17)',
        type: 'children',
        values: [0, 1, 2]
      }
    ]
  }

  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.heading = this.heading.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  handleClick () {
    const {position, isChecked} = this.props;
    if(isChecked) {
      this.props.makeNextCardsDisable(position)
    } else {
      this.props.makePreviousCardsEnable(position)
    }
  }

  heading () {
    const {showCheckBox, title, isChecked} = this.props;
    return (
      <div>{
        !showCheckBox ?
          <h6 className="card-title p-b-5">{title}</h6>    
          : <div className="form-check">
            <input type="checkbox" className="form-check-input" onClick={this.handleClick} id={title} checked={isChecked} />
            <label className="form-check-label card-title" htmlFor={title}>{title}</label>
          </div>
       }
      </div>  
    )
  }

  onSelectChange (event, type) {
    this.props.updateSelectBox(event.target.value, type, this.props.position);
  }

  render () {
    const {title, isChecked, selectBoxValue} = this.props;
    return (
      <div className={`card card-bg ${isChecked ? 'card-bg' : 'disable-card-bg' }`}>
        <div className="card-body">
          {this.heading()}
          <div className={`card-text row ${isChecked ? 'inner-card-bg' : 'disable-card-bg' }`}>
            {
              this.state.data.map((item, index) => {
                return (
                  <div className="form-group col-sm-6" key={`${title}-${item.type}-${index}`}>
                    <label htmlFor={`${title}-${item.type}`}>{item.primaryText}<br />{item.secondaryText}</label>
                    <select className="form-control" id={`${title}-${item.type}`} onChange={(e) => this.onSelectChange(e, item.type)} value={selectBoxValue[item.type]} disabled={!isChecked}>
                      {
                        item.values.map((i, index1) => {
                          return (
                            <option key={index1}>{i}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                )
              })
            }  
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  isChecked: PropTypes.bool,
  position: PropTypes.number,
  cardTitle: PropTypes.string,
  showCheckBox: PropTypes.bool,
  updateSelectBox: PropTypes.func,
  makeNextCardsDisable: PropTypes.func,
  makePreviousCardsEnable: PropTypes.func
}

export default Card;
