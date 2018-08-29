import * as React from 'react';
import * as classNames from 'classnames';
import ScrollableAnchor from 'react-scrollable-anchor';

import '../styles/Publications.css';

import * as pdfIcon from '../../images/pdf_icon.svg';
import * as websiteIcon from '../../images/website_icon.svg';
import * as codeIcon from '../../images/code_icon.svg';

import * as attentionThumbnail from '../../images/attention_thumbnail.png';
import * as dracoThumbnail from '../../images/draco.svg';

export default class Publications extends React.Component {
  static Name = "Halden Lin"

  render() {
    const cards = Publications.PublicationsInfo.map((projectInfo, i) => {
      return <PublicationCard {...projectInfo} key={i}/>
    })

    return (
        <div className="Publications">
          <ScrollableAnchor id="publications">
            <h3 className="title">publications</h3>
          </ScrollableAnchor>
          <div className="cards">
            {cards}
          </div>
        </div>
    )
  }

  static PublicationsInfo: PublicationCardProps[] = [
    {
      name: "Draco",
      title: "Formalizing Visualization Design Knowledge as Constraints: Actionable and Extensible Models in Draco",
      type: "Conference Paper",
      conference: "IEEE InfoVis 2018",
      award: "Best Paper Award",
      authors: ["Dominik Moritz", "Chenglong Wang", "Greg L. Nelson", "Halden Lin", "Adam M. Smith", "Bill Howe", "Jeffrey Heer"],
      tidbit: "A system for defining a preference-encoded visualization design space, from which recommendations may be generated.",
      thumbnail: dracoThumbnail,
      links: {
        pdf: 'http://idl.cs.washington.edu/files/2019-Draco-InfoVis.pdf',
        website: 'https://uwdata.github.io/draco/',
        code: 'https://github.com/uwdata/draco'
      },
      width: 510,
      height: 340,
      cardType: "normal"
    },
    {
      name: "Visualizing Attention",
      title: "Visualizing Attention in Sequence-to-Sequence Summarization Models",
      type: "Poster",
      conference: "IEEE VAST 2018",
      authors: ["Halden Lin", "Tongshuang Wu", "Kanit Wongsuphasawat", "Yejin Choi", "Jeffrey Heer"],
      tidbit: "A tool for visualization the attention mechanism in Natural Language Processing sequence-to-sequence models in spite of long input or output text.",
      thumbnail: './static/gifs/attention.gif',
      links: {
        website: 'https://haldenl.github.io/attention-visualizer/',
        code: 'https://github.com/haldenl/attention-visualizer',
        pdf: './static/shareables/papers/attention-vast-2018.pdf'
      },
      width: 402,
      height: 340,
      cardType: "normal"
    },
    {
      name: "On Visualization Design + Machine Learning",
      title: "Beyond Heuristics: Learning Visualization Design",
      type: "Workshop Paper",
      conference: "VisGuides at VIS 2018",
      authors: ["Bahador Saket", "Dominik Moritz", "Halden Lin", "Victor Dibia", "Cagatay Demiralp", "Jeffrey Heer"],
      tidbit: null,
      thumbnail: null,
      links: {
        pdf: 'https://arxiv.org/pdf/1807.06641.pdf',
      },
      width: 960,
      height: 150,
      cardType: "compressed"
    }
  ]
}

interface PublicationCardProps {
  name: string;
  title: string;
  type: string;
  conference: string;
  award?: string;
  authors: string[];
  tidbit: string;
  thumbnail: any;
  links: PublicationLinks,
  width: number;
  height: number;
  cardType: 'normal' | 'compressed'
}

interface PublicationLinks {
  pdf?: string;
  website?: string;
  code?: string;
}

interface PublicationCardState {
  tooltipText: string;
}

class PublicationCard extends React.Component<PublicationCardProps, PublicationCardState> {
  constructor(props: PublicationCardProps) {
    super(props);

    this.state = {
      tooltipText: null
    }
  }

  render() {
    const classes = classNames({
      'PublicationCard': true,
      'compressed': this.props.cardType === 'compressed'
    })

    return (
      <div className={classes} style={{width: this.props.width, height: this.props.height}}>
        <div className="main">
          <div className="content">
            { this.props.name ? <div className="name">{this.props.name}</div> : null }
            { this.props.title ? <div className="paper-title">{this.props.title}</div> : null }
            <div className="type">{this.props.type}</div>
            <div className="conference">
              {this.props.conference}
              {this.props.award ? <span><span className="separator"> | </span><span className="award">{this.props.award}</span></span>: null}
            </div>
            <div className="authors">{
              this.props.authors.map((author, i) => {
                const authorName = author === Publications.Name ? <b>{author}</b> : author
                if (i === 0) {
                  return <span key={i}>{authorName}</span>
                } else {
                  return <span key={i}>, {authorName}</span>
                }
              })
            }</div>
            { this.props.tidbit ? <div className="tidbit">{this.props.tidbit}</div> : null }
          </div>
          {
            this.props.thumbnail ?
              <div className="thumbnail-box">
                <img className="thumbnail" style={{maxWidth: 120}} src={this.props.thumbnail}/>
              </div>
            : null
          }
        </div>
        <div className="resources">
          { this.props.links.pdf ?  <ResourceButton name="paper" url={this.props.links.pdf} icon={pdfIcon} /> : null }
          { this.props.links.website ?  <ResourceButton name="website" url={this.props.links.website} icon={websiteIcon} /> : null }
          { this.props.links.code ?  <ResourceButton name="code" url={this.props.links.code} icon={codeIcon} /> : null }
        </div>
      </div>
    )
  }
}

const ResourceButton = ({name, url, icon}: any) => {
  return (
    <div className="resource">
      <div className="tooltip">{name}</div>
      <a href={url} target="_blank">
        <img className="resource-icon" src={icon} />
      </a>
    </div>
  )
}
