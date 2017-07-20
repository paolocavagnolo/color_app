// Define the unity!
var unity = 50,
    border = 10;

// Define the input file
var input_file = '[{"color_id":"#FF0000", "size_n":"5"}, {"color_id":"#00FF00", "size_n":"5"},{"color_id":"#0000FF", "size_n":"3"}, {"color_id":"#FF00FF", "size_n":"7"}, {"color_id":"#00FFFF", "size_n":"5"}, {"color_id":"#FFFF00", "size_n":"6"}]',
    palette = JSON.parse(input_file);

var colors = new Array(palette.length),
    sizes = new Array(palette.length);

for(var i=0; i < palette.length; i++) {
        colors[i] = palette[i].color_id;
        sizes[i] = palette[i].size_n;
    }

// Define the svg playground
var width_box = arrayMax(sizes)*unity,
    height_box = arrayMax(sizes)*unity + 2*unity;

var svg = d3.select("body").append("svg")
    .attr("width", width_box+border)
    .attr("height", height_box+border);

// Define the initial square
var width_e = unity,
    height_e = unity;
    x_e = unity;
    y_e = unity;

var squares = d3.range(palette.length).map(function(i) {
  return {
    x: Math.round(i*(width_e+10)),
    y: 0,
    c: palette[i].color_id,
    s: palette[i].size_n*unity
  };
});

// Define the grid
var resolution = unity;

// Draw!

svg.selectAll('.vertical')
    .data(d3.range(0, width_box / resolution + 1))
  .enter().append('line')
    .attr('class', 'vertical')
    .attr('x1', function(d) { return d * resolution; })
    .attr('y1', 2*unity)
    .attr('x2', function(d) { return d * resolution; })
    .attr('y2', height_box);


svg.selectAll('.horizontal')
    .data(d3.range(1, height_box / resolution))
  .enter().append('line')
    .attr('class', 'horizontal')
    .attr('x1', 0)
    .attr('y1', function(d) { return d * resolution + unity; })
    .attr('x2', width_box)
    .attr('y2', function(d) { return d * resolution + unity; });


svg.selectAll("rect")
  .data(squares)
  .enter().append("rect")
    .attr("x", function(d, i) { return d.x; })
    .attr("y", function(d, i) { return d.y; })
    .attr("width",width_e)
    .attr("height",height_e)
    .attr("fill",function(d, i) { return d.c; })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));


function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
  d3.select(this).attr("width", d.s).attr("height",d.s);
}

function dragged(d) {
  var x = d3.event.x,
      y = d3.event.y,
      gridX = round(Math.max(0, Math.min(width_box - d.s, x)), resolution),
      gridY = round(Math.max(2*unity, Math.min(height_box - d.s, y)), resolution);

  d3.select(this).attr("x", d.x = gridX).attr("y", d.y = gridY);
}

function dragended(d) {
  d3.select(this).classed("active", false);
}

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (Number(arr[len]) < min) {
      min = Number(arr[len]);
    }
  }
  return min;
};

function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (Number(arr[len]) > max) {
      max = Number(arr[len]);
    }
  }
  return max;
};

function submit_download_form(output_format)
{
  // Get the d3js SVG element
  var tmp = document.getElementById("body");
  var svg = tmp.getElementsByTagName("svg")[0];
  // Extract the data as SVG text string
  var svg_xml = (new XMLSerializer).serializeToString(svg);

  // Submit the <FORM> to the server.
  // The result will be an attachment file to download.
  var form = document.getElementById("svgform");
  form['output_format'].value = output_format;
  form['data'].value = svg_xml ;
  form.submit();
}

// /*
//     One-time initialization
// */
// $(document).ready(function() {

//   $("#save_as_svg").click(function() { submit_download_form("svg"); });

//   $("#save_as_pdf").click(function() { submit_download_form("pdf"); });

//   $("#save_as_png").click(function() { submit_download_form("png"); });
// });




