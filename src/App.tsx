import React from 'react';
import {Button} from 'antd'
import './App.css';

const obj:Object = {
	"username":"jack",
	"password":"123"
},
apiUrl:string = '/blog/login';

fetch(apiUrl, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(obj)
}).then((res) => {
  if (res.status !== 200) {
      throw new Error('错误 ' + res);
  }
  return res.json().then((resJson) => resJson )
})

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary">Chen</Button>
      </header>
    </div>
  );
}



export default App;
