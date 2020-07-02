### install

```sh
npm i --save facetsui-plugin
```
### or
```sh
yarn add facetsui-plugin
```
## React component with typescript
```js
import React from 'react';
import FacetsUIPlugin from 'facetsui-plugin';

function App() {
  const onData = (data: {[key: string]: any}) => {
    console.log(data);
  };
  const [muiEditor] = React.useState(
    new FacetsUIPlugin({
      uid: 'change_to_your_uid',
      secret: 'change_to_your_secret',
      container: 'facetsui-plugin-container',
      data: {/* initial project data */},
      onData})
  );

  const projectData = {/*here is a project data*/};

  const setProjectData = (project: {[key: string]: any}) => {
    muiEditor.setProject(project);
  };

  React.useEffect(() => {
    muiEditor
      .getToken(muiEditor.config.uid || "", muiEditor.config.secret || "")
      .then((token: string) => {
        // facetsUIEditor.startViewer(token); if you want to start Viewer
        muiEditor.startEditor(token);
      });
    return () => {
      muiEditor.dispose();
    }
  }, [muiEditor]);
  return (
    <React.Fragment>
      <div id="facetsui-plugin-container" />
      <button onClick={setProjectData}>Set Another Project</button>
    </React.Fragment>
  );
}

export default App;
```
