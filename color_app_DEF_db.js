var UNITY = 54,
	SPACE = 25,
    WIDTH = 1024,
    MAX_SIZE = 12,
    HEIGHT = MAX_SIZE*UNITY + 16,
    SMALL = UNITY / 4 - 1,
    boxX = (UNITY + SPACE)*5 - 21,
	boxY = SMALL + 3,
	DISTANCE = 12,
	TXT_DISTANCE = 53;
    

var numEl = 0,
	squareData = [],
	squares = [],
	indexes = [],
	sizes = [],
	free = [],
	widthBox = 0,
	heightBox = 0,
	play = 0,
	frame = true;


var svgContainer = d3.select("#game").append("svg")
									.attr("width",WIDTH)
									.attr("height",HEIGHT); 

	svgContainer.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .text("CAMPIONI COLORI SCELTI")
        .attr("class","txt_sottotitolino");

	svgContainer.append("line")
        .attr("class", "linea")
        .attr("x1", 0)
        .attr("y1", 33)
        .attr("x2", 353)
        .attr("y2", 33);

    svgContainer.append("svg:image")
	   .attr("x",boxX)
	   .attr("y",boxY)
	   .attr("width", 75*MAX_SIZE)
	   .attr("height", 75*MAX_SIZE)
	   .attr("xlink:href","images/img_bg.jpg")
	   .attr("id", "bg");

function drawShadow(inputN) {

	svgContainer.selectAll("#square_"+inputN).append("rect")
				.attr("width", UNITY)
				.attr("height", UNITY)
				.attr("x", placeX(inputN))
				.attr("y", placeY(inputN))
				.attr("id", "shadow_" + inputN)
				.attr("class","shadow");

}


function simplyColor(colore) {
	if (colore == "#FF6804") {
		return 'A';
	}
	else if (colore == "#FFFFFF") {
		return 'B';
	}
	else if (colore == "#2476FF") {
		return 'C';
	}
	else if (colore == "#FFDC1E") {
		return 'D';
	}
	else if (colore == "#B0BBBD") {
		return 'E';
	}
	else if (colore == "#6C2829") {
		return 'F';
	}
	else if (colore == "#000000") {
		return 'G';
	}
	else if (colore == "#FFB0F7") {
		return 'H';
	}
	else if (colore == "#FE0000") {
		return 'I';
	}
	else if (colore == "#53D000") {
		return 'J';
	}
	else if (colore == "#B74BFF") {
		return 'K';
	}
}

function deColor(lettera) {
	if (lettera == "A") {
		return '#FF6804';
	}
	else if (lettera == "B") {
		return 'FFFFFF';
	}
	else if (lettera == "C") {
		return '2476FF';
	}
	else if (lettera == "D") {
		return 'FFDC1E';
	}
	else if (lettera == "E") {
		return 'B0BBBD';
	}
	else if (lettera == "F") {
		return '6C2829';
	}
	else if (lettera == "G") {
		return '000000';
	}
	else if (lettera == "H") {
		return 'FFB0F7';
	}
	else if (lettera == "I") {
		return 'FE0000';
	}
	else if (lettera == "J") {
		return '53D000';
	}
	else if (lettera == "K") {
		return 'B74BFF';
	}
}

function placeX(n) {
	if (n<4) {
		return n*(UNITY+SPACE+10)+1;
	}
	else if (n<8){
		return (n-4)*(UNITY+SPACE+10)+1;
	}
	else if (n<11){
		return (n-8)*(UNITY+SPACE+10)+1;
	}

}

function placeY(n) {
	if (n<4) {
		return (SMALL+DISTANCE) + TXT_DISTANCE;
	}
	else if (n<8){
		return 2*(SMALL+DISTANCE) + UNITY + (4*SPACE-6) + TXT_DISTANCE;
	}
	else if (n<11){
		return 3*(SMALL+DISTANCE) + 2*(UNITY + (4*SPACE-6)) + TXT_DISTANCE;
	}

}


