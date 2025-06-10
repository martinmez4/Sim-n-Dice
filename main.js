let secuenciaUsuario = [];
let secuenciaMaquina = [];
let bloqueado = true;
let ronda = 0;
const colores = ["rojo", "azul", "verde", "amarillo"];
const estadoMaquina = "Turno de la maquina";
const estadoUsuario = "Turno del usuario";
const estadoInicio = "Tocá 'Comenzar' para jugar!";
const estadoReinicio = "Perdiste! tocá 'Reiniciar' para volver a jugar.";

actualizarEstado(estadoInicio);
const $comenzar = document.querySelector("#comenzar");

$comenzar.addEventListener("click", function () {
	ronda = 0;
	reiniciarSecuenciaMaquina();
	reiniciarSecuenciaUsuario();
	bloqueado = true;
	ocultarComenzar();
	actualizarEstado(estadoMaquina);
	actualizarRonda(ronda);
	manejarTurnoMaquina();
});

const $items = document.querySelectorAll(".item");

function agregarListeners() {
	for (let i = 0; i < $items.length; i++) {
		const $item = $items[i];
		$item.addEventListener("click", function () {
			const color = this.dataset.color;
			manejarTurnoUsuario(color);
		});
	}
}

agregarListeners();

function resaltarCuadro(cuadro) {
	const item = document.querySelector("." + cuadro);
	const delay_in_ms = 500;
	item.style.opacity = 1;
	setTimeout(() => {
		item.style.opacity = 0.3;
	}, delay_in_ms);
}

function elegirColorAleatorio(colores) {
	const indiceAleatorio = Math.floor(Math.random() * colores.length);
	return colores[indiceAleatorio];
}

function manejarTurnoMaquina() {
	actualizarRonda(++ronda);
	bloqueado = true;

	const colorAleatorio = elegirColorAleatorio(colores);

	agregarItemSecuencia(colorAleatorio, secuenciaMaquina);

	for (let i = 0; i < secuenciaMaquina.length; i++) {
		setTimeout(() => {
			resaltarCuadro(secuenciaMaquina[i]);
			if (i === secuenciaMaquina.length - 1) {
				setTimeout(() => {
					bloqueado = false;
					actualizarEstado(estadoUsuario);
				}, 500);
			}
		}, 1000 * i + 1);
	}
}

function manejarTurnoUsuario(color) {
	if (bloqueado) return;
	resaltarCuadro(color);
	agregarItemSecuencia(color, secuenciaUsuario);
	compararSecuencia(color);
}

function agregarItemSecuencia(item, secuencia) {
	secuencia.push(item);
}

function compararSecuencia(color) {
	if (color !== secuenciaMaquina[secuenciaUsuario.length - 1]) {
		reiniciarJuego();
	} else if (secuenciaMaquina.length === secuenciaUsuario.length) {
		setTimeout(() => {
			actualizarEstado(estadoMaquina);
			continuarJuego();
		}, 1000);
	}
}

function reiniciarSecuenciaUsuario() {
	secuenciaUsuario = [];
}

function reiniciarSecuenciaMaquina() {
	secuenciaMaquina = [];
}

function reiniciarJuego() {
	bloqueado = true;
	actualizarComenzar();
	actualizarEstado(estadoReinicio);
}

function continuarJuego() {
	reiniciarSecuenciaUsuario();
	manejarTurnoMaquina();
}

function actualizarRonda(numeroRonda) {
	const $ronda = document.querySelector("#ronda");
	$ronda.textContent = `Ronda ${numeroRonda}`;
}

function actualizarEstado(estado) {
	const $estado = document.querySelector("#estado");
	$estado.textContent = estado;
}

function ocultarComenzar() {
	$comenzar.style.display = "none";
}

function actualizarComenzar() {
	$comenzar.textContent = "Reiniciar";
	$comenzar.style.display = "block";
}
