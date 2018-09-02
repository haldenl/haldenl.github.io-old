import * as React from "react";
import * as classNames from 'classnames';
import ScrollableAnchor from 'react-scrollable-anchor';

import * as rubrikLogo from '../../images/rubrik_logo.png';
import * as googleLogo from '../../images/google_logo.svg';
import * as allenLogo from '../../images/allen_logo.png';

import '../styles/Experience.css';

export default class Experience extends React.Component {
  render() {
    const cards = Experience.ExperienceInfo.map((experienceInfo, i) => {
      return <ExperienceCard {...experienceInfo} key={i}/>
    })

    return (
        <div className="Experience">
          <ScrollableAnchor id="experience">
            <h3 className="title">experience</h3>
          </ScrollableAnchor>
          <div className="cards">
            {cards}
          </div>
        </div>
    )
  }

  static ExperienceInfo: ExperienceCardProps[] = [
    {
      companyName: "Rubrik, Inc.",
      companyLogo: rubrikLogo,
      logoSize: 56,
      role: "Software Engineering Intern",
      team: "Archival",
      time: "Summer 2018",
      tidbit: "Designed and implemented tiered lifecycle management for data backed up to the cloud. Additionally, extended customer UI to enable access to this feature.",
      technologies: "Scala, Typescript, Angular"
    },
    {
      companyName: "Google",
      companyLogo: googleLogo,
      logoSize: 32,
      role: "UX Engineering Intern",
      team: "Search",
      time: "Summer 2017",
      tidbit: "Full-stack design (UX and software) and development of a web application (chrome extension), including accompanying server and API, hosted on Google production infrastructure.",
      technologies: "Java, Javascript, HTML, CSS"
    },
    {
      companyName: "Paul G. Allen School",
      companyLogo: allenLogo,
      logoSize: 140,
      role: "Research Assistant",
      team: "Interactive Data Lab",
      time: "2017 - 2018",
      tidbit: "Visualization Recommendation Systems (Voyager / CompassQL, Draco) and visualization for Natural Language Processing.",
      technologies: "Typescript, React, Vega-Lite, Python, HTML, SCSS"
    },
    {
      companyName: "Paul G. Allen School",
      companyLogo: allenLogo,
      logoSize: 140,
      role: "Teaching Assistant",
      team: "CSE 142, 143, 311, 512",
      time: "2016 - 2018",
      tidbit: "Held office hours, grade assignments, and led tutorials or discussion for Intro to Programming (undergrad), Foundations in Computing (undergrad), and Data Visualization (grad).",
      technologies: "Java, Javascript"

    },
    {
      companyName: "Paul G. Allen School",
      companyLogo: allenLogo,
      logoSize: 140,
      role: "Software Developer",
      team: "TA Tools",
      time: "2016 - 2018",
      tidbit: "Full-stack development of the Intro TA Tools website, used to facilitate operation of CSE 142 and 143 courses",
      technologies: "Java, Coffeescript / Javascript, HTML, SCSS"
    }
  ]
}

interface ExperienceCardProps {
  companyName: string;
  companyLogo: any;
  logoSize: number;
  role: string;
  team: string;
  time: string;
  tidbit: string;
  technologies: string;
}

interface ExperienceCardState {
  expanded: boolean;
}

class ExperienceCard extends React.Component<ExperienceCardProps, ExperienceCardState> {
  constructor(props: ExperienceCardProps) {
    super(props)

    this.state = {
      expanded: false
    }

    this.toggleDetail = this.toggleDetail.bind(this);
  }

  render() {
    const cardClass = classNames({
      'ExperienceCard': true,
      'expanded': this.state.expanded
    })

    return (
      <div className={cardClass}

        onClick={this.toggleDetail}
      >
        <div className="card">
          <div className="logo-box">
            <img className="logo" style={{maxWidth: this.props.logoSize}} src={this.props.companyLogo}/>
          </div>
          <div className="text">
            <div><b>{this.props.companyName}</b></div>
            <div className="regular-weight">{this.props.role}</div>
            <div>{this.props.team}</div>
            <div><i>{this.props.time}</i></div>
            <br/>
            <div>{this.props.tidbit}</div>
            <div className="technologies">{this.props.technologies}</div>
          </div>
        </div>
      </div>
    )
  }

  private toggleDetail() {
    this.setState({
      expanded: !this.state.expanded
    })
  }
}