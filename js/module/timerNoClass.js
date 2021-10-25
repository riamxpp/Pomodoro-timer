// export default function timer(){
//   let min = 25
//   let sec = 0
//   let minSecTotal = []
//   let intervalo;
//   let vendoIntervalo;
//   let timer = document.querySelector('.timer');
//   let sessaoOrPausa = document.querySelector('[data-sessao="pausa"]');

//   const btnIniciar = document.querySelector('[data-iniciar]');
//   btnIniciar.addEventListener('click', iniciar);

//   function iniciar(){
//     sessaoOrPausa.innerText = 'Sessão'
//     if(!vendoIntervalo){
//       intervalo = setInterval(contando, 1000); 
//       vendoIntervalo = true;
//     }
//     minSecTotal.push(min);
//   }

//   const btnPausar = document.querySelector('[data-pausar]');
//   btnPausar.addEventListener('click', pausar);
//   function pausar(){  
//     sec = sec;
//     min = min;
//     clearInterval(intervalo);
//     vendoIntervalo = false;
//     btnIniciar.innerText = '▶ Iniciar'
//     timer.innerText = `${min}:${sec}`
//   }

//   const btnResetar = document.querySelector('[data-resetar]');
//   btnResetar.addEventListener('click', resetar);
//   function resetar(){
//     clearInterval(intervalo);
//     vendoIntervalo = false;
//     if(minSecTotal.length === 1){
//       min = minSecTotal[0];
//       minSecTotal.push();
//     }else {
//       min = 25
//     }
//     sec = 59
//     timer.innerText = `${min}:00`
//     minSecTotal.pop();
//   }

//   let resolvendoBugDoZero;
//   function contando(){
//     if(sec === 0){
//       min--
//       if(min === 0 && sec ===0){
//         iniciarDescanco();
//         clearInterval(intervalo);
//         return 
//       }
//       resolvendoBugDoZero = true
//     }

//     if(resolvendoBugDoZero && min === minSecTotal[0] - 1) {
//       resolvendoBugDoZero = false
//       sec = 59
//       timer.innerText = `${min}:${sec}`;
//     }else if(resolvendoBugDoZero){
//       resolvendoBugDoZero = false
//       timer.innerText = `${min}:0${sec}`;
//       sec = 59
//     }else if(sec > 9) {
//       timer.innerText = `${min}:${sec}`
//       sec--
//     }else {
//       timer.innerText = `${min}:0${sec}`
//       sec--
//     };
//   }
//   //Tamanho da sessão
//   const tempoSessao = document.querySelector('.tempo-sessao');
//   const adicionandoSpanSessao = [];

//   const aumentarSessao = document.querySelector('[data-aumentar="sessao"]');
//   aumentarSessao.addEventListener('click', adicionandoTempoSessao);

//   function adicionandoTempoSessao(){
//     if(vendoIntervalo){
//       return
//     }else {
//       if(min === 60 || min > 60){
//         min = 60
//         timer.innerText = `${min}:00`
//         tempoSessao.innerText = `${min}m`
//         const span = criandoSpan('Tempo máximo atingido');
//         if(adicionandoSpanSessao.length === 0){
//           adicionandoSpanSessao.push(span);
//           timer.parentNode.appendChild(span);      
//         }
//         return
//       }
//       min += 5
//       timer.innerText = `${min}:00`
//       tempoSessao.innerText = `${min}m`
//     }
//   }

//   const diminuirSessao = document.querySelector('[data-diminuir="sessao"]');
//   diminuirSessao.addEventListener('click', diminuirTempoSessao);

