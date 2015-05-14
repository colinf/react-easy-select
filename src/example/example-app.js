import 'babelify/polyfill';
import React from 'react';
import SimpleSelect from '../SimpleSelect.react';

let teams = ['Aberdeen', 'Celtic', 'Motherwell', 'Hamilton'];
let OTHER = 'Other...';

React.render(
    <SimpleSelect name='homeTeam' options={teams} value={teams[2]} allowOtherValues={true}/>,
    document.getElementById('ex1')
);
React.render(
    <SimpleSelect name='awayTeam' options={teams} value={teams[1]} allowOtherValues={true}/>,
    document.getElementById('ex2')
);
React.render(
    <SimpleSelect name='awayTeam' options={teams} value={teams[1]} allowOtherValues={true}/>,
    document.getElementById('ex3')
);
React.render(
    <SimpleSelect name='awayTeam' options={teams} value={teams[1]} allowOtherValues={true}/>,
    document.getElementById('ex4')
);


