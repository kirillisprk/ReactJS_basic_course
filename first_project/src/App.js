import './App.css';
import {Message} from "./component/Message/Message";

const propsName = 'kirill'

function App () {
    return (
        <div className="App">
            <header className="App-header">
                <Message name={propsName}/>
            </header>
        </div>
    );
}

export default App;
