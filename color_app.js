var UNITY = 75,
	SPACE = 25,
    WIDTH = 12*(UNITY+SPACE),
    HEIGHT = 12*UNITY,
    SMALL = UNITY / 5;
    boxX = placeX(3) + UNITY + 100;
	boxY = SMALL;
    

var numEl = 0,
	squareData = [],
	squares = [],
	indexes = [],
	sizes = [],
	widthBox = 0,
	heightBox = 0,
	play = 0;


var svgContainer = d3.select("body").append("svg")
									.attr("width",WIDTH)
									.attr("height",HEIGHT); 

function drawShadow(inputN) {

	svgContainer.selectAll("#square_"+inputN).append("rect")
				.attr("width", UNITY)
				.attr("height", UNITY)
				.attr("x", inputN*(UNITY+SPACE))
				.attr("y", SMALL)
				.attr("id", "shadow_" + inputN)
				.attr("class","shadow");

}

function generateCode_1() {
	var min = zero2D(widthBox/UNITY,widthBox/UNITY);
	console.log(min);

	var codice = [];

	if (play == 1) {
		for (var i=0;i<widthBox/UNITY;i++) {
			for (var j=0;j<widthBox/UNITY;j++) {
				for (var w=0;w<squareData.length;w++) {
					if (squareData[w].y >= 2*UNITY) {
						var xx = squareData[w].x/UNITY;
						var yy = (squareData[w].y/UNITY - 2);
						var ss = squareData[w].s/UNITY;
						if ((i >= xx) && (i < xx + ss)) {
							if ((j >= yy) && (i < yy + ss)) {
								if (squareData[w].z < min[i][j]) {
									min[i][j] = squareData[w].z;
								}
							}
						}
					}
				}
			}
		}

		console.log(min);

		for (var i=0;i<widthBox/UNITY;i++) {
			for (var j=0;j<widthBox/UNITY;j++) {
				if (min[i][j] < 12) {
					codice.push(min[i][j]);
				}
			}
		}

	}

	console.log(codice);


}

function generateCode() {
	var codiceDef = "";

	if (squareData.length < 10) {
		codiceDef += 0;
		codiceDef += squareData.length;
	}
	else {
		codiceDef += squareData.length;
	}

	for(var i=0; i < squareData.length; i++) {
        if (squareData[i].y >= 2*UNITY) {
        	codiceDef += codiceConvert(squareData[i].x/UNITY,(squareData[i].y/UNITY-2),colorNumber(squareData[i].c),squareData[i].s/UNITY,squareData[i].z)
        }
    }

    document.getElementById("codice").innerHTML = codiceDef;

    deCode(codiceDef);

}

function codiceConvert(x,y,c,s,z) {
	var codice = "";

	codice += String.fromCharCode(33+squareData.length*y+x);
	codice += c;
	codice += String.fromCharCode(33+squareData.length*s+z);

	return codice;

}

function deCode(cod) {
	var len = parseInt(cod[0]+cod[1]);
	console.log(len);

	var x = 0,
		y = 0,
		c = "",
		s = 0,
		z = 0;

	for (var i=2; i<=cod.length-3; i=i+3) {
		x = (cod[i].charCodeAt(0)-33)%len;
		y = Math.floor((cod[i].charCodeAt(0)-33)/len);
		c = deColor(cod[i+1]);
		z = (cod[i+2].charCodeAt(0)-33)%len;
		s = Math.floor((cod[i+2].charCodeAt(0)-33)/len);
		console.log(x+","+y+","+c+","+s+","+z);
	}
}

function colorNumber(colore) {
	if (colore == "#FF6600") {
		return 'A';
	}
	else if (colore == "#FFFFFF") {
		return 'B';
	}
	else if (colore == "#0000FF") {
		return 'C';
	}
	else if (colore == "#FFFF00") {
		return 'D';
	}
	else if (colore == "#CACACA") {
		return 'E';
	}
	else if (colore == "#666600") {
		return 'F';
	}
	else if (colore == "#000000") {
		return 'G';
	}
	else if (colore == "#FFE1DC") {
		return 'H';
	}
	else if (colore == "#FF0000") {
		return 'I';
	}
	else if (colore == "#00FF00") {
		return 'J';
	}
	else if (colore == "#9F9FFF") {
		return 'K';
	}
}