function drawSquare(inputData) {

	svgContainer.selectAll("g").remove();

    inputData.sort(function (a,b) {
    	return b.z - a.z;
    });

	var squareGroup = svgContainer.selectAll("g")
							.data(inputData).enter()
							.append("g")
							.attr("id", function(d) { return "square_" + d.N; } )
 
	//re-draw shadow
	for(var i=0; i < squareData.length; i++) {
        if (squareData[i].x >= boxX) {
        	drawShadow(squareData[i].N);
        }
    }

	squareGroup.append("rect")
				.attr("width", function(d) { return d.x >= boxX ? d.s : UNITY;})
				.attr("height", function(d) { return d.x >= boxX ? d.s : UNITY;})
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d) { return d.y; })
				.attr("fill", function(d) { return d.c; })
				.attr("id", function(d) { return "big_" + d.N; })
				.attr("class","colori")
				.style("stroke", "rgb(212, 212, 212)")
				.style("stroke-width", function(d) {return ((d.c == "#FFFFFF") && (d.x < boxX)) ? "1px" : "0px"} )
				.call(d3.drag()
			        .on("start", dragstarted)
			        .on("drag", dragged)
			        .on("end", dragended));

	squareGroup.append("rect")
				.attr("width", SMALL)
				.attr("height", SMALL-2)
				.attr("x", function(d) { return d.sx + UNITY - SMALL - 1; })
				.attr("y", function(d) { return d.sy - SMALL - DISTANCE; })
				.attr("fill", "#000000")
				.attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
				.attr("id",function(d) { return "small_" + d.N; })
				.attr("display",function(d) { return d.x >= boxX ? "none" : "display"; });

	squareGroup.append("text")
				.attr("x", function(d) { return d.sx + UNITY - SMALL + 3; })
                .attr("y", function(d) { return d.sy - SMALL + 9 - DISTANCE })
                .text("x")
                .attr("font-family", "Dosis")
                .attr("font-size", "12px")
                .attr("fill", "#FFFFFF")
                .attr("onclick", function(d) { return "removeSquare("+d.N+")"; })
                .attr("cursor","pointer")
                .attr("id",function(d) { return "text_" + d.N; })
                .attr("display",function(d) { return d.x >= boxX ? "none" : "display"; });

	squareGroup.append("text") //TESTO SOTTO RETTANGOLI: LINGUA
				.attr("x", function(d) { return d.sx; })
                .attr("y", function(d) { return d.sy + 2 + UNITY + 18; })
                .text(function(d) { return  d.L; })               
                .attr("class","txt_tassello")
                .attr("fill",function(d) { return d.x >= boxX ? "#d6d6d6" : "#000000"; })
                .attr("id",function(d) { return "lingua_" + d.N; });
    squareGroup.append("text") //TESTO SOTTO RETTANGOLI: COLORE
				.attr("x", function(d) { return d.sx; })
                .attr("y", function(d) { return d.sy + 2 + UNITY + 30; })
                .text(function(d) { return d.Name; })   
                .attr("class","txt_tassello")
                .attr("fill",function(d) { return d.x >= boxX ? "#d6d6d6" : "#000000"; })
                .attr("font-weight","bold")
                .attr("id",function(d) { return "colore_" + d.N; });
    squareGroup.append("text") //TESTO SOTTO RETTANGOLI: SIZE
				.attr("x", function(d) { return d.sx; })
                .attr("y", function(d) { return d.sy + 2 + UNITY + 42; })
                .text(function(d) { return d.s/UNITY + 'x' + d.s/UNITY + " MODULI";})
                .attr("class","txt_tassello")
             	.attr("fill",function(d) { return d.x >= boxX ? "#d6d6d6" : "#000000"; })
                .attr("font-weight","bold")
                .attr("id",function(d) { return "size_" + d.N; });


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

