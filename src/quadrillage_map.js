// import React, { Component } from "react";
// import { geoMercator, geoPath } from "d3-geo";
// import { feature , mesh} from "topojson-client";
// import * as d3 from 'd3';


// class Map extends React.Component {
//     constructor() {
//       super()
//       this.state = {
//         usData: null,
//         montrealData: null
//       }
//     }

//     componentWillMount() {
//         console.log("ADSDA")
//         Promise.all([
//             d3.json("https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json"),
//             d3.json("https://raw.githubusercontent.com/Edward-Son/mchacks2019/master/src/world.json")
//             ]).then(([usData, montrealData]) =>{
//                 this.setState({
//                       usData,
//                       montrealData
//                   });
//                 console.log(montrealData)
//             }).catch(err => console.log(err))
//         // d3.queue()
//         //   .defer(d3.json, "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us.json")
//         //   .defer(d3.json, "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json")
//         //   .await((error, usData, montrealData) => {
//         //       this.setState({
//         //           usData,
//         //           montrealData
//         //       });
//         //   })
//     }

//     componentDidUpdate() {
//         const svg = d3.select(this.refs.anchor),
//               { width, height } = this.props;

//         const projection = d3.geoAlbers()
//                              .scale(1280)
//                              .translate([width / 2, height / 2]);

//         const path = d3.geoPath(projection);

//         const us = this.state.usData,
//               congress = this.state.montrealData;

//         svg.append("defs").append("path")
//            .attr("id", "land")
//            .datum(feature(us, us.objects.land))
//            .attr("d", path);

//         svg.append("clipPath")
//            .attr("id", "clip-land")
//            .append("use")
//            .attr("xlink:href", "#land");

//         svg.append("g")
//            .attr("class", "districts")
//            .attr("clip-path", "url(#clip-land)")
//            .selectAll("path")
//            .data(feature(congress, congress.objects.districts).features)
//            .enter().append("path")
//            .attr("d", path)
//            .append("title")
//            .text(function(d) { return d.id; });

//         svg.append("path")
//            .attr("class", "district-boundaries")
//            .datum(mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
//            .attr("d", path);

//         svg.append("path")
//            .attr("class", "state-boundaries")
//            .datum(mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//            .attr("d", path);
//     }

//     render() {
//         const { usData, montrealData } = this.state;

//         if (!usData || !montrealData) {
//             return null;
//         }

//         return <g ref="anchor" />;
//     }
// }



// src/components/WorldMap.js

import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

class QuadrillageMap extends Component {
    constructor() {
      super()
      this.state = {
        worldData: []
      }
      this.handleCountryClick = this.handleCountryClick.bind(this);
    }
  projection() {
    return geoMercator()
      .center([-73.685358, 45.515159])
      .scale(40000)
      .translate([ 800/2 , 450/2])
  }
  handleCountryClick(countryIndex) {
    console.log("Clicked on a country: ", this.state.worldData[countryIndex].properties.tree_count)
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/Edward-Son/mchacks2019/master/src/sqrc_1000_trees.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worldData => {
          this.setState({
            worldData: feature(worldData, worldData.objects.sqrc_1000_trees).features,
          })
          console.log(this.state.worldData)
        })
      })
  }
  render() {
    return (
      <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                stroke="white"
                stroke-width='0.5'
                fill={ `rgba(255,0,0,${0.05 + this.state.worldData[i].properties.tree_count / 50000})` }
                onClick={ () => this.handleCountryClick(i) }
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default QuadrillageMap


