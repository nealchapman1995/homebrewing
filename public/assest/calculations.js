const abv = document.getElementById('abv');
const calculate = document.getElementById('calculate');
const sugar = document.getElementById('sugar');
const cups = document.getElementById('cups');


function abvCalculate(){	
	let abvNumber = (((document.getElementById('original-grav').value) - (document.getElementById('final-grav').value)) * 131.25);
	if (abvNumber === 0) {
		abv.innerHTML = ("Please enter your gravities")
	}
	else{
		abv.innerHTML = ("Your ABV is " + abvNumber.toFixed(2) + " %");
	}
}

document.getElementById('calculate').addEventListener("click", abvCalculate);

function sugarCalculate(){
	let temp = document.getElementById('temp').value;
	let co = document.getElementById('co2').value;
	let qty = document.getElementById('qty').value
	let sugarNeeded = ((15.195 * qty) * (((co - 3.0378) + (0.050062 * temp)) - (0.00026555 * (temp * temp))));
	
	if (temp == NaN || qty == NaN){
		sugar.innerHTML = ("Please input numbers")
	}
	else{
		sugar.innerHTML = ("You need " + sugarNeeded.toFixed(1) + " grams of corn sugar");
		cups.innerHTML = ("or " + (sugarNeeded * .0050223).toFixed(2) + " cups");
	}
}
document.getElementById('calculate-sugar').addEventListener("click", sugarCalculate);
