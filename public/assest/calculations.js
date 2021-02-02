const abv = document.getElementById('abv');
const calculate = document.getElementById('calculate');

function abvCalculate(){
	let abvNumber = (((document.getElementById('original-grav').value) - (document.getElementById('final-grav').value)) * 131.25);
	abv.innerHTML = (abvNumber.toFixed(2));
}

document.getElementById('calculate').addEventListener("click", abvCalculate);