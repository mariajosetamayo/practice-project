// Esta funcion se pone para que la funcion se corra despues de que se cargue el HTML debido a que al final del documento puse window.onload = changeContent

function changeContent () {

	//Esta funcion es en la que se va a calcular cuanto se debe en cada tarjeta de credito. Se utilizan como argumentos la informacion necesaria que se necesita proporcionar/llenar (ya que cambia mes con mes) para que se calculen los totales que se deben en cada tarjeta

	var creditCardCalculation = function (minAmexGLAarg, minAmexMJarg, minCommbankGLAarg, minCommbankMJarg, totalAvailablearg, chargesAmexGLAarg, chargesAmexMJarg) {

		// Number() se usa para declarar que las variables son numericas y no son strings. Si no son numericas, la funcion no puede correr correctamente

		var minAmexGLA = Number(minAmexGLAarg)
		var minAmexMJ = Number(minAmexMJarg)
		var minCommbankGLA = Number(minCommbankGLAarg)
		var minCommbankMJ = Number(minCommbankMJarg)
		var totalAvailable = Number(totalAvailablearg)
		var chargesAmexGLA = Number(chargesAmexGLAarg)
		var chargesAmexMJ = Number(chargesAmexMJarg)

		//Esta variable calcula el total de lo minimo que se debe en todas las tarjetas (sin cargos extras) 

		var totalMin = minCommbankMJ + minCommbankGLA + minAmexMJ + minAmexGLA

		// Estas variables calculan el total que se debe anadir por cargos extras y los intereses que se generaron debido a esos cargos extras

		var totalChargesMJ =  chargesAmexMJ + (0.025*chargesAmexMJ)  
		var totalChargesGLA = chargesAmexGLA +  (0.025*chargesAmexGLA)

		// este if statement se puso para que si el total minimo es igual a 0, los porcentajes tambien sean 0 y por ende, la funcion no regrese un output que diga que no existe el numero. De no ser 0 (else if), se calcula el porcentaje que se debe en cada tarjeta con respecto al total minimo.

		if ( totalMin === 0 ) {
			var percentageAmexGLA = 0
			var percentageAmexMJ = 0
			var percentageCommbankGLA = 0
			var percentageCommbankMJ = 0
		} else {
			var percentageAmexGLA = minAmexGLA/totalMin
			var percentageAmexMJ = minAmexMJ/totalMin
			var percentageCommbankGLA = minCommbankGLA/totalMin
			var percentageCommbankMJ = minCommbankMJ/totalMin
		}

		// Estas variables calculan cuanto se debe en cada tarjeta, primero multiplicando el porcentaje de la cantidad minima a pagar que representa cada tarjeta multiplicado por el total que tenemos disponible (el dinero que tenemos presupuestado para pagar las tarjetas). A esto se le suman los cargos extras con sus intereses correspondientes. 
		
		var totalPayableAmexGLA = (percentageAmexGLA*totalAvailable)+totalChargesGLA
		var totalPayableAmexMJ = (percentageAmexMJ*totalAvailable)+totalChargesMJ
		var totalPayableCommbankGLA = percentageCommbankGLA*totalAvailable
		var totalPayableCommbankMJ = percentageCommbankMJ*totalAvailable

		// Esta variable (objeto) se hizo para que el output regrese relacionando a cada tarjeta con la cantidad que se debe. Math.ceil se usa para que las cantidades se redonden al numero mas alto independientemente del numero decimal, ej. 5.2 se redondea a 6. Si fuera floor, seria al mas bajo y si fuera round seria al mas bajo o alto dependiendo del punto decimal.  

		var creditCardPayables = {
			amexGLA: Math.ceil(totalPayableAmexGLA),
			amexMJ: Math.ceil(totalPayableAmexMJ),
			commbankGLA: Math.ceil(totalPayableCommbankGLA),
			commbankMJ: Math.ceil(totalPayableCommbankMJ),
		}

		//Esto hace que la funcion regrese el output de carditCardPayables 

		return creditCardPayables	
	}

	// document.getElenetByID se usa para seleccionar a un ID del HTML y que se le puedan hacer cambios. Con variable.textContent se modifica el texto que contiene el div del HTML sin tener que cambiar el HTML. Aqui lo usamos para que en la pagina se muestre un titulo y texto en los divs que mostratan los resultados de la funcion. 

	var header = document.getElementById("header")
	header.textContent = "CREDIT CARD PAYMENT CALCULATOR"

	var amexGlaReceiver = document.getElementById("amexGlaReceiver")
	amexGlaReceiver.textContent = "This is where you'll see what's due in AMEX GLA"
	var amexMjReceiver = document.getElementById("amexMjReceiver")
	amexMjReceiver.textContent = "This is where you'll see what's due in AMEX MJ"
	var commbankGlaReceiver = document.getElementById("commbankGlaReceiver")
	commbankGlaReceiver.textContent = "This is where you'll see what's due in Commbank GLA"
	var commbankMjReceiver = document.getElementById("commbankMjReceiver")
	commbankMjReceiver.textContent = "This is where you'll see what's due in Commbank MJ"

	// Aqui usamos otra vez document.getElementById para modificar elementos del html. En este caso, le estamos diciendo a la computadora que cuando le den click al boton que dice "get my total payments", se corra la funcion "creditCardCalculation" y se regrese como resultado el total que se debe en cada tarjeta. Lo estructuramos como un objeto para que se relacione el reultado del total a cada tarjet individualmente.  

	var totalPaymentsButton = document.getElementById("totalPaymentsButton")
	totalPaymentsButton.addEventListener('click', function(){
		amexGlaReceiver.textContent = "You owe $" + creditCardCalculation(document.getElementById("amexGLA").value, document.getElementById("amexMJ").value, document.getElementById("commbankGLA").value, document.getElementById("commbankMJ").value, document.getElementById("totalAvailable").value, document.getElementById("chargesAmexGLA").value, document.getElementById("chargesAmexMJ").value).amexGLA + " in AMEX GLA"
		amexMjReceiver.textContent = "You owe $" + creditCardCalculation(document.getElementById("amexGLA").value, document.getElementById("amexMJ").value, document.getElementById("commbankGLA").value, document.getElementById("commbankMJ").value, document.getElementById("totalAvailable").value, document.getElementById("chargesAmexGLA").value, document.getElementById("chargesAmexMJ").value).amexMJ + " in AMEX MJ"
		commbankGlaReceiver.textContent = "You owe $" + creditCardCalculation(document.getElementById("amexGLA").value, document.getElementById("amexMJ").value, document.getElementById("commbankGLA").value, document.getElementById("commbankMJ").value, document.getElementById("totalAvailable").value, document.getElementById("chargesAmexGLA").value, document.getElementById("chargesAmexMJ").value).commbankGLA + " in Commbank GLA"
		commbankMjReceiver.textContent = "You owe $" + creditCardCalculation(document.getElementById("amexGLA").value, document.getElementById("amexMJ").value, document.getElementById("commbankGLA").value, document.getElementById("commbankMJ").value, document.getElementById("totalAvailable").value, document.getElementById("chargesAmexGLA").value, document.getElementById("chargesAmexMJ").value).commbankMJ + " in Commbank MJ"

	})
}

window.onload = changeContent 