'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashMerge = require('lodash.merge');

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var mode = {
  SELECT: 'select',
  INPUT: 'input'
};
var OTHER = 'Other...';

var styles = {
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
  return _react2['default'].createElement(
    'option',
    { key: i, value: option },
    option
  );
}

var SimpleSelect = (function (_React$Component) {
  function SimpleSelect(props) {
    _classCallCheck(this, SimpleSelect);

    _get(Object.getPrototypeOf(SimpleSelect.prototype), 'constructor', this).call(this, props);
    var options = Array.from(this.props.options);
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

  _inherits(SimpleSelect, _React$Component);

  _createClass(SimpleSelect, [{
    key: 'onCancelClicked',
    value: function onCancelClicked() {
      this.setState({
        mode: mode.SELECT
      });
    }
  }, {
    key: 'onConfirmClicked',
    value: function onConfirmClicked() {
      var inputValue = this.refs.input.getDOMNode().value;
      var nextValue = this.state.value;
      var nextOptions = Array.from(this.state.options);
      if ((inputValue || this.props.allowBlank) && inputValue !== nextValue) {
        nextValue = inputValue;
        if (nextOptions.indexOf(inputValue) === -1) {
          nextOptions.unshift(inputValue);
          if (this.props.onNewValue) {
            this.props.onNewValue(inputValue);
          }
        }
      }
      this.setState({
        value: nextValue,
        mode: mode.SELECT,
        options: nextOptions
      });
    }
  }, {
    key: 'onInputKeyDown',
    value: function onInputKeyDown(event) {
      switch (event.keyCode) {
        case 13:
          //Enter
          this.onConfirmClicked();
          break;
        case 27:
          //Escape
          this.onCancelClicked();
          break;
      }
    }
  }, {
    key: 'onChangeSelect',
    value: function onChangeSelect(event) {
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
  }, {
    key: 'renderSelect',
    value: function renderSelect(styles) {
      return _react2['default'].createElement(
        'div',
        { style: styles.simpleSelect },
        _react2['default'].createElement(
          'select',
          { name: this.props.name,
            value: this.state.value,
            onChange: this.onChangeSelect,
            style: styles.select
          },
          this.state.options.map(renderOption)
        )
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput(styles) {

      return _react2['default'].createElement(
        'div',
        { style: styles.simpleSelect },
        _react2['default'].createElement('input', { autoFocus: true,
          type: 'text',
          ref: 'input',
          name: this.props.name,
          onKeyDown: this.onInputKeyDown,
          style: styles.input
        }),
        _react2['default'].createElement(
          'button',
          { type: 'button', style: styles.confirmButton, onClick: this.onConfirmClicked },
          '✔'
        ),
        _react2['default'].createElement(
          'button',
          { type: 'button', style: styles.cancelButton, onClick: this.onCancelClicked },
          '✘'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var myStyles = (0, _lodashMerge2['default'])({}, styles, this.props.styles);
      if (this.state.mode === mode.SELECT) {
        return this.renderSelect(myStyles);
      }
      if (this.state.mode === mode.INPUT) {
        return this.renderInput(myStyles);
      }
    }
  }]);

  return SimpleSelect;
})(_react2['default'].Component);

exports['default'] = SimpleSelect;

SimpleSelect.propTypes = {
  name: _react2['default'].PropTypes.string,
  options: _react2['default'].PropTypes.array,
  value: _react2['default'].PropTypes.string,
  styles: _react2['default'].PropTypes.object,
  allowBlank: _react2['default'].PropTypes.bool,
  allowOtherValues: _react2['default'].PropTypes.bool,
  onNewValue: _react2['default'].PropTypes.func
};
module.exports = exports['default'];