function deColor(lettera) {
	if (lettera == "A") {
		return '#FF6600';
	}
	else if (lettera == "B") {
		return 'FFFFFF';
	}
	else if (lettera == "C") {
		return '0000FF';
	}
	else if (lettera == "D") {
		return 'FFFF00';
	}
	else if (lettera == "E") {
		return 'CACACA';
	}
	else if (lettera == "F") {
		return '666600';
	}
	else if (lettera == "G") {
		return '000000';
	}
	else if (lettera == "H") {
		return 'FFE1DC';
	}
	else if (lettera == "I") {
		return 'FF0000';
	}
	else if (lettera == "J") {
		return '00FF00';
	}
	else if (lettera == "K") {
		return '9F9FFF';
	}
}

function placeX(n) {
	if (n<4) {
		return n*(UNITY+SPACE);
	}
	else if (n<8){
		return (n-4)*(UNITY+SPACE);
	}
	else if (n<11){
		return (n-8)*(UNITY+SPACE);
	}

}

function placeY(n) {
	if (n<4) {
		return SMALL;
	}
	else if (n<8){
		return 2*SMALL + UNITY + 4*SPACE;
	}
	else if (n<11){
		return 3*SMALL + 2*(UNITY + 4*SPACE);
	}

}

function code2color(codeC) {
	if (codeC == "#FF6600") {
		return 'ARANCIONE';
	}
	else if (codeC == "#FFFFFF") {
		return 'BIANCO';
	}
	else if (codeC == "#0000FF") {
		return 'BLU';
	}
	else if (codeC == "#FFFF00") {
		return 'GIALLO';
	}
	else if (codeC == "#CACACA") {
		return 'GRIGIO';
	}
	else if (codeC == "#666600") {
		return 'MARRONE';
	}
	else if (codeC == "#000000") {
		return 'NERO';
	}
	else if (codeC == "#FFE1DC") {
		return 'ROSA';
	}
	else if (codeC == "#FF0000") {
		return 'ROSSO';
	}
	else if (codeC == "#00FF00") {
		return 'VERDE';
	}
	else if (codeC == "#9F9FFF") {
		return 'VIOLA';
	}
}

function drawSquare(inputData) {

	svgContainer.selectAll("g").remove();


	var squareGroup = svgContainer.selectAll("g")
							.data(inputData).enter()
							.append("g")
							.attr("id", function(d) { return "square_" + d.N; } )
 
	//re-draw shadow
	// for(var i=0; i < squareData.length; i++) {
 //        if (squareData[i].y >= 2*UNITY) {
 //        	drawShadow(squareData[i].N);
 //        }
 //    }

	squareGroup.append("rect")
				.attr("width", SMALL)
				.attr("height", SMALL)
				.attr("x", function(d) { return d.x + UNITY - SMALL + 1; })
				.attr("y", function(d) { return d.y - SMALL; })
				.attr("fill", "#000000")
				.attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
				.attr("id",function(d) { return "small_" + d.N; })
				.attr("display",function(d) { return d.x >= placeX(3)+UNITY ? "none" : "display"; });

	squareGroup.append("text")
				.attr("x", function(d) { return d.x + UNITY - SMALL + 5; })
                .attr("y", function(d) { return d.y - SMALL + 11 })
                .text("x")
                .attr("font-family", "Dosis")
                .attr("font-size", "16px")
                .attr("fill", "#FFFFFF")
                .attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
                .attr("cursor","pointer")
                .attr("id",function(d) { return "text_" + d.N; });

	squareGroup.append("rect")
				.attr("width", function(d) { return d.x >= placeX(3)+UNITY ? d.s : UNITY;})
				.attr("height", function(d) { return d.x >= placeX(3)+UNITY ? d.s : UNITY;})
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d) { return d.y; })
				.attr("fill", function(d) { return d.c; })
				.attr("id", function(d) { return "big_" + d.N; })
				.attr("class","colori")
				.style("stroke", "rgb(212, 212, 212)")
				.style("stroke-width", "1px")
				.call(d3.drag()
			        .on("start", dragstarted)
			        .on("drag", dragged)
			        .on("end", dragended));

	squareGroup.append("text") //TESTO SOTTO RETTANGOLI: LINGUA
				.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y + 2 + UNITY + 20; })
                .text("ITALIANO")
                .attr("font-family", "Arial")
                .attr("font-size", "11px")
                .attr("id",function(d) { return "lingua_" + d.N; });
    squareGroup.append("text") //TESTO SOTTO RETTANGOLI: COLORE
				.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y + 2 + UNITY + 35; })
                .text(function(d) { return code2color(d.c); })
                .attr("font-family", "Arial")
                .attr("font-weight","bold")
                .attr("font-size", "11px")
                .attr("id",function(d) { return "colore_" + d.N; });
    squareGroup.append("text") //TESTO SOTTO RETTANGOLI: SIZE
				.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y + 2 + UNITY + 50; })
                .text(function(d) { return d.s/UNITY + 'x' + d.s/UNITY + "moduli";})
                .attr("font-family", "Arial")
                .attr("font-weight","bold")
                .attr("font-size", "11px")
                .attr("id",function(d) { return "size_" + d.N; });

}

