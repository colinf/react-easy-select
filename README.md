# react-easy-select
A react component that provides a simple native HTML `<select>` element which can also allow the user to enter values not in the dropdown list and supports inline styles.

## Demo
[http://colinf.github.io/react-easy-select/](http://colinf.github.io/react-easy-select/)

## Installation
Install into your project using NPM in the usual way. For example:

`npm install --save-dev react-easy-select`

## Example Usage
```javascript
React.render(
    <EasySelect name='ex1'
    options={teams}
    value={teams[1]}
    onChange={handleChange}/>,
    document.getElementById('ex1')
);

function handleChange(change) {
    if (change.newValue) {
        FluxActions.newTeamAdded(change.select.value);
    }
}
```

## Properties
- [options: React.PropTypes.array.isRequired](#options),
- [name: React.PropTypes.string](#name),
- [value: React.PropTypes.string](#value),
- [styles: React.PropTypes.object](#styles),
- [allowBlank: React.PropTypes.bool](#allowblank),
- [allowOtherValues: React.PropTypes.bool](#allowothervalues),
- [onChange: React.PropTypes.func](#onchange)

### options
An array of strings being the options to appear in the dropdown list of the select. Each elements of the array can be either of 2 formats:

- a string e.g. `"Celtic"`
- an object e.g. `{value: "Celtic, text: "Celtic Football Club"}`
 
The above options will result in the following `<option>` elements respectively:

```html
<option value="Celtic">Celtic</option>
<option value="Celtic">Celtic Football Club</option>
```

If the data being entered using your select element if optional and so you wish to include a blank value in the dropdown list, there is no need to add this to your options array. See [allowBlank](#allowblank) below.

### name
This string will be used for the name attribute of the HTML element that is rendered.

### value
This string is the value to be selected in the dropdown list.

### styles
An object containing styles to be used to supplement/override the default styles. Should use the React inline styles format. The supported keys in the object are shown below:

```javascript
let styles = {
  easySelect: {
    // styles for the surrounding div of the easy-select component
  },
  select: {
    // styles for the <select> element
  },
  input: {
    // styles for the <input> element (entry of new values)
  },
  confirmButton: {
    // styles for the confirm button (to confirm new value)
  },
  cancelButton: {
    // styles for the cancel button (to cancel new value entry)
  }
};
```

### allowBlank
A boolean. If `true` then a blank entry is added at the start of the  dropdown list. This allows the value to be reset to be blank by the user where required.
### allowOtherValues
A boolean. If `true` then an _Other..._ entry is added to the end of the dropdown list. Selecting this display an input text field to enter a value not in the dropdown.
### onChange
A handler function to be called when the selected value is changed. The function will be passed a single object in the form:

```javascript
{
    select: // the <select> DOMElement
    newValue: // boolean, true if the select.value is new
}
```







