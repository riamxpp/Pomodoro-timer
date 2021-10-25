// import timer from './module/timer.js'
import Timer from './module/Timer.js'

const btnIniciar = document.querySelector('[data-iniciar]');
const btnPausar = document.querySelector('[data-pausar]');
const btnResetar = document.querySelector('[data-resetar]');
const timerHtml = document.querySelector('.timer');
const timer = new Timer(btnIniciar, btnPausar, btnResetar, timerHtml).init();

