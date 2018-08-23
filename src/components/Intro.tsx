import * as React from "react";

import '../styles/Intro.css';

export default class Intro extends React.Component {
  render() {

    return (
      <div className="Intro">
        <p className="description">
          I am a Master's student at the University of Washington, studying <b>Computer Science & Engineering</b>.<br/>
          There, I am a member of the <b>Interactive Data Lab</b>, directed by Prof. Jeffrey Heer.<br/>
          My interests lie in <em>Data Visualization</em>, <em>Data Science</em>, and <em>User Experience Design</em>.
        </p>
      </div>
    )
  }
}