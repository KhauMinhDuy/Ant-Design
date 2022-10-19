import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";

function Button1() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}

function App() {
  return (
    <>
      <Button1></Button1>
    </>
  );
}

export default App;
