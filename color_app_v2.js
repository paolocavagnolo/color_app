//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

var WIDTH = 1024;

var BOOMTRESH = 700,
	CHANGE = 0,
	SS_OLD = 0,
	CONTROLLO_FIRST = 1,
	SS = 0,
	primaVolta = [1,1];

var UNITY = [54,85],
	SPACE = UNITY[0]/2 - 2,
    MIDDLE_SPACE = UNITY[0] + 4,
    MAX_SIZE = 12,
    HEIGHT = MAX_SIZE*UNITY[0] + 16,
    SMALL = [UNITY[0] / 4 - 1, UNITY[1] / 4 - 1],
    boxSX = [(UNITY[0] + SPACE)*4 + MIDDLE_SPACE, 0],
	boxSY = [SMALL[0] + 3, ((UNITY[0]*1.5)+SPACE)*3 + MIDDLE_SPACE],
    boxX = [(UNITY[0] + SPACE)*4 + MIDDLE_SPACE, 0],
	boxY = [SMALL[0] + 3, ((UNITY[0]*1.5)+SPACE)*3 + MIDDLE_SPACE],
	DISTANCE = 12,
	TXT_DISTANCE = 53;


var COLORE = "",
	COLORE_SIZE = 0,
	ADD_FLAG = false;

var numEl = 0,
	squareData = [],
	squares = [],
	indexes = [],
	sizes = [],
	free = [],
	widthBox = 0,
	heightBox = 0,
	play = 0,
	frame = true,
	trovato = false,
	mX = 0,
	mY = 0;

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


var svgContainer = d3.select("#game").append("svg")
									.attr("width", WIDTH)
									.attr("height", HEIGHT)
									.call(responsivefy);


function responsivefy(svg) {
    // get container + svg aspect ratio

    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = (parseInt(container.style("width"))*0.92).toFixed(0);

        svg.attr("width", targetWidth);
        
        if (targetWidth < BOOMTRESH) {
        	primaVolta[0] = 1;
        	SS = 1;

        	//svg.attr("height", Math.round(boxY + MIDDLE_SPACE + UNITY*MAX_SIZE));
        	//TUTTO L'EXTRA!
        	if (primaVolta[SS]) {
        		svg.selectAll("#bg").remove();

        		if (play == 0) {
        			svg.append("svg:image")
		   				.attr("x",boxX[SS]-265)
		   				.attr("y",boxY[SS])
		   				.attr("width", '150%')
		   				.attr("height", '150%')
		   				.attr("xlink:href","images/img_bg.jpg")
		   				.attr("id", "bg");
        		}
        		
	        	svg.selectAll("#scritta_titolo").remove();
	        	svg.selectAll("#linea_titolo").remove();


	        	drawSquare(squareData, svg, 1);
	        	drawFrame(svg);

	        	primaVolta[SS] = 0;
		   	}
        }

        else {
        	primaVolta[1] = 1;
        	SS = 0;
        	//svg.attr("height", Math.round(targetWidth / aspect));
        	//E L'INCONTRARIO DI TUTTO
        	if (primaVolta[SS]) {
        		svg.selectAll("#bg").remove();

        		if (play == 0) {
        			svg.append("svg:image")
		   				.attr("x",boxX[SS])
		   				.attr("y",boxY[SS])
		   				.attr("width", '650px')
		   				.attr("height", '650px')
		   				.attr("xlink:href","images/img_bg.jpg")
		   				.attr("id", "bg");
        		}

        		svg.append("text")
        			.attr("x", 0)
        			.attr("y", 20)
        			.text("CAMPIONI COLORI SCELTI")
        			.attr("class","txt_sottotitolino")
        			.attr("id", "scritta_titolo");

				svg.append("line")
        			.attr("class", "linea")
        			.attr("x1", 0)
        			.attr("y1", 33)
        			.attr("x2", 353)
        			.attr("y2", 33)
        			.attr("id", "linea_titolo");

				drawSquare(squareData, svg, 1);
				drawFrame(svg);
	

        		primaVolta[SS] = 0;
        	}
        }
        if (SS) {
        	svg.attr("height", (boxSY[SS] + UNITY[SS]*6.7));
        }
        else {
        	svg.attr("height", (targetWidth / aspect));
        }
		
        if (CONTROLLO_FIRST) {
        	SS_OLD = SS;
        	CONTROLLO_FIRST = 0;
        }
    }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function lingua(lin) {

	LINGUA = lin;
}

