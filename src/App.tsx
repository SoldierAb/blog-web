import React from 'react';
import {Button} from 'antd'
import './App.css';
import {view as Login} from './views/login'
import MarkDown from './components/mark-down/MarkDown'

const App: React.FC = () => {
    return (
        <div>
            <Login></Login>
            <MarkDown></MarkDown>
        </div>
        // <div className="App">
        //   <header className="App-header">

        //     <Button type="primary">Chen</Button>
        //   </header>
        // </div>
    );
}



export default App;
