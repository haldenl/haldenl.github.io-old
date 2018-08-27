import * as React from "react";
import * as classNames from 'classnames';

import '../styles/Navbar.css';

import * as logoDark from '../../images/logo_dark.png';

interface NavbarProps {
  currentSection: string;
  style: any;
  isSticky: boolean;
  backgroundColor: string;
  progressWidth: number;
  backgroundPoint: number;
}

export default class Navbar extends React.Component<NavbarProps, any> {
  static Sections = ['experience','projects', 'publications']
  
  constructor(props: NavbarProps) {
    super(props)

    this.state = {
      hold: false
    }
  }

  render() {
    const sections = Navbar.Sections.map((section: String, i: number) => {
      const sectionClasses = classNames({
        'section': true,
        'current': section === this.props.currentSection
      })

      return (
        <a className={sectionClasses} key={i} href={`#${section}`}
        >
          <div className="section-title">
            {section}
          </div>
        </a>
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