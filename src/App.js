import React from "react";
import {Row} from "antd";
import InputSchemaConfigurator from "./components/InputSchemaConfigurator";
import './App.css';

class App extends React.Component{

    render() {
      return  <div className="App">
            <Row>
                <header className="App-header">
                    Input schema editor
                </header>
            </Row>
          <InputSchemaConfigurator/>
        </div>
    }

}

export default App