//   function diminuirTempoSessao(){
//     if(vendoIntervalo){
//       return
//     }else {
//       if(adicionandoSpanSessao.length === 1){
//         adicionandoSpanSessao.pop();
//         timer.parentNode.removeChild(timer.parentNode.lastChild);
//       }
//       if(min === 5){
//         min = 5;
//         timer.innerText = `${min}:00`;
//         tempoSessao.innerText = `${min}m`;
//         return
//       }
//       min -= 5
//       timer.innerText = `${min}:00`;
//       tempoSessao.innerText = `${min}m`;
//     }
//   }
//   //Pausa/Descanço
//   let descanco;
//   let arrayDescanco = []
//   function iniciarDescanco(){
//     sessaoOrPausa.innerText = 'Descanço'
//     timer.innerText = `${pausaMin}:00`;
//     if(!vendoDescanco){
//       arrayDescanco.push(pausaMin);
//       descanco = setInterval(contandoDescando, 1000);
//       vendoDescanco = true
//     }
//   }
//   // Tamanho da pausa
//   let pausaMin = 10;
//   let pausaSec = 0;
//   let avisoTempoDescanco = [];
//   let vendoDescanco;

//   const tempoPausa = document.querySelector('.tempo-pausa'); 
//   const aumentarPausa = document.querySelector('[data-aumentar="pausa"]');
//   aumentarPausa.addEventListener('click', adicionandoTempoPausa);

//   function adicionandoTempoPausa(){
//     if(vendoDescanco){
//       return
//     }else {
//       if(pausaMin === 30){
//         const span = criandoSpan('Tempo máximo de descanço atingido');
//         if(avisoTempoDescanco.length === 0){
//           avisoTempoDescanco.push(span);
//           timer.parentNode.appendChild(span);      
//         }
//         return
//       }
//       pausaMin += 5
//       tempoPausa.innerText = `${pausaMin}m`;
//     }
//   }

//   const diminuirPausa = document.querySelector('[data-diminuir="pausa"]');
//   diminuirPausa.addEventListener('click', diminuirTempoPausa);

//   function diminuirTempoPausa(){
//     if(vendoDescanco){
//       return
//     }else {
//       if(avisoTempoDescanco.length === 1){
//         avisoTempoDescanco.pop();
//         timer.parentNode.removeChild(timer.parentNode.lastChild);
//       }
//       if(pausaMin === 5) return
    
//       pausaMin -= 5
//       tempoPausa.innerText = `${pausaMin}m`
//     }
//   }

//   let resolvendoBugDoZeroPausa;
//   function contandoDescando(){
//     if(pausaSec === 0){
//       pausaMin--
//       if(pausaMin === 0 && pausaSec === 0){
//         clearInterval(descanco);  
//         if(minSecTotal){
//           vendoIntervalo = false
//           //Sessao
//           timer.innerText =  `${minSecTotal[0]}:00`;
//           sessaoOrPausa.innerText = 'Sessão';
//           min = minSecTotal[0]
//           sec = 0
//           minSecTotal.pop();
//           //Descanço
//           pausaMin = arrayDescanco[0]
//           arrayDescanco.pop();
//         }else {
//           clearInterval(descanco);  
//           vendoIntervalo = false
//           sessaoOrPausa.innerText = 'Sessão';
//           timer.innerText =  `25:00`;
//           min = 25
//           sec = 0
//         }
//       }
//       resolvendoBugDoZeroPausa = true
//     }

//     if(resolvendoBugDoZeroPausa && pausaMin == arrayDescanco[0] - 1){
//       resolvendoBugDoZeroPausa = false;
//       pausaSec = 59
//       timer.innerText = `${pausaMin}:${pausaSec}`;
//     }else if(resolvendoBugDoZeroPausa){
//       resolvendoBugDoZeroPausa = false
//       timer.innerText = `${pausaMin}:0${pausaSec}`
//       pausaSec = 59
//       // console.log(pausaMin, ':', pausaSec);
//     }else if (pausaSec < 10 ){
//       timer.innerText = `${pausaMin}:0${pausaSec}`
//       pausaSec--
//     }else {
//       timer.innerText = `${pausaMin}:${pausaSec}`;
//       pausaSec--
//     }
//   }

//   function criandoSpan(text){
//     const span = document.createElement('span');
//     span.innerText = text;
//     //dando alguns estilos ao span
//     span.style.color = 'white';
//     span.style.display = 'block';
//     span.style.marginTop = 5 + 'px';
//     return span
//   }
// }
