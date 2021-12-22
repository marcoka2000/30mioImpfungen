 /* Alle Befehle für p5js findest du in der Dokumentation: https://p5js.org/reference/ */

let table
let data
let startDate = "2021-11-18"

let dateDE = startDate.split("-")


function preload () {
	table = loadTable("https://impfdashboard.de/static/data/germany_vaccinations_timeseries_v2.tsv", "tsv", "header")
}

function setup() {
	createCanvas(600, 160)

	data = table.getRow(1) 

	startRow = findStartRow(startDate)
	endRow = table.getRowCount("date") - 1

	anzahl = countVax(startRow, endRow).toLocaleString();

	statText(anzahl)
	spritze()
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

	fill(51, 146, 197)
	textSize(18)
	textStyle(BOLD)
	text("Was ist aus den \"30 Millionen Impfungen\nbis Weihnachten” geworden?", 40, 40)

	textSize(12)
	textStyle(NORMAL)

	text("Impfungen seit " + dateDE[2] + "." + dateDE[1] + "." + dateDE[0], 40, 100)

	fill(157, 204, 229)
	text(total, 40, 120)
}

function spritze(){	
	let img = document.createElement("img")
	document.body.appendChild(img)
	img.id = "svgSpritze"
	img.src = "spritze.svg"
}