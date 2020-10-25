import * as React from "react";
import {interpolateLab} from 'd3-interpolate';
import { StickyContainer, Sticky } from 'react-sticky';
import { configureAnchors } from 'react-scrollable-anchor'
import Waypoint from 'react-waypoint';
 
import Title from './Title';
import Intro from './Intro';
import Navbar from './Navbar';
import Experience from './Experience';
import Publications from './Publications';
import Projects from './Projects';
import QuickLinks from './QuickLinks';

import '../styles/App.css';

export default class App extends React.Component<any, any> {
  headerColorScale: any;
  quickLinksFontColorScale: any;
  headerFontColorScale: any;
  height: number;
  width: number;
  headerHeight: number;

  static MobileAppWidth = 960;

  constructor(props: any) {
    super(props)

    this.headerColorScale = interpolateLab('#ffffff', 'rgba(47, 115, 182, 0.95)')
    this.quickLinksFontColorScale = interpolateLab('#4c88ce', '#fff')
    this.headerFontColorScale = interpolateLab('#000', '#fff')

    configureAnchors({offset: -51, scrollDuration: 750})

    this.state = {
      currentSection: 'Header',
      width: window.innerWidth
    }

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.height = document.getElementById('app').clientHeight;
    this.headerHeight = document.getElementById('header').clientHeight;

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <StickyContainer>
      <div className="App" id="app">
        <Waypoint topOffset={51} bottomOffset={window.innerHeight - 52} onEnter={() => this.setState({currentSection: 'Header'})}>
          <div className="wrapper">
            <div className="header" id="header" ref="header">
              <Title />
              <Intro />
              <div className="quick-links" ref="quicklinks" style={{color: '#4c88ce'}}>
                <QuickLinks/>
              </div>
            </div>
            <div ref="navbarcontainer" style={{width: "100%"}}>
              <Sticky topOffset={this.headerHeight}>
                {
                  ({style, isSticky, distanceFromTop, distanceFromBottom}) => {
                    const backgroundPoint = this.getHeaderScale(distanceFromTop)
                    const backgroundColor = this.headerColorScale(backgroundPoint)

                    const fontPoint = this.getHeaderScale(distanceFromTop * 4)
                    const fontColor = this.headerFontColorScale(fontPoint)

                    const scrollPoint = this.getScrollScale(distanceFromTop, this.height ? this.height : 0)
                    
                    if (this.refs.header) {
                      // @ts-ignore
                      this.refs.header.style.backgroundColor = backgroundColor

                      // @ts-ignore
                      this.refs.header.style.color = fontColor;
                    }
                    
                    if (this.refs.quicklinks) {
                      // @ts-ignore
                      this.refs.quicklinks.style.color = this.quickLinksFontColorScale(fontPoint);
                    }

                    if (this.refs.navbarcontainer) {
                      // @ts-ignore
                      this.refs.navbarcontainer.style.color = this.headerFontColorScale(fontPoint);
                    }

                    return (
                      <Navbar currentSection={this.state.currentSection} style={style} isSticky={isSticky} backgroundColor={backgroundColor} progressWidth={scrollPoint}
                      backgroundPoint={backgroundPoint}/>
                    )
                  }
                }
              </Sticky>
            </div>
          </div>
        </Waypoint>
        <div className="waypoint-fix"/>
        <Waypoint topOffset={51} bottomOffset={window.innerHeight - 52} onEnter={() => this.setState({currentSection: 'publications'})}>
          <div><Publications /></div>
        </Waypoint>
        <div className="waypoint-fix"/>
        <Waypoint topOffset={51} bottomOffset={window.innerHeight - 52} onEnter={() => this.setState({currentSection: 'projects'})}>
          <div><Projects /></div>
        </Waypoint>
        <div className="waypoint-fix"/>
        { this.state.width < App.MobileAppWidth ?
            <Waypoint topOffset={51} bottomOffset={window.innerHeight - 52} onEnter={() => this.setState({currentSection: 'experience'})}>
              <div><Experience /></div>
            </Waypoint>
          :
            <div><Experience /></div>
        }
        {
          this.state.width < App.MobileAppWidth ? null :
          <Waypoint
            topOffset={window.innerHeight - 1}
            bottomOffset={0}
            onEnter={() => this.setState({currentSection: 'experience'})}
            onLeave={() => this.setState({currentSection: 'projects'})}/>
        }
      </div>
      </StickyContainer>
    )
  }

  handleResize() {
    this.headerHeight = document.getElementById('header').clientHeight;
    this.height = document.getElementById('app').clientHeight;
    this.setState({ width: window.innerWidth })
  }

  getScrollScale(distanceFromTop: number, height: number): number {
    var scrollScale = (-distanceFromTop - this.headerHeight) / (height - window.innerHeight - this.headerHeight);
    if (!scrollScale) { return 0 }
    else if (scrollScale < 0) { return 0 }
    else if (scrollScale > 1) { return 1 }
    else if (scrollScale === NaN) { return 0 }
    else { return scrollScale }
  }

  getHeaderScale(distanceFromTop: number): number {
    var headerScale = (1 -(this.headerHeight + distanceFromTop) / this.headerHeight);
    if (!headerScale) { return 0 }
    else if (headerScale < 0) { return 0 }
    else if (headerScale > 1) { return 1 }
    else if (headerScale === NaN) { return 0 }
    else { return headerScale }
  }
  
}