var COLORE = "", 
	COLORE_NOME = "", 
	COLORE_SIZE = 0,
	ADD_FLAG = false;

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

		// var ddColor = document.getElementById("colore"),
		// 	ddLength = document.getElementById("lunghezza"),
		// 	selColor = ddColor.options[ddColor.selectedIndex].value,
		// 	selLength = ddLength.options[ddLength.selectedIndex].value;

		var selColor = COLORE, 
			selColorName = COLORE_NOME,
			selLength = COLORE_SIZE, 
			selLan1 = LINGUA;

		var selLan = selLan1.toUpperCase();	

		var newSquare = {
		      sx: placeX(n),
		      sy: placeY(n),
		      x: placeX(n),
		      y: placeY(n),
		      c: selColor,
		      s: parseInt(selLength)*UNITY,
		      z: n,
		      N: n,
		      L: selLan,
		      Name: selColorName
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
        sizes[i] = squareData[i].s;
        if (widthBox < arrayMax(sizes) && play == 1) {
        	btnPlay();
        }
    }

}

function btnReset() {
	svgContainer.selectAll("g").remove();
	svgContainer.selectAll(".vertical").remove();
	svgContainer.selectAll(".horizontal").remove();
	squareData = [];
	squares = [];
	indexes = [];
	sizes = [];
	widthBox = 0;
	heightBox = 0;
	play = 0;
	ADD_FLAG = false;
}

var trovato = false;

function btnPlay() {

	if (!ADD_FLAG) {
		alert("seleziona almeno un colore");
		return;
	} 

	play = 1;

	svgContainer.selectAll("#bg").remove();

	svgContainer.selectAll(".vertical").remove();
	svgContainer.selectAll(".horizontal").remove();
	sizes = [];

    for(var i=0; i < squareData.length; i++) {
        sizes[i] = squareData[i].s;
    }

    widthBox = arrayMax(sizes);
   	heightBox = arrayMax(sizes);


   	boxX = boxX + Math.floor((MAX_SIZE - widthBox/UNITY)/2)*UNITY;
   	boxY = boxY + Math.floor((MAX_SIZE - heightBox/UNITY)/2)*UNITY;

   	for(var i=0; i < squareData.length; i++) {
        if (squareData[i].s == widthBox && trovato == false) {
        	d3.select("#big_"+squareData[i].N)
        			.attr("x",squareData[i].x = boxX)
        			.attr("y",squareData[i].y = boxY)
        			.attr("width",widthBox)
        			.attr("height",widthBox);
        	d3.select("#small_"+squareData[i].N)
        			.attr("fill","#FFFFFF");
        	d3.select("#text_"+squareData[i].N)
        			.attr("onclick",null)
        			.attr("cursor","default");

        	d3.select("#lingua_"+squareData[i].N).style("fill","#d6d6d6");
			d3.select("#colore_"+squareData[i].N).style("fill","#d6d6d6");
			d3.select("#size_"+squareData[i].N).style("fill","#d6d6d6");

        	drawShadow(squareData[i].N);

        	svgContainer.selectAll("#square_"+squareData[i].N).raise();

        	trovato = true;
        }
    }

    trovato = false;

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

    if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}
}

function removeSquare(id_r) {

	var elem = d3.select("#square_"+id_r);
	for (var i = 0; i < squareData.length; i++) {
		if (squareData[i].N == id_r) {
			var index_el = i;
		}
	};

	squareData.splice(index_el,1);
	free.push(id_r);

	elem.remove();

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}
	
}

function debug() {
	console.log("---");
	for (var i = 0; i < squareData.length; i++) {
		console.log(squareData[i].N+","+squareData[i].x+","+squareData[i].y+","+squareData[i].z);
	};
	console.log("---");
}

function dragstarted(d) {

	if (play == 1) {
		drawShadow(d.N);

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
	}
}