function colore(coll) {
	if (coll == "arancione") {
		COLORE = '#FF6804';
		COLORE_SIZE = 12;
	}
	else if (coll == "bianco") {
		COLORE = '#FFFFFF';
		COLORE_SIZE = 11;
	}
	else if (coll == "blu") {
		COLORE = '#2476FF';
		COLORE_SIZE = 10;
	}
	else if (coll == "giallo") {
		COLORE = '#FFDC1E';
		COLORE_SIZE = 6;
	}
	else if (coll == "grigio") {
		COLORE = '#B0BBBD';
		COLORE_SIZE = 6;
	}
	else if (coll == "marrone") {
		COLORE = '#6C2829';
		COLORE_SIZE = 11;
	}
	else if (coll == "nero") {
		COLORE = '#000000';
		COLORE_SIZE = 4;
	}
	else if (coll == "rosa") {
		COLORE = '#FFB0F7';
		COLORE_SIZE = 4;
	}
	else if (coll == "rosso") {
		COLORE = '#FE0000';
		COLORE_SIZE = 5;
	}
	else if (coll == "verde") {
		COLORE = '#53D000';
		COLORE_SIZE = 5;
	}
	else if (coll == "viola") {
		COLORE = '#B74BFF';
		COLORE_SIZE = 5;
	}
}

function btnAdd() {

	ADD_FLAG = true;

	if (free.length > 0) {
		var n = free[0];
		free.splice(0,1);
	}
	else {
		var n = squareData.length;
	}


	if (COLORE_SIZE < 3) {
		alert("nulla di selezionato");
		return;
	}

	if (n<11) {

		var initialSquare = [];

		var selColor = COLORE,
			selLength = COLORE_SIZE;

		var newSquare = {
		      sx: [placeX(n,0),placeX(n,1)],
		      sy: [placeY(n,0),placeY(n,1)],		      
		      x: [placeX(n,0),placeX(n,1)],
		      y: [placeY(n,0),placeY(n,1)],
		      c: selColor,
		      s: parseInt(selLength), //PRIMA ERA *UNITY[SS]. adesso che l'ho modificato potrebbero essere cazzi...
		      z: n,
		      N: n,
		      i: 0
		    };


		squareData.push(newSquare);
		// for(var i=0; i < squareData.length; i++) {
		// 	if (squareData[i].y < 2*UNITY) {
		// 		initialSquare.push(squareData[i]);
		// 	}
	 	//    }
		drawSquare(squareData, svgContainer, 0);
	}

	else {
		alert("Hai selezionato il numero massimo di colori");
	}

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}

	//check consistency
	for(var i=0; i < squareData.length; i++) {
        sizes[i] = squareData[i].s*UNITY[SS];
        if (widthBox < arrayMax(sizes) && play == 1) {

        	btnPlay();
        }
    }

}

function placeX(n,ss) {
	if (ss) {
		if (n<4) {
			return n*(UNITY[ss]*3.02)+1;
		}
		else if (n<8){
			return (n-4)*(UNITY[ss]*3.02)+1;
		}
		else if (n<11){
			return (n-8)*(UNITY[ss]*3.02)+1;
		}
	}
	else {
		if (n<4) {
			return n*(UNITY[ss]+SPACE+10)+1;
		}
		else if (n<8){
			return (n-4)*(UNITY[ss]+SPACE+10)+1;
		}
		else if (n<11){
			return (n-8)*(UNITY[ss]+SPACE+10)+1;
		}
	}
	

}

