var margin = { top: 20, right: 20, bottom: 30, left: 40 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
var x = d3.scaleBand().range([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3
  .select("#visual")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function (error, data) {
  if (error) throw error;

  data.forEach(function (d) {
    d.Count = +d.Count;
  });

  x.domain(
    data.map(function (d) {
      return d.Sentiment;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.Count;
    }),
  ]);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return x(d.Sentiment);
    })
    .attr("width", x.bandwidth())
    .attr("y", function (d) {
      return y(d.Count);
    })
    .attr("height", function (d) {
      return height - y(d.Count);
    });

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
});