function dragged(d) {

	d3.select(this).raise();

	if (play == 1) {

		var x = d3.event.x,
		 	y = d3.event.y;

		if (x >= boxX) {
			d3.select(this).attr("width", d.s).attr("height", d.s);
			x = round(Math.max(0, Math.min(widthBox - d.s, x-boxX)),UNITY)+boxX;
			y = round(Math.max(0, Math.min(heightBox - d.s, y-boxY)),UNITY)+boxY;
		}

		d3.select(this).attr("x", d.x = x).attr("y", d.y = y);

		// var x = d3.event.x,
		// 	y = d3.event.y;

		// var gridX = round(Math.max(boxX, Math.min(boxX + widthBox - d.s, x))+26, UNITY),
  // 			gridY = round(Math.max(boxY, Math.min(boxY + heightBox - d.s, y))+20, UNITY);


  // 		if (d.x >= boxX) {
		// 	d3.select(this).attr("x", d.x = x).attr("y", d.y = x);
		// 	d3.select(this).attr("width", d.s).attr("height",d.s);
		// }
		// else {
		// 	//d3.select(this).attr("width", width_e).attr("height",height_e);
		// 	d3.select(this).attr("x", d.x = x).attr("y", d.y = y);
		// }
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
		if (x < boxX) {
			d3.select(this).attr("x", d.x = d.sx).attr("y", d.y = d.sy);
			d3.select(this).attr("width", UNITY).attr("height", UNITY);
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
			if (d.c == "#FFFFFF") {
				svgContainer.selectAll("#big_"+d.N).style("stroke-width","0px");
			}
			svgContainer.selectAll("#lingua_"+d.N).style("fill","#d6d6d6");
			svgContainer.selectAll("#colore_"+d.N).style("fill","#d6d6d6");
			svgContainer.selectAll("#size_"+d.N).style("fill","#d6d6d6");
		}
	}
	

	if (frame) {
		showFrame();
	}
	else {
		hideFrame();
	}

	console.log(squareData);
	// if (x < boxX || play == 0) {
	// 	d3.select(this).attr("x", d.x = d.sx).attr("y", d.y = d.sy);
	// 	d3.select(this).attr("width", UNITY).attr("height", UNITY);

	// 	svgContainer.selectAll("#small_"+d.N).attr("fill","#000000")
	// 	d3.select("#text_"+d.N).attr("display","display");
	// 	d3.select("#small_"+d.N).attr("display","display");

	// 	//rimuovi fondo
	// 	// svgContainer.selectAll("#shadow_"+d.N).remove();

	// 	d3.select(".colori").style("stroke-width","1px");
	// 	d3.select("#big_"+d.N).style("stroke-width","1px");
	// 	d3.select("#big_"+d.N).style("stroke", "rgb(212, 212, 212)");
	// }

	// else {
	// 	d3.select("#text_"+d.N).attr("display","none");
	// 	d3.select("#small_"+d.N).attr("display","none");
	// 	d3.select("#big_"+d.N).style("stroke-width","0px");
	// 	d3.select("#big_"+d.N).style("stroke", "rgb(212, 212, 212)");
	// }

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

function lingua(lin) {

	LINGUA = lin;
	$.post( "content/form.php", {lan: LINGUA  }, 
	function( data ) {
  		$( "#color_lan" ).html( data );
	});
	$('#dropdownMenu1').html(LINGUA +' <span class="caret"></span>');

}

function colore(coll1, coll2, coll3) {

		COLORE = coll1;
		COLORE_SIZE = coll2;
		COLORE_NOME = coll3;

}



//GENERATE PDF
function submit_download_form()
{
	var doc = new jsPDF();
	var border = 20;
	var UU = (210-2*border)/MAX_SIZE;
	var titleSpace = 80;

	var horizontal = (210 - widthBox/UNITY*UU)/2,
		vertical = horizontal+titleSpace;

	var theData = [];

	for (var i=0; i<squareData.length; i++) {
		if (squareData[i].x >= boxX) {
			theData.push(squareData[i]);
		}
	}


	theData.sort(function (a,b) {
    	return b.z - a.z;
    });

    doc.setFont("helvetica");
    doc.setFontSize(14);
	doc.text(border, border, 'CODICE UNIVOCO OPERA');

	doc.setFont("helvetica");
    doc.setFontSize(13);
	doc.text(border, border+25, 'COLORI UTILIZZATI');

	doc.setFont("helvetica");
    doc.setFontSize(20);
	doc.setFontType("bold");
	doc.text(border, border+10, 'ID: 3450HTGDL98');


	for (var i=0; i<theData.length; i++) {
		doc.setFont("helvetica");
	    doc.setFontSize(14);
		doc.setFontType("bold");
		doc.text(textX(i), textY(i), theData[i].Name);
	}
	

	for (var i=0; i<theData.length; i++) {
		doc.setFillColor(hexToRgb(theData[i].c).r,hexToRgb(theData[i].c).g,hexToRgb(theData[i].c).b);
		doc.rect(horizontal + (theData[i].x-boxX)/UNITY*UU, vertical + (theData[i].y-boxY)/UNITY*UU, theData[i].s/UNITY*UU, theData[i].s/UNITY*UU,'F');
	}


	doc.output('datauri');
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function textX(n) {
	if (n<3) {
		return 20 + n*50;
	}
	else if (n<6){
		return 20 + (n-3)*50;
	}
	else if (n<9){
		return 20 + (n-6)*50;
	}
	else {
		return 20 + (n-9)*50;
	}

}

function textY(n) {
	if (n<3) {
		return 55;
	}
	else if (n<6){
		return 65;
	}
	else if (n<9){
		return 75;
	}
	else {
		return 85;
	}

}


function submit_download_formx()
{
	var res='';
 		res= res +' OBJect: '+     squareData[0].N;
 		res= res +' - '+     squareData[1].N;
 		res= res +' - '+     squareData[2].N;
 		res= res +' - '+     squareData[3].N;

	 res=res +'<br>SQ:<br>'+ squares +'<br>INDEX:<br>'+UNITY +  indexes + '<br>SIZE:<br>'+	sizes ;



	$('.result').html(res);	

}

function squareData2string() {
	var theData = [],
		theString = '';

	var sepCh = ',',
		endCh = ';';


	for (var i=0; i<squareData.length; i++) {
		if (squareData[i].x >= boxX) {
			theData.push(squareData[i]);
		}
	}

	theData.sort(function (a,b) {
    	return b.z - a.z;
    });

	for (var i = 0; i < theData.length; i++) {
		theString += (theData[i].x-boxX)/UNITY + sepCh + ((theData[i].y-boxY)/UNITY) + sepCh + simplyColor(theData[i].c) + sepCh + theData[i].s/UNITY + sepCh + theData[i].z + sepCh + theData[i].L + sepCh + theData[i].Name;
		theString += endCh;
	};

	return theString;
	//DA MANDARE SU DB
}

// **********************************************
// FUNZIONI DA USARE SULLA PAGINA DEL PAGAMENTO
// **********************************************

function string2squareData( theString ) {

	//Da stringa (DB) ricostruisce l'array di oggetti necessario per disegnare l'opera

	var newSquareData = [];

	var sepCh = ',',
		endCh = ';';

	var sq = theString.split(endCh);


	for (var i = 0; i < sq.length-1; i++) {
		var res = sq[i].split(sepCh);

		var newSquare = {
		      x: res[0],
		      y: res[1],
		      c: deColor(res[2]),
		      s: res[3],
		      z: res[4],
		      L: res[5],
		      Name: res[6]
		    };

		newSquareData.push(newSquare);

	};

	return newSquareData;

}

function create( newData ) {

	//Da array di oggetti genera il disegno nell'area con l'ID: drawingArea

	var UNITY = 54;

	var svgNew = d3.select("#drawingArea").append("svg")
									.attr("width",648)
									.attr("height",648); 

	var squareNew = svgNew.selectAll("rect")
							.data(newData).enter()
							.append("rect")
							.attr("width", function(d) { return d.s*UNITY;})
							.attr("height", function(d) { return d.s*UNITY;})
							.attr("x", function(d) { return d.x*UNITY; })
							.attr("y", function(d) { return d.y*UNITY; })
							.attr("fill", function(d) { return d.c; }); 	


}

function print() {

	//Prende l'SVG presente dell'area con ID: drawingArea - e genera un PNG che mette nell'area con ID: example

	var tmp = document.getElementById("drawingArea");
	var svg = tmp.getElementsByTagName("svg")[0];
	var svg_xml = (new XMLSerializer).serializeToString(svg);

	canvg(document.getElementById('example'), svg_xml);

}




