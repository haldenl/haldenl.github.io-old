import * as React from "react";
import Typist from 'react-typist';

import '../styles/Title.css';
import * as headshot from '../../images/headshot.png';

export default class Title extends React.Component {
  render() {

    return (
      <div className="Title">
        <div className="title">
          {/* <Typist avgTypingDelay={100} stdTypingDelay={20} cursor={{show: false}}> */}
            <h1>
              <Typist.Delay ms={1000} />
              <span>Hi,</span>
              <Typist.Delay ms={250} />
              <span> I'm Halden Lin.</span>
            </h1>
          {/* </Typist> */}
        </div>
        {/* <img src={headshot} className="headshot"/> */}
      </div>
    )
  }
}