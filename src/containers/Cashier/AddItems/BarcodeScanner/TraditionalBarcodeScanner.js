import React, { Component } from 'react';
import BarcodeReader from 'react-barcode-reader';
 
class TraditionalBarcodeScanner extends Component {
  state = {
      result: 'No result',
    }

  handleScan = (data) => {
    this.setState({
      result: data
    });
  }

  handleError = (err) => {
    console.error(err);
  }

  render () {
 
    return(
      <div>
        <BarcodeReader 
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }};

  export default TraditionalBarcodeScanner;