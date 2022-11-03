import * as d3 from "d3";
function DrawChart(props) {
 
    let data = props.data;
    let width = 540,
      height = 540,
      radius = 200;
  
    let arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
    let pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.count;
      });
  
    let svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    let g = svg.selectAll(".arc").data(pie(data)).enter().append("g");
  
    g.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) {
        return d.data.color;
      }).attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);
  
    g.append("text")
      .attr("transform", function (d) {
        let _d = arc.centroid(d);
        _d[0] *= 2.4; //multiply by a constant factor
        _d[1] *= 2.2; //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .text(function (d) {
        if (d.data.percentage < 8) {
          return "";
        }
        return d.data.percentage + "%";
      });

      g.append("text")
   .text(function (d) {
        return "response " + d.data.response ;
      }).attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 20).style("font-weight", "bold").style("fill", "white")

      return <div id="pie-container" style = {props.responseType ? {display: "none"}: {display: "block"}} />;

}
export default DrawChart;
