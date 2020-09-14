// will help load a component only when needed

import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        // this state will be set to the dynamically loaded component
        state = {
            component: null
        }

        // the commponent that is loaded will be loaded by this method
        // once the component was mounted here by this higher order component
        componentDidMount () {
            // this should be a function reference in the end
            // returns a promise
            importComponent()
                .then(cmp => {
                    // here is where the component we want to use is loaded
                    // it is loaded into state here
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            //...this.props > return any props we might need to this component
            // set to null if C is not set yet
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;