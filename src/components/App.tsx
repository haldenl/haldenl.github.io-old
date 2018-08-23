import * as React from "react";
import {interpolateLab} from 'd3-interpolate';
import { StickyContainer, Sticky } from 'react-sticky';
import { configureAnchors } from 'react-scrollable-anchor'
 
import Title from './Title';
import Intro from './Intro';
import Navbar from './Navbar';
import Experience from './Experience';
import Publications from './Publications';
import QuickLinks from './QuickLinks';

import '../styles/App.css';

export default class App extends React.Component<any, any> {
  headerColorScale: any;
  headerFontColorScale: any;
  height: number;

  constructor(props: any) {
    super(props)

    this.headerColorScale = interpolateLab('#ffffff', '#4A90E2')
    this.headerFontColorScale = interpolateLab('#000', '#fff')

    configureAnchors({offset: -48 })
  }

  componentDidMount() {
    this.height = document.getElementById('app').clientHeight;
  }


  render() {
    return (
      <StickyContainer>
      <div className="App" id="app">
        <div className="header" ref="header">
          <Title />
          <Intro />
          <QuickLinks />
          <div style={{width: "100%"}}>
            <Sticky topOffset={290}>
              {
                ({style, isSticky, distanceFromTop, distanceFromBottom}) => {
                  const backgroundPoint = getHeaderScale(distanceFromTop)
                  const backgroundColor = this.headerColorScale(backgroundPoint)

                  const fontPoint = getHeaderScale(distanceFromTop * 4)
                  const fontColor = this.headerFontColorScale(fontPoint)

                  const scrollPoint = getScrollScale(distanceFromTop, this.height ? this.height : 0)
                  
                  if (this.refs.header) {
                    // @ts-ignore
                    this.refs.header.style.backgroundColor = backgroundColor

                    // @ts-ignore
                    this.refs.header.style.color = fontColor;
                  }

                  return (
                    <Navbar style={style} isSticky={isSticky} backgroundColor={backgroundColor} progressWidth={scrollPoint}/>
                  )
                }
              }
            </Sticky>
          </div>
        </div>
        <Publications />
        <Experience />
      </div>
      </StickyContainer>
    )
  }
}

function getHeaderScale(distanceFromTop: number): number {
  var headerScale = (1 -(290 + distanceFromTop) / 290);
  if (!headerScale) { return 0 }
  else if (headerScale < 0) { return 0 }
  else if (headerScale > 1) { return 1 }
  else if (headerScale === NaN) { return 0 }
  else { return headerScale }
}

function getScrollScale(distanceFromTop: number, height: number): number {
  var scrollScale = (-distanceFromTop - 290) / (height - window.innerHeight - 290);
  console.log(scrollScale);
  if (!scrollScale) { return 0 }
  else if (scrollScale < 0) { return 0 }
  else if (scrollScale > 1) { return 1 }
  else if (scrollScale === NaN) { return 0 }
  else { return scrollScale }
}