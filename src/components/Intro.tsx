import * as React from "react";

import '../styles/Intro.css';

export default class Intro extends React.Component {
  render() {

    return (
      <div className="Intro">
        <p className="description">
          I work on visualization design, engineering, and research at <b>Apple</b>.
          Prior to that, I completed my Undergraduate and Master's degrees in the <b>Paul G. Allen School</b> at the <b>University of Washington</b>.
          There, I worked with <b>Prof. Jeffrey Heer</b> and the <b>Interactive Data Lab</b> to build systems and tools for automated visualization design.<br/>
        </p>
      </div>
    )
  }
}