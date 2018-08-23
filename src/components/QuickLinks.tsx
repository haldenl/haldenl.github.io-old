import * as React from 'react';

import * as linkedInLogo from '../../images/linkedin_logo.png';
import * as githubLogo from '../../images/github_logo.png';
import * as resumeIcon from '../../images/resume_icon.svg';

import '../styles/QuickLinks.css';

export default class QuickLinks extends React.Component<any, any> {
  render() {
    const links = QuickLinks.Links
      .map((linkInfo: QuickLinkCardProps) => {
        return <QuickLinkCard {...linkInfo}/>
      })

    return (
      <div className="QuickLinks">
        {links}
      </div>
    )
  }

  static Links: QuickLinkCardProps[] = [
    {
      name: 'Resume',
      url: './static/shareables/resume.pdf',
      icon: resumeIcon
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/halden-lin/',
      icon: linkedInLogo
    },
    {
      name: 'Github',
      url: 'https://github.com/haldenl',
      icon: githubLogo
    }
  ]
}

interface QuickLinkCardProps {
  name: string;
  url: string;
  icon?: any;
}

class QuickLinkCard extends React.Component<QuickLinkCardProps, any> {
  render() {
    return (
      <a className="QuickLinkCard" href={this.props.url} target="_blank">
        { this.props.icon ? <img className="icon" src={this.props.icon} /> : null }
        <div className="name">{this.props.name}</div>
      </a>
    )
  }
}