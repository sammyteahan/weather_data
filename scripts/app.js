(function() {

  // height and width of svg
  var height  = 800,
      width   = 500;
  var padding = 50;
  
  // append a div with an id 'viz' to our wrapper div
  var viz = d3.select('.wrapper')
                    .append('svg')
                    .attr('id', 'viz')
                    .attr('height', height)
                    .attr('width', width);

  // Setting up a linear vertical scale for our data. Min value will map to height, max will be 0 (top of page)
  var yScale = d3.scale.linear()
                          .range([height, 0]);

  var xScale = d3.time.scale()
                          .range([0, width]);

  // Cool d3 time formatter/generator. Accepts a date in the format:
  // '20150412' and turns it into a date object
  var parseTime = d3.time.format('%Y%m%d');

  // api call
  d3.csv('../data/climate_data.csv', function(error, data) {

    // yMax = d3.max(data, function(element) {
    //   return parseInt(element.TMAX);
    // });

    // yMin = d3.min(data, function(element) {
    //   return parseInt(element.TMAX);
    // });

    // This does the exact same thing as the above two functions d3.max and d3.min
    yDomain = d3.extent(data, function(element) {
      return parseInt(element.TMAX);
    });

    // parse time puts it into '20140214' format
    xDomain = d3.extent(data, function (element) {
      return parseTime.parse(element.DATE);
    });

    // Plug in domains to visual scale of svg
    yScale.domain(yDomain);
    xScale.domain(xDomain);

    /**
    * Here we will end up with an array of circle svg elements. the 
    * ghost selection will be joined with the data to create elements 
    * for every value in the file/response
    */
    var dots = viz.selectAll('circle') // d3 'ghost' selection
                            .data(data)
                            .enter()
                            .append('circle'); // actually appends cirlces to the dom

    /** 
    * TMAX is the maximum temperature measured on a give day. Divide by 10 to make them reasonably sized.
    * The function(d) will iterate over the data, where d is each element in the data. 
    * There is an optional parameter for the index of the data
    *
    * You need the function call in cx and cy to tell d3 to render a different position for each element
    */
    dots.attr('r', 5)
          .attr('cx', function(d) {
            date = parseTime.parse(d.DATE);
            return xScale(date);
          })
          .attr('cy', function(d) { return yScale(d.TMAX) })
          .style('stroke', '#00ffd2')
          .style('fill', '#006bff')

  });

  console.log('script loaded');
}());