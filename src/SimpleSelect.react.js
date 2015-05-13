import React from 'react';
import merge from 'lodash.merge';

let mode = {
  SELECT: 'select',
  INPUT: 'input'
};
let OTHER = 'Other...';

let styles = {
  simpleSelect: {
    width: 120
  },
  select: {
    width: '100%'
  },
  input: {
    width: '68%'
  },
  confirmButton: {
    width: '10%',
    color: 'green',
    paddingLeft: 2,
    paddingRight: 10
  },
  cancelButton: {
    width: '10%',
    color: 'red',
    paddingLeft: 2,
    paddingRight: 10
  }
};

function renderOption(option, i) {
  return <option key={i} value={option}>{option}</option>;
}

export default class SimpleSelect extends React.Component {

  constructor(props) {
    super(props);
    let options = Array.from(this.props.options);
    if (this.props.allowBlank) {
      options.unshift('');
    }
    if (this.props.allowOtherValues) {
      options.push(OTHER);
    }
    this.state = {
      mode: 'select',
      value: this.props.value,
      options: options
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
    let nextValue = this.state.value;
    let nextOptions = Array.from(this.state.options);
    if ((inputValue || this.props.allowBlank) && inputValue !== nextValue) {
      nextValue = inputValue;
      if (nextOptions.indexOf(inputValue) === -1) {
        nextOptions.unshift(inputValue);
        if (this.props.onNewValue) {
          console.log('Firing onNewValue'+inputValue);
          this.props.onNewValue(inputValue);
        }
      }
    }
    console.dir(nextOptions);
    this.setState({
      value: nextValue,
      mode: mode.SELECT,
      options: nextOptions
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
    return (
      <div style={styles.simpleSelect}>
        <select name={this.props.name}
          value={this.state.value}
          onChange={this.onChangeSelect}
          style={styles.select}
        >
          {this.state.options.map(renderOption)}
        </select>
      </div>
    );    
  }

  renderInput(styles) {

    return (
      <div style={styles.simpleSelect}>
        <input autoFocus
          type='text'
          ref='input'
          name={this.props.name}
          onKeyDown={this.onInputKeyDown}
          style={styles.input}
        />
        <button type='button' style={styles.confirmButton} onClick={this.onConfirmClicked}>✔</button>
        <button type='button' style={styles.cancelButton} onClick={this.onCancelClicked}>✘</button>
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
  allowOtherValues: React.PropTypes.bool,
  onNewValue: React.PropTypes.func
};