function placeY(n,ss) {
	if (ss) {
		if (n<4) {
			return 0;
		}
		else if (n<8){
			return UNITY[ss] * 1.45;
		}
		else if (n<11){
			return UNITY[ss] * 2.9;
		}

	}
	else {
		if (n<4) {
			return (SMALL[ss]+DISTANCE) + TXT_DISTANCE;
		}
		else if (n<8){
			return 2*(SMALL[ss]+DISTANCE) + UNITY[ss] + (4*SPACE-6) + TXT_DISTANCE;
		}
		else if (n<11){
			return 3*(SMALL[ss]+DISTANCE) + 2*(UNITY[ss] + (4*SPACE-6)) + TXT_DISTANCE;
		}
	}
}

function hideFrame() {
	
	frame = false;
	svgContainer.selectAll(".horizontal").lower();
	svgContainer.selectAll(".vertical").lower();

}

function showFrame() {
	
	frame = true;
	svgContainer.selectAll(".horizontal").raise();
	svgContainer.selectAll(".vertical").raise();

}

//////////////////////////////////////////////////////////////////

function drawSquare(inputData, svg, resp) {

	svg.selectAll("g").remove();

    inputData.sort(function (a,b) {
    	return b.z - a.z;
    });

	var squareGroup = svg.selectAll("g")
							.data(inputData).enter()
							.append("g")
							.attr("id", function(d) { return "square_" + d.N; } )
 	if (play) {
 		resizeBox();
 	}
	

	if (!SS) {
		//re-draw shadow
		for(var i=0; i < inputData.length; i++) {
	        if (inputData[i].x[SS] >= boxX[SS]) {
	        	drawShadow(inputData[i].N, svgContainer);
	        }
	        else if (resp) {
	        	if (inputData[i].y[1] >= boxY[1]) {
		        	drawShadow(inputData[i].N, svgContainer);
		        }
	        }
	    }

		squareGroup.append("rect")
				.attr("width", function(d) { return d.i ? d.s*UNITY[SS] : UNITY[0];})
				.attr("height", function(d) { return d.i ? d.s*UNITY[SS] : UNITY[0];})
				.attr("x", function(d) { 

						if (d.i && resp) {
							d.x[SS] = (d.x[1]-boxX[1])/UNITY[1]*UNITY[0]+boxX[0];
						}
						return d.x[SS]; 

					})
				.attr("y", function(d) { 

						if (d.i && resp) {
							d.y[SS] = (d.y[1]-boxY[1])/UNITY[1]*UNITY[0]+boxY[0];
						}
						return d.y[SS]; 

					})
				.attr("fill", function(d) { return d.c; })
				.attr("id", function(d) { return "big_" + d.N; })
				.attr("class","colori")
				.style("stroke", "rgb(212, 212, 212)")
				.style("stroke-width", function(d) {return ((d.c == "#FFFFFF") && (d.x[SS] < boxX[SS])) ? "1px" : "0px"} )
				.call(d3.drag()
			        .on("start", dragstarted)
			        .on("drag", dragged)
			        .on("end", dragended));

		squareGroup.append("rect")
				.attr("width", SMALL[SS])
				.attr("height", SMALL[SS]-2)
				.attr("x", function(d) { return d.sx[SS] + UNITY[SS] - SMALL[SS] - 1; })
				.attr("y", function(d) { return d.sy[SS] - SMALL[SS] - DISTANCE; })
				.attr("fill", "#000000")
				.attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
				.attr("id",function(d) { return "small_" + d.N; })
				.attr("display",function(d) { return d.i ? "none" : "display"; });

		squareGroup.append("text")
				.attr("x", function(d) { return d.sx[SS] + UNITY[SS] - SMALL[SS] + 3; })
                .attr("y", function(d) { return d.sy[SS] - SMALL[SS] + 9 - DISTANCE })
                .text("x")
                .attr("font-family", "Dosis")
                .attr("font-size", "12px")
                .attr("fill", "#FFFFFF")
                .attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
                .attr("cursor","pointer")
                .attr("id",function(d) { return "text_" + d.N; })
                .attr("display",function(d) { return d.i ? "none" : "display"; });

		squareGroup.append("text") //TESTO SOTTO RETTANGOLI: LINGUA
				.attr("x", function(d) { return d.sx[SS]; })
                .attr("y", function(d) { return d.sy[SS] + 2 + UNITY[SS] + 18; })
                .text("ITALIANO")               
                .attr("class","txt_tassello")
                .attr("fill",function(d) { return d.i ? "#d6d6d6" : "#000000"; })
                .attr("id",function(d) { return "lingua_" + d.N; });
        squareGroup.append("text") //TESTO SOTTO RETTANGOLI: COLORE
				.attr("x", function(d) { return d.sx[SS]; })
                .attr("y", function(d) { return d.sy[SS] + 2 + UNITY[SS] + 30; })
                .text(function(d) { return code2color(d.c); })   
                .attr("class","txt_tassello")
                .attr("fill",function(d) { return d.i ? "#d6d6d6" : "#000000"; })
                .attr("font-weight","bold")
                .attr("id",function(d) { return "colore_" + d.N; });
        squareGroup.append("text") //TESTO SOTTO RETTANGOLI: SIZE
			.attr("x", function(d) { return d.sx[SS]; })
            .attr("y", function(d) { return d.sy[SS] + 2 + UNITY[SS] + 42; })
            .text(function(d) { return d.s + 'x' + d.s + " MODULI"; })
           	.attr("class","txt_tassello")
           	.attr("font-size","30px")
         	.attr("fill",function(d) { return d.i ? "#d6d6d6" : "#000000"; })
            .attr("font-weight","bold")
            .attr("id",function(d) { return "size_" + d.N; });
    }
    else {

		//re-draw shadow
		for(var i=0; i < inputData.length; i++) {
	        if (inputData[i].y[SS] >= boxY[SS]) {
	        	drawShadow(inputData[i].N, svgContainer);
	        }
	        else if (resp) {
	        	if (inputData[i].x[0] >= boxX[0]) {
		        	drawShadow(inputData[i].N, svgContainer);
		        }
	        }
	    }

    	squareGroup.append("rect")
				.attr("width", function(d) { return d.i ? d.s*UNITY[SS] : UNITY[1]*2.9;})
				.attr("height", function(d) { return d.i ? d.s*UNITY[SS] : UNITY[0]*2;})
				.attr("x", function(d) { 

						if (d.i && resp) {
							d.x[SS] = (d.x[0]-boxX[0])/UNITY[0]*UNITY[1]+boxX[1];
						}
						return d.x [SS]; 

					})
				.attr("y", function(d) { 

						if (d.i && resp) {
							d.y[SS] = (d.y[0]-boxY[0])/UNITY[0]*UNITY[1]+boxY[1];
						}
						return d.y[SS]; 

					})
				.attr("fill", function(d) { return d.c; })
				.attr("id", function(d) { return "big_" + d.N; })
				.attr("class","colori")
				.style("stroke", "rgb(212, 212, 212)")
				.style("stroke-width", function(d) {return ((d.c == "#FFFFFF") && (d.y[SS] < boxY[SS])) ? "1px" : "0px"} )
				.call(d3.drag()
				.on("start", dragstarted)
			        .on("drag", dragged)
			        .on("end", dragended));

    	squareGroup.append("text")
				.attr("x", function(d) { return d.sx[SS] + UNITY[SS]*2.9 - 20; })
                .attr("y", function(d) { return d.sy[SS] + 25; })
                .text("X")
                .attr("font-size", "30px")
                .attr("fill",function(d) { return d.c == "#000000" || d.c == "#6C2829" ? "#FFFFFF" : "#000000"; })
                .attr("cursor","pointer")
                .attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
                .attr("id",function(d) { return "text_" + d.N; })
                .attr("display",function(d) { return d.i ? "none" : "display"; });

    	squareGroup.append("text") //TESTO SOTTO RETTANGOLI: SIZE
			.attr("x", function(d) { return d.sx[SS] + UNITY[SS]*1.5 - 20; })
            .attr("y", function(d) { return d.sy[SS] + UNITY[0] + 15; })
            .text(function(d) { return d.s; })
           	.attr("font-size","50px")
           	.attr("fill",function(d) {
           		if (d.i) {
           			return "#d6d6d6";
           		}
           		else {
           			if (d.c == "#2476FF" || d.c == "#000000" || d.c == "#6C2829") {
           				return "#ffffff";
           			}
           			else {
           				return "#000000"
           			}
           		}
           	})
           	.attr("id",function(d) { return "size_" + d.N; });
    }
}


