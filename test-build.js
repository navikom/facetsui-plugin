const expect = require('expect');
const jest = require('jest-mock');
const FacetsUIPlugin = require('./dist').default;
const URL = require('./dist/FacetsUIPlugin').URL;

const onData = jest.fn();
const onSaveProject = jest.fn();
const onSaveComponent = jest.fn();
const onError = jest.fn();
const onSwitchOS = jest.fn();
const onSwitchOrientation = jest.fn();

const plugin = new FacetsUIPlugin({
  container: 'test',
  onData,
  onSaveComponent,
  onSaveProject,
  onError,
  onSwitchOS,
  onSwitchOrientation
});
[
  [FacetsUIPlugin.LISTENER_ON_DATA, onData],
  [FacetsUIPlugin.LISTENER_ON_SAVE_PROJECT, onSaveProject],
  [FacetsUIPlugin.LISTENER_ON_ERROR, onError],
  [FacetsUIPlugin.LISTENER_ON_SAVE_COMPONENT, onSaveComponent],
  [FacetsUIPlugin.LISTENER_ON_SWITCH_ORIENTATION, onSwitchOrientation],
  [FacetsUIPlugin.LISTENER_ON_SWITCH_OS, onSwitchOS],

].forEach(function(item) {
  plugin.onMessage({ data: JSON.stringify([item[0], { foo: 'bar' }]), origin: URL });
  expect(item[1]).toBeCalledTimes(1);
});

