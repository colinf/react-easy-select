import 'babelify/polyfill';
import React from 'react';
import SimpleSelect from '../src/SimpleSelect.react';

let teams = ['Aberdeen', 'Celtic', 'Motherwell', 'Hamilton'];
let OTHER = 'Other...';

React.render(
    <SimpleSelect name='homeTeam' options={teams} value={teams[2]} allowOtherValues={true}/>,
    document.getElementById('ex1')
);