function drawShadow(inputN, svg) {

	if (!SS) {
		svg.selectAll("#square_"+inputN).append("rect")
				.attr("width", UNITY[SS])
				.attr("height", UNITY[SS])
				.attr("x", placeX(inputN,SS))
				.attr("y", placeY(inputN,SS))
				.attr("id", "shadow_" + inputN)
				.attr("class","shadow");
	}
	else {
		svg.selectAll("#square_"+inputN).append("rect")
				.attr("width", UNITY[1]*2.9)
				.attr("height", UNITY[0]*2)
				.attr("x", placeX(inputN,SS))
				.attr("y", placeY(inputN,SS))
				.attr("id", "shadow_" + inputN)
				.attr("class","shadow");
	}
	

}


function code2color(codeC) {
	if (codeC == "#FF6804") {
		return 'ARANCIONE';
	}
	else if (codeC == "#FFFFFF") {
		return 'BIANCO';
	}
	else if (codeC == "#2476FF") {
		return 'BLU';
	}
	else if (codeC == "#FFDC1E") {
		return 'GIALLO';
	}
	else if (codeC == "#B0BBBD") {
		return 'GRIGIO';
	}
	else if (codeC == "#6C2829") {
		return 'MARRONE';
	}
	else if (codeC == "#000000") {
		return 'NERO';
	}
	else if (codeC == "#FFB0F7") {
		return 'ROSA';
	}
	else if (codeC == "#FE0000") {
		return 'ROSSO';
	}
	else if (codeC == "#53D000") {
		return 'VERDE';
	}
	else if (codeC == "#B74BFF") {
		return 'VIOLA';
	}
}

