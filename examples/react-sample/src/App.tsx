import React from 'react';
import './App.css';
import FacetsUIPlugin from 'facetsui-plugin';

function App() {
  const onLoad = (payload: { ios: boolean; portrait: boolean; autoSave: boolean }) => {
    console.log(payload);
  }
  const onData = (payload: { [key: string]: any }) => {
    console.log(payload);
  };
  const [facetsUIEditor] = React.useState(
    new FacetsUIPlugin({
      uid: 'your_client_uid',
      secret: 'your_client_secret',
      container: 'facetsui-plugin-container',
      onLoad,
      onData
    })
  );

  React.useEffect(() => {
    facetsUIEditor
      .getToken(facetsUIEditor.config.uid || '', facetsUIEditor.config.secret || '')
      .then((token: string) => facetsUIEditor.startEditor(token));
    return () => {
      facetsUIEditor.dispose();
    }
  }, [facetsUIEditor]);
  return (
    <div id="facetsui-plugin-container" className="App" />
  );
}

export default App;
