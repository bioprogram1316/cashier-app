import React, {Component} from 'react';

class Inventory extends Component {
    state = {
        inventory: [{}]
    }

    render () {
        return (
            <div>
                <button>Import Inventory</button>
                <p>Inventory List:</p>
            </div>
        );
    }
}

export default Inventory;