function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (Number(arr[len]) > max) {
      max = Number(arr[len]);
    }
  }
  return max;
};

function removeSquare(id_r) {

	var elem = d3.select("#square_"+id_r);
	for (var i = 0; i < squareData.length; i++) {
		if (squareData[i].N == id_r) {
			var index_el = i;
		}
	};

	squareData.splice(index_el,1);
	free.push(id_r);
	free.sort(function(a, b){return a-b});

	elem.remove();

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}
	
}

////////////////////////////////////////////////////////////////

function dragstarted(d) {

	if (play == 1) {
		drawShadow(d.N, svgContainer);

		mX = d3.event.x;
		mY = d3.event.y;

		msX = d.x[SS];
		msY = d.y[SS];

		var elem = d3.select("#square_"+d.N);
		elem.raise();
		var elemRel = d3.select("#big_"+d.N);
		elemRel.raise();

		
		for (var i = 0; i < squareData.length; i++) {
			//risistema gli indici z di tutti gli elementi
			if (squareData[i].z < d.z){
			  squareData[i].z = squareData[i].z + 1;
			}
		}

		d.z = 0;
		
		//elimina i quadratini small
		svgContainer.selectAll("#small_"+d.N).attr("fill","#FFFFFF");
		svgContainer.selectAll("#text_"+d.N).attr("onclick",null).attr("cursor","default");
		svgContainer.selectAll("#size_"+d.N).raise();
	}
}

function dragged(d) {

	d3.select(this).raise();

	if (play == 1) {

		var x = d3.event.x,
		 	y = d3.event.y;

		d.x[SS] = msX + (x-mX);
		d.y[SS] = msY + (y-mY);

		if (!SS) {
			if (d.x[SS] >= boxX[SS]) {
				d3.select(this).attr("width", d.s*UNITY[SS]).attr("height", d.s*UNITY[SS]);
			}
			else {
				d3.select(this).attr("width", UNITY[SS]).attr("height", UNITY[SS]);
			}
		}
		else {
			if (d.y[SS] >= boxY[SS]) {
				d3.select(this).attr("width", d.s*UNITY[SS]).attr("height", d.s*UNITY[SS]);	
			}
			else {
				d3.select(this).attr("width", UNITY[1]*2.9).attr("height", UNITY[0]*2);
			}
		}
		
		d3.select(this).attr("x", d.x[SS]).attr("y", d.y[SS]);

	}

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}

	  
}

