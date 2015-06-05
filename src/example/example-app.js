import 'babelify/polyfill';
import React from 'react';
import EasySelect from '../EasySelect.react';

const theTeams = ['Aberdeen', 'Celtic', 'Motherwell', 'Hamilton'];
let teams = Array.from(theTeams);
let OTHER = 'Other...';

function handleChange(change) {
	document.getElementById(change.target.name+'-result').innerHTML =
		'Selected value: ' + change.target.value + (change.isNewValue ? ' (new value)' : '');
}
//Example 1
React.render(
    <EasySelect name='ex1'
    options={teams}
    value={teams[1]}/>,
    document.getElementById('ex1')
);
//Example 2
React.render(
    <EasySelect name='ex2'
    options={teams}
    value={teams[1]}
    onChange={handleChange}/>,
    document.getElementById('ex2')
);
//Example 3
React.render(
    <EasySelect name='ex3'
    options={teams}
    value={teams[2]}
    allowOtherValues={true}
    onChange={handleChange}/>,
    document.getElementById('ex3')
);
//Example 4
React.render(
    <EasySelect name='ex4'
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
    document.getElementById('ex4')
);
//Example 5
React.render(
    <EasySelect name='ex5'
    options={teams}
    value={teams[3]}
    allowOtherValues={true}
    noButtons={true}
    onChange={handleChange}/>,
    document.getElementById('ex5')
);


