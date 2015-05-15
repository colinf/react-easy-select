import 'babelify/polyfill';
import React from 'react';
import EasySelect from '../EasySelect.react';

let teams = ['Aberdeen', 'Celtic', 'Motherwell', 'Hamilton'];
let OTHER = 'Other...';

function handleChange(change) {
	document.getElementById(change.select.name+'-result').innerHTML =
		'Selected value: ' + change.select.value + (change.newValue ? ' (new value)' : '');
}
//Example 1
React.render(
    <EasySelect name='ex1'
    options={teams}
    value={teams[1]}
    onChange={handleChange}/>,
    document.getElementById('ex1')
);
//Example 2
React.render(
    <EasySelect name='ex2'
    options={teams}
    value={teams[2]}
    allowOtherValues={true}
    onChange={handleChange}/>,
    document.getElementById('ex2')
);
//Example 3
React.render(
    <EasySelect name='ex3'
    options={teams}
    allowOtherValues={true}
    allowBlank
    onChange={handleChange}
    styles = {{
    	confirmButton: {
    		backgroundColor: 'green',
    		color: 'black'
    	},
    	cancelButton: {
    		backgroundColor: 'red',
    		color: 'black'
    	}
    }}/>,
    document.getElementById('ex3')
);