function dragended(d) {

	var x = d3.event.x,
	   	y = d3.event.y;


	if (play == 1) {
		if (!SS) {
			if (d.x[SS] < boxX[SS]) {
				d.i = 0;
				d3.select(this).attr("x", d.x[SS] = d.sx[SS]).attr("y", d.y[SS] = d.sy[SS]);
				d3.select(this).attr("width", UNITY[SS]).attr("height", UNITY[SS]);
				svgContainer.selectAll("#small_"+d.N).attr("fill","#000000").attr("display","display");
				svgContainer.selectAll("#text_"+d.N).attr("onclick",function(d) { return "removeSquare("+d.N+")"; }).attr("cursor","pointer").attr("display","display");
				if (d.c == "#FFFFFF") {
					svgContainer.selectAll("#big_"+d.N).style("stroke-width","1px");
				}
				svgContainer.selectAll("#lingua_"+d.N).style("fill","#000000");
				svgContainer.selectAll("#colore_"+d.N).style("fill","#000000");
				svgContainer.selectAll("#size_"+d.N).style("fill","#000000");
				svgContainer.selectAll("#big_"+d.N).raise();
			}
			else {
				d.i = 1;
				d.x[SS] = round(Math.max(0, Math.min(widthBox - d.s*UNITY[SS], d.x[SS]-boxX[SS])),UNITY[SS])+boxX[SS];
				d.y[SS] = round(Math.max(0, Math.min(heightBox - d.s*UNITY[SS], d.y[SS]-boxY[SS])),UNITY[SS])+boxY[SS];
				d3.select(this).attr("x", d.x[SS]).attr("y", d.y[SS]);
				if (d.c == "#FFFFFF") {
					svgContainer.selectAll("#big_"+d.N).style("stroke-width","0px");
				}
				svgContainer.selectAll("#lingua_"+d.N).style("fill","#d6d6d6");
				svgContainer.selectAll("#colore_"+d.N).style("fill","#d6d6d6");
				svgContainer.selectAll("#size_"+d.N).style("fill","#d6d6d6");
			}
		}
		else {
			if (d.y[SS] < boxY[SS]) {
				d.i = 0;
				d3.select(this).attr("x", d.x[SS] = d.sx[SS]).attr("y", d.y[SS] = d.sy[SS]);
				d3.select(this).attr("width", UNITY[1]*2.9).attr("height", UNITY[0]*2);
				svgContainer.selectAll("#small_"+d.N).attr("fill","#000000").attr("display","display");
				svgContainer.selectAll("#text_"+d.N).attr("onclick",function(d) { return "removeSquare("+d.N+")"; }).attr("cursor","pointer").attr("display","display");
				if (d.c == "#FFFFFF") {
					svgContainer.selectAll("#big_"+d.N).style("stroke-width","1px");
				}
				svgContainer.selectAll("#big_"+d.N).raise();
				svgContainer.selectAll("#lingua_"+d.N).style("fill","#000000");
				svgContainer.selectAll("#colore_"+d.N).style("fill","#000000");
				svgContainer.selectAll("#size_"+d.N).style("fill",function(d) {return (d.c == "#2476FF" || d.c == "#000000" || d.c == "#6C2829") ? "#ffffff" : "#000000"}).raise();
				svgContainer.selectAll("#text_"+d.N).style("fill","#000000").raise();


				
			}
			else {
				d.i = 1;
				d.x[SS] = round(Math.max(0, Math.min(widthBox - d.s*UNITY[SS], d.x[SS]-boxX[SS])),UNITY[SS])+boxX[SS];
				d.y[SS] = round(Math.max(0, Math.min(heightBox - d.s*UNITY[SS], d.y[SS]-boxY[SS])),UNITY[SS])+boxY[SS];
				d3.select(this).attr("x", d.x[SS]).attr("y", d.y[SS]);
				if (d.c == "#FFFFFF") {
					svgContainer.selectAll("#big_"+d.N).style("stroke-width","0px");
				}
				svgContainer.selectAll("#lingua_"+d.N).style("fill","#d6d6d6");
				svgContainer.selectAll("#colore_"+d.N).style("fill","#d6d6d6");
				svgContainer.selectAll("#size_"+d.N).style("fill","#d6d6d6");
			}
		}
		
	}
	

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}


}


