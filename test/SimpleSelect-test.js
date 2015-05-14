import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

import should from 'should';
let React, SimpleSelect, TestUtils, aSimpleSelect, newValue;

let teams = ['Aberdeen', 'Celtic', 'Motherwell', 'Hamilton'];
let OTHER = 'Other...';


describe('SimpleSelect', function() {

  React = require('react/addons');
  SimpleSelect = require('../src/SimpleSelect.react');
  TestUtils = React.addons.TestUtils;  


  describe('name and options', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name="homeTeam" options={teams} />
      );
    });

    it('renders the correct select', function() {
      var select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      select.getDOMNode().name.should.equal('homeTeam');
      select.getDOMNode().value.should.equal(teams[0]);
    });
    it ('renders the correct options', function() {
      var options = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'option');
      options.should.have.length(4);
      options.forEach((opt, i) => {
        opt.getDOMNode().value.should.equal(teams[i]);
      });
    });
  });

  describe('allows selection of new value', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name="homeTeam" options={teams} />
      );
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      TestUtils.Simulate.change(select, {target: {value: teams[2]}});
    });

    it('has the correct amended value', function() {
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      React.findDOMNode(select).name.should.equal('homeTeam');
      React.findDOMNode(select).value.should.equal(teams[2]);
    });
  });

  describe('name, options & value', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam' options={teams} value={teams[1]} />
      );
    });

    it('renders the correct select', function() {
      var select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      should.equal(select.getDOMNode().name, 'homeTeam');
      should.equal(select.getDOMNode().value, teams[1]);
    });
    it ('renders the correct options', function() {
      var options = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'option');
      options.should.have.length(4);
      options.forEach((opt, i) => {
        opt.getDOMNode().value.should.equal(teams[i]);
      });
    });
  });

  describe('name, options, value & allow blanks', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name="homeTeam" options={teams} value={teams[1]} allowBlank={true}/>
      );
    });

    it('renders the correct select', function() {
      var select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      should.equal(select.getDOMNode().name, 'homeTeam');
      should.equal(select.getDOMNode().value, teams[1]);
    });
    it ('renders the correct options', function() {
      var options = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'option');
      options.should.have.length(5);
      options[0].getDOMNode().value.should.equal('');
      options.slice(1).forEach((opt, i) => {
        opt.getDOMNode().value.should.equal(teams[i]);
      });
    });
  });

  describe('name, options, value & allow other values', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam' options={teams} value={teams[2]} allowOtherValues={true}/>
      );
    });

    it('renders the correct select', function() {
      var select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      select.getDOMNode().name.should.equal('homeTeam');
      select.getDOMNode().value.should.equal(teams[2]);
    });
    it ('renders the correct options', function() {
      var options = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'option');
      options.should.have.length(5);
      options[4].getDOMNode().value.should.equal(OTHER);
      options.slice(0,-1).forEach((opt, i) => {
        opt.getDOMNode().value.should.equal(teams[i]);
      });
    });
  });

  describe('name, options, value, allow blanks & allow other values', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam' options={teams} value={teams[3]} allowBlank={true} allowOtherValues={true}/>
      );
    });

    it('renders the correct select', function() {
      var select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      select.getDOMNode().name.should.equal('homeTeam');
      select.getDOMNode().value.should.equal(teams[3]);
    });
    it ('renders the correct options', function() {
      var options = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'option');
      options.should.have.length(6);
      options[0].getDOMNode().value.should.equal('');
      options[5].getDOMNode().value.should.equal(OTHER);
      options.slice(1,-1).forEach((opt, i) => {
        opt.getDOMNode().value.should.equal(teams[i]);
      });
    });
  });

  describe('select other', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam' options={teams} value={teams[2]} allowOtherValues={true}/>
      );
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      TestUtils.Simulate.change(select, {target: {value: OTHER}});
    });

    it('does not render a select', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');}).should.throw();
    });
    it('does render an input', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');}).should.not.throw();
    });
    it('does have correct input attributes', function() {
      let input = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');
      input.getDOMNode().type.should.equal('text');
      input.getDOMNode().name.should.equal('homeTeam');
    });
  });

  describe('select other and click cancel button', function() {

    before(function() {
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam' options={teams} value={teams[2]} allowOtherValues={true}/>
      );
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      TestUtils.Simulate.change(select, {target: {value: OTHER}});
      let cancelButton = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'button')[1];
      TestUtils.Simulate.click(cancelButton);

    });

    it('does not render an input', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');}).should.throw();
    });
    it('does render a select', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');}).should.not.throw();
    });
    it('does have correct select attributes', function() {
      let select = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');
      React.findDOMNode(select).name.should.equal('homeTeam');
      React.findDOMNode(select).value.should.equal(teams[2]);

    });
  });

  describe('select other, enter existing value and click confirm button', function() {

    before(function() {
      newValue = 'none';
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam'
          options={teams}
          value={teams[2]}
          allowOtherValues={true}
          onNewValue={newVal => {
            newValue = newVal;
          }}/>
      );
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      TestUtils.Simulate.change(select, {target: {value: OTHER}});
      let confirmButton = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'button')[0];
      let input = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');
      React.findDOMNode(input).value = teams[3];
      TestUtils.Simulate.click(confirmButton);

    });

    it('does not render an input', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');}).should.throw();
    });
    it('does render a select', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');}).should.not.throw();
    });
    it('does have correct select attributes', function() {
      let select = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');
      select.getDOMNode().name.should.equal('homeTeam');
      select.getDOMNode().value.should.equal(teams[3]);

    });
    it('does not emit a new value', () => {
      newValue.should.equal('none');
    });
  });

  describe('select other, enter new value and click confirm button', function() {

    before(function() {
      newValue = 'none';
      aSimpleSelect = TestUtils.renderIntoDocument(
        <SimpleSelect name='homeTeam'
          options={teams}
          value={teams[2]}
          allowOtherValues={true}
          onNewValue={newVal => {
            newValue = newVal;
          }}/>
      );
      let select = TestUtils.findRenderedDOMComponentWithTag(
        aSimpleSelect, 'select');
      TestUtils.Simulate.change(select, {target: {value: OTHER}});
      let confirmButton = TestUtils.scryRenderedDOMComponentsWithTag(
        aSimpleSelect, 'button')[0];
      let input = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');
      React.findDOMNode(input).value = 'New Team';
      TestUtils.Simulate.click(confirmButton);

    });

    it('does not render an input', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'input');}).should.throw();
    });
    it('does render a select', function() {
      (() => {TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');}).should.not.throw();
    });
    it('does have correct select attributes', function() {
      let select = TestUtils.findRenderedDOMComponentWithTag(
              aSimpleSelect, 'select');
      select.getDOMNode().name.should.equal('homeTeam');
      select.getDOMNode().value.should.equal('New Team');

    });
    it('does emit a new value', () => {
      newValue.should.equal('New Team');
    });
  });



});

