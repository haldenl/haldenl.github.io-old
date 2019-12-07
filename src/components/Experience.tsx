import * as React from "react";
import * as classNames from 'classnames';
import ScrollableAnchor from 'react-scrollable-anchor';

import * as rubrikLogo from '../../images/rubrik_logo.png';
import * as googleLogo from '../../images/google_logo.svg';
import * as allenLogo from '../../images/allen_logo.png';
import * as appleLogo from '../../images/apple_logo.svg';

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
      companyName: "Apple",
      companyLogo: appleLogo,
      logoSize: 24,
      role: "Research Engineer",
      team: "Visualization & Machine Learning",
      time: "2019 - Present"
    },
    {
      companyName: "Paul G. Allen School",
      companyLogo: allenLogo,
      logoSize: 140,
      role: "Research Assistant",
      team: "Interactive Data Lab",
      time: "2017 - 2019",
    },
    {
      companyName: "Rubrik, Inc.",
      companyLogo: rubrikLogo,
      logoSize: 56,
      role: "Software Engineering Intern",
      team: "Archival",
      time: "Summer 2018",
    },
    {
      companyName: "Google",
      companyLogo: googleLogo,
      logoSize: 32,
      role: "UX Engineering Intern",
      team: "Search",
      time: "Summer 2017",
    },
    {
      companyName: "Paul G. Allen School",
      companyLogo: allenLogo,
      logoSize: 140,
      role: "Teaching Assistant",
      team: "CSE 142, 143, 311, 442, 512",
      time: "2016 - 2019",
    },
  ]
}

interface ExperienceCardProps {
  companyName: string;
  companyLogo: any;
  logoSize: number;
  role: string;
  team: string;
  time: string;
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