function btnPlay() {

	if (!ADD_FLAG) {
		alert("seleziona almeno un colore");
		return;
	} 

	play = 1;

	svgContainer.selectAll("#bg").remove();


    drawFrame(svgContainer);


   	for(var i=0; i < squareData.length; i++) {
        if (squareData[i].s*UNITY[SS] == widthBox && trovato == false) {

        	squareData[i].i = 1;
        	d3.select("#big_"+squareData[i].N)
        			.attr("x",squareData[i].x[SS] = boxX[SS])
        			.attr("y",squareData[i].y[SS] = boxY[SS])
        			.attr("width",widthBox)
        			.attr("height",widthBox);
        	d3.select("#small_"+squareData[i].N)
        			.attr("fill","#FFFFFF");
        	d3.select("#text_"+squareData[i].N)
        			.attr("onclick",null)
        			.attr("cursor","default");

        	drawShadow(squareData[i].N, svgContainer);

        	svgContainer.selectAll("#square_"+squareData[i].N).raise();

			d3.select("#lingua_"+squareData[i].N).style("fill","#d6d6d6");
			d3.select("#colore_"+squareData[i].N).style("fill","#d6d6d6");
			d3.select("#size_"+squareData[i].N).style("fill","#d6d6d6").raise();
			//d3.select("#text_"+squareData[i].N).raise();

        	trovato = true;

        }
    }

    trovato = false;

 	

    if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}
}

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

function resizeBox() {
	sizes = [];

    for(var i=0; i < squareData.length; i++) {
        sizes[i] = squareData[i].s;
    }

	widthBox = arrayMax(sizes)*UNITY[SS];
   	heightBox = arrayMax(sizes)*UNITY[SS];

   	boxX[SS] = boxSX[SS] + Math.floor((MAX_SIZE - widthBox/UNITY[SS])/2)*UNITY[SS];
   	boxY[SS] = boxSY[SS] + Math.floor((MAX_SIZE - heightBox/UNITY[SS])/2)*UNITY[SS];
}

function drawFrame(svgContainer) {
	if (play == 1) {
		svgContainer.selectAll(".vertical").remove();
		svgContainer.selectAll(".horizontal").remove();

		resizeBox();

		svgContainer.selectAll(".vertical")
	        .data(d3.range(0, widthBox / UNITY[SS] + 1))
	      	.enter().append("line")
	        .attr("class", "vertical")
	        .attr("x1", function(d) { return d * UNITY[SS] + boxX[SS]; })
	        .attr("y1", boxY[SS])
	        .attr("x2", function(d) { return d * UNITY[SS] + boxX[SS]; })
	        .attr("y2", boxY[SS] + heightBox);

	    svgContainer.selectAll(".horizontal")
	        .data(d3.range(0, heightBox / UNITY[SS] + 1))
	      	.enter().append("line")
	        .attr("class", "horizontal")
	        .attr("x1", boxX[SS])
	        .attr("y1", function(d) { return d * UNITY[SS] + boxY[SS]; })
	        .attr("x2", boxX[SS]+widthBox)
	        .attr("y2", function(d) { return d * UNITY[SS] + boxY[SS]; });

	}
}


function hideFrame() {
	
	frame = false;
	svgContainer.selectAll(".horizontal").lower();
	svgContainer.selectAll(".vertical").lower();

}

function showFrame() {
	
	frame = true;
	svgContainer.selectAll(".horizontal").raise();
	svgContainer.selectAll(".vertical").raise();

}

function btnReset() {
	svgContainer.selectAll("g").remove();
	svgContainer.selectAll(".vertical").remove();
	svgContainer.selectAll(".horizontal").remove()
	squareData = [];
	squares = [];
	indexes = [];
	sizes = [];
	widthBox = 0;
	heightBox = 0;
	play = 0;
	ADD_FLAG = false;
}
