import React  from 'react';
import ReactDOM from 'react-dom';
import { CoreComponent} from 'core/Core';
import { Plugin } from 'plugin/Plugin';


const App = () => {
    return (
        <div>
            <CoreComponent />
            <Plugin />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
