import React from 'react';
import merge from 'lodash.merge';

let mode = {
  SELECT: 'select',
  INPUT: 'input'
};
let OTHER = 'Other...';

let styles = {
  easySelect: {
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
  return <option key={i} value={option.value}>{option.text}</option>;
}

function normaliseOption(option) {
  if (typeof option === 'string') {
    return {value: option, text: option};
  } else {
    return option;
  }
}

export default class EasySelect extends React.Component {

  constructor(props) {
    super(props);
    let options = Array.from(this.props.options);
    if (this.props.allowBlank) {
      options.unshift('');
    }
    if (this.props.allowOtherValues) {
      options.push(normaliseOption(OTHER));
    }
    this.newValue = false;
    this.state = {
      mode: 'select',
      value: this.props.value,
      options: options.map(normaliseOption)
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onConfirmClicked = this.onConfirmClicked.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({options: nextProps.options.map(normaliseOption)});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onChange &&
        this.state.value !== prevState.value) {
      this.props.onChange({
        select: React.findDOMNode(this.refs.select),
        newValue: Boolean(this.newValue)
      });
    }
    this.newValue = false;
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
      if (nextOptions.map(opt => { return opt.value; }).indexOf(inputValue) === -1) {
        nextOptions.unshift(normaliseOption(inputValue));
        this.newValue = true;
      }
    }
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
      if (this.state.value !== event.target.value) {
        this.setState({
          value: event.target.value
        });        
      }
    }
  }

  renderSelect(styles) {
    return (
      <div style={styles.easySelect}>
        <select name={this.props.name}
          ref='select'
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

    let buttons;
    if (!this.props.noButtons) {
      buttons = (
        <span>
          <button type='button' style={styles.confirmButton} onClick={this.onConfirmClicked}>✔</button>
          <button type='button' style={styles.cancelButton} onClick={this.onCancelClicked}>✘</button>
        </span>
      );
    }

    return (
      <div style={styles.easySelect}>
        <input autoFocus
          type='text'
          ref='input'
          name={this.props.name}
          onKeyDown={this.onInputKeyDown}
          style={styles.input}
        />
        {buttons}
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

EasySelect.propTypes = {
  options: React.PropTypes.array.isRequired,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  styles: React.PropTypes.object,
  allowBlank: React.PropTypes.bool,
  allowOtherValues: React.PropTypes.bool,
  noButtons: React.PropTypes.bool,
  onChange: React.PropTypes.func
};