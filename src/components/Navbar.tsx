import * as React from "react";
import * as classNames from 'classnames';

import '../styles/Navbar.css';

interface NavbarProps {
  style: any;
  isSticky: boolean;
  backgroundColor: string;
  progressWidth: number;
}

export default class Navbar extends React.Component<NavbarProps, any> {
  static Sections = ['publications', 'experience']

  render() {
    const sections = Navbar.Sections.map((section: String, i: number) => {
      return (
        <div className="section" key={i}>
          <div className="section-title">
            {section}
          </div>
        </div>
      )
    })

    const classes = classNames({
      'Navbar': true,
      'dark': this.props.isSticky
    })

    const style = {
      ...this.props.style,
      backgroundColor: this.props.backgroundColor
    }

    return (
      <div className={classes} style={style}>
        <div className="content">
          {sections}
        </div>
        <div className="bar" style={{transform: `scaleX(${this.props.progressWidth})`}}></div>
      </div>
    )
  }
}