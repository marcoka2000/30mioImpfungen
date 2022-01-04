 /* Alle Befehle für p5js findest du in der Dokumentation: https://p5js.org/reference/ */

let table
let data
let startDate = "2021-12-01"

let dateDE = startDate.split("-")


function preload () {
	table = loadTable("https://impfdashboard.de/static/data/germany_vaccinations_timeseries_v2.tsv", "tsv", "header")
}

function setup() {
	createCanvas(600, 196)

	data = table.getRow(1) 

	startRow = findStartRow(startDate)
	endRow = table.getRowCount("date") - 1

	anzahl = countVax(startRow, endRow)

	statText(anzahl.toLocaleString())
	spritze(anzahl)
}

function draw() {}

function findStartRow(datum) {
	for(let i = 0; i < table.getRowCount("date"); i++){

		if(table.getRow(i).obj.date === datum){
			// let rowNumber = i 
			// console.log(rowNumber)

			return i
		}
	}
}

function countVax(startRow, endRow){
	let anzahlStart = int(table.getRow(startRow).obj.dosen_kumulativ)

	let anzahlEnde = int(table.getRow(endRow).obj.dosen_kumulativ)

	let total = anzahlEnde - anzahlStart

	return total;
}

function checkDate(){}

function statText(total){
	noStroke()

	fill(17, 19, 20)	
	textSize(18)
	textStyle(BOLD)
	text("Was ist aus den \"30 Millionen Impfungen\nbis Weihnachten” geworden?", 40, 40)

	fill(17, 19, 20, 20)
	rect(36, 96, width, 1)

	textSize(12)


	fill(17, 19, 20)
	text("Impfungen seit " + dateDE[2] + "." + dateDE[1] + "." + dateDE[0], 40, 136)

	textStyle(NORMAL)
	// fill(157, 204, 229)
	text(total, 40, 152)
}

function spritze(total){	
	let svg = document.createElement("div")
	svg.setAttribute("id", "svgContainer")
	let main = document.getElementsByTagName("main")

	document.body.appendChild(svg)

	xhr = new XMLHttpRequest();
	xhr.open("GET", "spritze.svg", false);
	// Following line is just to be on the safe side;
	// not needed if your server delivers SVG with correct MIME type
	//xhr.overrideMimeType("image/svg+xml");

	xhr.onload = function(e) {
	// You might also want to check for xhr.readyState/xhr.status here
	document.getElementById("svgContainer")
		.appendChild(xhr.responseXML.documentElement);
	};
	xhr.send("");
	
	let impfe = document.getElementById("impfe")

	let w = total / 300000 * 2
	impfe.setAttribute("width", w)
	console.log(w)
}