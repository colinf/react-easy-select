import React from 'react';
import merge from 'lodash.merge';

let mode = {
  SELECT: 'select',
  INPUT: 'input'
};
let OTHER = 'Other...';

let styles = {
  simpleSelect: {
  },
  select: {
  },
  input: {
  }
};

function renderOption(option, i) {
  return <option key={i} value={option}>{option}</option>;
}

export default class SimpleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'select',
      value: this.props.value
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onConfirmClicked = this.onConfirmClicked.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onCancelClicked() {
    this.setState({
        mode: mode.SELECT 
    });
  }

  onConfirmClicked() {
    let inputValue = this.refs.input.getDOMNode().value;
    if (inputValue) {
      this.setState({
        value: inputValue,
        mode: mode.SELECT 
      });
    }

    this.setState({
        mode: mode.SELECT 
    });
  }

  onInputKeyDown(event) {
    switch (event.keyCode) {
      case 13: //Enter
        this.onConfirmClicked();
        break;
      case 27: //Escape
        this.onCancelClicked();
        break;
    }

  }

  onChangeSelect(event) {
    if (event.target.value === OTHER) {
      this.setState({
          mode: mode.INPUT
      });
    } else {
      this.setState({
        value: event.target.value
      });
    }
  }

  renderSelect(styles) {
    let options = Array.from(this.props.options);
    if (this.props.allowBlank) {
      options.unshift('');
    }
    if (this.props.allowOtherValues) {
      options.push(OTHER);
    }
    return (
      <div style={styles.simpleSelect}>
        <select name={this.props.name}
          value={this.state.value}
          onChange={this.onChangeSelect}
          style={styles.select}
        >
          {options.map(renderOption)}
        </select>
      </div>
    );    
  }

  renderInput(styles) {

    return (
      <div style={styles.simpleSelect}>
        <input type='text'
          ref='input'
          name={this.props.name}
          onKeyDown={this.onInputKeyDown}
          style={styles.input}
        />
        <button type='button' onClick={this.onConfirmClicked}>Y</button>
        <button type='button' onClick={this.onCancelClicked}>X</button>
      </div>
    );
  }


  render() {
    let myStyles = merge({}, styles, this.props.styles);
    if (this.state.mode === mode.SELECT) {
      return this.renderSelect(myStyles);
    }
    if (this.state.mode === mode.INPUT) {
      return this.renderInput(myStyles);
    }
  }

}

SimpleSelect.propTypes = {
  name: React.PropTypes.string,
  options: React.PropTypes.array,
  value: React.PropTypes.string,
  styles: React.PropTypes.object,
  allowBlank: React.PropTypes.bool,
  allowOtherValues: React.PropTypes.bool
};