var show = 0;

function showFrame() {
	show = 1 - show;
	if (show == 1) {
		svgContainer.selectAll(".horizontal").raise().classed("active", false);
		svgContainer.selectAll(".vertical").raise().classed("active", false);
	}
	else {
		svgContainer.selectAll(".horizontal").raise().classed("active", true);
		svgContainer.selectAll(".vertical").raise().classed("active", true);
	}
	
}


function btnAdd() {

	var n = squareData.length;

	if (n<11) {

		var initialSquare = [];

		indexes.push(n);

		var ddColor = document.getElementById("colore"),
			ddLength = document.getElementById("lunghezza"),
			selColor = ddColor.options[ddColor.selectedIndex].value,
			selLength = ddLength.options[ddLength.selectedIndex].value;

		var newSquare = {
		      sx: placeX(n),
		      sy: placeY(n),
		      x: placeX(n),
		      y: placeY(n),
		      c: selColor,
		      s: parseInt(selLength)*UNITY,
		      z: n,
		      N: n
		    };


		squareData.push(newSquare);
		// for(var i=0; i < squareData.length; i++) {
		// 	if (squareData[i].y < 2*UNITY) {
		// 		initialSquare.push(squareData[i]);
		// 	}
	 	//    }
		drawSquare(squareData);
	}

	else {
		alert("max");
	}

	

}

function btnReset() {
	svgContainer.selectAll("g").remove();
	svgContainer.selectAll(".vertical").remove();
	svgContainer.selectAll(".horizontal").remove()
	squareData = [],
	squares = [],
	indexes = [],
	sizes = [],
	widthBox = 0,
	heightBox = 0,
	play = 0;
}



function btnPlay() {

	play = 1;

	svgContainer.selectAll(".vertical").remove();
	svgContainer.selectAll(".horizontal").remove();
	sizes = [];

    for(var i=0; i < squareData.length; i++) {
        sizes[i] = squareData[i].s;
    }

    widthBox = arrayMax(sizes);
   	heightBox = arrayMax(sizes);

   	svgContainer.selectAll(".vertical")
        .data(d3.range(0, widthBox / UNITY + 1))
      	.enter().append("line")
        .attr("class", "vertical")
        .attr("x1", function(d) { return d * UNITY + boxX; })
        .attr("y1", boxY)
        .attr("x2", function(d) { return d * UNITY + boxX; })
        .attr("y2", boxY + heightBox);

    svgContainer.selectAll(".horizontal")
        .data(d3.range(0, heightBox / UNITY + 1))
      	.enter().append("line")
        .attr("class", "horizontal")
        .attr("x1", boxX)
        .attr("y1", function(d) { return d * UNITY + boxY; })
        .attr("x2", boxX+widthBox)
        .attr("y2", function(d) { return d * UNITY + boxY; });

   	for(var i=0; i < squareData.length; i++) {
        if (squareData[i].s == widthBox) {
        	d3.select("#big_"+squareData[i].N)
        			.attr("x",squareData[i].x = boxX)
        			.attr("y",squareData[i].y = boxY)
        			.attr("width",widthBox)
        			.attr("height",widthBox);
        	d3.select("#small_"+squareData[i].N)
        			.attr("fill","#FFFFFF");

        	drawShadow(squareData[i].N);

        	svgContainer.selectAll("#square_"+squareData[i].N).raise().classed("active", true);
        	return;
        }
    }


    

    

}

