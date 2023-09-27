import React, { Component } from "react";

export class LoadBar extends Component {
    constructor(){
        super();
        this.state = {
            loadingProgress:0,
        }
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({
                loadingProgress: this.state.loadingProgress < 100 ? this.state.loadingProgress + 10 : 100,
            })
        }, 100)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

  render() {
    return (
      <div
        className="progress"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow={this.state.loadingProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{height: '1px'}}
      >
        <div className="progress-bar" style={{width: `${this.state.loadingProgress}%`}}></div>
      </div>
    );
  }
}

export default LoadBar;