function removeSquare(id_r) {
	
	var zz = squareData[id_r].z;

	squareData.splice(id_r,1);
	indexes.pop(id_r,1);

	for (var i = 0; i < indexes.length; i++) {
		if (squareData[i].y < 2*UNITY) {
			squareData[i].sx = indexes[i]*(UNITY+SPACE);
			squareData[i].x = indexes[i]*(UNITY+SPACE);
			squareData[i].z = indexes[i];
			squareData[i].N = indexes[i];
		}
		else {
			squareData[i].sx = indexes[i]*(UNITY+SPACE);
			squareData[i].z = indexes[i];
			squareData[i].N = indexes[i];
		}
	};

	for (var i = 0; i < squareData.length; i++) {
		//risistema gli indici z di tutti gli elementi
		if (squareData[i].z > zz){
		  squareData[i].z = squareData[i].z - 1;
		}
	}

	drawSquare(squareData);

}

function debug() {
	console.log("---");
	for (var i = 0; i < squareData.length; i++) {
		console.log(squareData[i].N+","+squareData[i].x+","+squareData[i].y+","+squareData[i].z);
	};
	console.log("---");
}

function dragstarted(d) {
	//crea un fondo
	if (d.x >= placeX(3)+UNITY) {
		drawShadow(d.N);
	}

	//portalo in primo piano
	var elem = d3.select("#square_"+d.N);
	elem.raise().classed("active", true);
	var elemRel = d3.select("#big_"+d.N);
	elemRel.raise().classed("active", true);

	
	for (var i = 0; i < squareData.length; i++) {
		//risistema gli indici z di tutti gli elementi
		if (squareData[i].z < d.z){
		  squareData[i].z = squareData[i].z + 1;
		}
	}

	d.z = 0;
	
	//elimina i quadratini small
	svgContainer.selectAll("#small_"+d.N).attr("fill","#FFFFFF");

	

}

function dragged(d) {
	
	if (play == 1) {
		var x = d3.event.x,
			y = d3.event.y;
		var gridX = round(Math.max(boxX, Math.min(boxX + widthBox - d.s, x)), UNITY),
  			gridY = round(Math.max(boxY, Math.min(boxY + heightBox - d.s, y)), UNITY);
  		if (d.x >= placeX(3)+UNITY) {
			d3.select(this).attr("x", d.x = gridX).attr("y", d.y = gridY);
			d3.select(this).attr("width", d.s).attr("height",d.s);
		}
		else {
			//d3.select(this).attr("width", width_e).attr("height",height_e);
			d3.select(this).attr("x", d.x = x).attr("y", d.y = y);
		}
	}

	  
}

function dragended(d) {

	var x = d3.event.x,
	  	y = d3.event.y;

	var elem = d3.select("#square_"+d.N);
	elem.raise().classed("active", false);

	if (x < placeX(3)+UNITY || play == 0) {
		d3.select(this).attr("x", d.x = d.sx).attr("y", d.y = d.sy);
		d3.select(this).attr("width", UNITY).attr("height", UNITY);

		svgContainer.selectAll("#small_"+d.N).attr("fill","#000000")
		d3.select("#text_"+d.N).attr("display","display");
		d3.select("#small_"+d.N).attr("display","display");

		//rimuovi fondo
		svgContainer.selectAll("#shadow_"+d.N).remove();

		d3.select(".colori").style("stroke-width","1px");
		d3.select("#big_"+d.N).style("stroke-width","1px");
		d3.select("#big_"+d.N).style("stroke", "rgb(212, 212, 212)");
	}

	else {
		d3.select("#text_"+d.N).attr("display","none");
		d3.select("#small_"+d.N).attr("display","none");
		d3.select("#big_"+d.N).style("stroke-width","0px");
		d3.select("#big_"+d.N).style("stroke", "rgb(212, 212, 212)");
	}

}

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
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

function zero2D(rows, cols) {
  var array = [], row = [];
  while (cols--) row.push(12);
  while (rows--) array.push(row.slice());
  return array;
}
