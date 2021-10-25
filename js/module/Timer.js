export default class Timer {
  constructor(btnIniciar, btnPausar, btnResetar, timer){
    this.btnIniciar = btnIniciar;
    this.btnPausar = btnPausar;
    this.btnResetar = btnResetar;
    this.timer = timer;
    this.min = 25;
    this.sec = 0;
    this.minSecTotal = [];
    this.vendoIntervalo;
    this.interval;
  }
  // Inicia minha sessão
  iniciar(){
    this.sessaoOrPausa.innerText = 'Sessão'
    if(!this.vendoIntervalo){
      this.intervalo = setInterval(this.contando, 1000); 
      this.vendoIntervalo = true;
    }
    this.minSecTotal.push(this.min);
  }
  // Pausa minha sessão
  pausar(){  
    this.sec = this.sec;
    this.min = this.min;
    clearInterval(this.intervalo);
    this.vendoIntervalo = false;
    this.btnIniciar.innerText = '▶ Iniciar'
    this.timer.innerText = `${this.min}:${this.sec}`
  }
  // Reseta minha sessão
  resetar(){
    clearInterval(this.intervalo);
    this.vendoIntervalo = false;
    if(this.minSecTotal.length === 1){
      this.min = this.minSecTotal[0];
      this.minSecTotal.pop();
    }else {
      this.min = 25
    }
    this.sec = 59
    this.timer.innerText = `${this.min}:00`
  }
  // Tempo da sessão
  contando(){
    if(this.sec === 0){
      this.min--
      if(this.min === 0 && this.sec ===0){
        clearInterval(this.intervalo);
        this.iniciarDescanco();
        this.vendoDescanco = false;
        return 
      }
      this.resolvendoBugDoZero = true;
    }
    
    if(this.resolvendoBugDoZero && this.min === this.minSecTotal[0] - 1) {
      this.resolvendoBugDoZero = false;
      this.sec = 59;
      this.timer.innerText = `${this.min}:${this.sec}`;
    }else if(this.resolvendoBugDoZero){
      this.resolvendoBugDoZero = false;
      this.timer.innerText = `${this.min}:0${this.sec}`;
      this.sec = 59;
    }else if(this.sec > 9) {
      this.timer.innerText = `${this.min}:${this.sec}`
      this.sec--
    }else {
      this.timer.innerText = `${this.min}:0${this.sec}`
      this.sec--
    };
  }
  // Itens adicionais para manipular minha sessão e tempo de descanço
  aumentaDiminuiSessaoEPausa(){
    this.aumentaSessao = document.querySelector('[data-aumentar="sessao"]');
    this.diminuiSe = document.querySelector('[data-diminuir="sessao"]');
    this.textSesso = document.querySelector('.tempo-sessao');
    this.aumentaPa = document.querySelector('[data-aumentar="pausa"]');
    this.diminuiPa = document.querySelector('[data-diminuir="pausa"]');
    this.tempoPausa = document.querySelector('.tempo-pausa');
    this.sessaoOrPausa = document.querySelector('[data-sessao="pausa"]');
    this.adicionandoSpanSessao = [];
    this.arrayDescanco = [];
    this.descanco;
    this.pausaMin = 10;
    this.pausaSec = 0;
    this.avisoTempoDescanco = [];
    this.vendoDescanco;
    this.resolvendoBugDoZeroPausa;
  }
  // Aumenta o tempo de descanço
  adicionandoTempoSessao(){
    if(this.vendoIntervalo){
      return
    }else {
      if(this.min === 60 || this.min > 60){
        this.min = 60;
        this.timer.innerText = `${this.min}:00`;
        this.textSesso.innerText = `${this.min}m`;
        const span = criandoSpan('Tempo máximo atingido');
        if(this.adicionandoSpanSessao.length === 0){
          this.adicionandoSpanSessao.push(span);
          this.timer.parentNode.appendChild(span);      
        }
        return
      }
      this.min += 5
      this.timer.innerText = `${this.min}:00`
      this.textSesso.innerText = `${this.min}m`
    }
  }
  // Inicia o tempo de descanço
  iniciarDescanco(){
    this.sessaoOrPausa.innerText = 'Descanço';
    this.timer.innerText = `${this.pausaMin}:00`;
    if(!this.vendoDescanco){
      this.arrayDescanco.push(this.pausaMin);
      this.descanco = setInterval(this.contandoDescando, 1000);
      this.vendoDescanco = true;
    }
  }
  // Adicionando Eventos
  addEventosItens(){
    this.btnIniciar.addEventListener('click', this.iniciar);
    this.btnPausar.addEventListener('click', this.pausar);
    this.btnResetar.addEventListener('click', this.resetar);

    this.aumentaSessao.addEventListener('click', this.adicionandoTempoSessao);
    this.diminuiSe.addEventListener('click', this.diminuirTempoSessao);
    this.aumentaPa.addEventListener('click', this.adicionandoTempoPausa);
    this.diminuiPa.addEventListener('click', this.diminuirTempoPausa);
  }
  // Aumenta o tempo da sessão
  adicionandoTempoSessao(){
    if(this.vendoIntervalo){
      return
    }else {
      if(this.min === 60 || this.min > 60){
        this.min = 60;
        this.timer.innerText = `${this.min}:00`;
        this.textSesso.innerText = `${this.min}m`;
        const span = this.criandoSpan('Tempo máximo atingido');
        if(this.adicionandoSpanSessao.length === 0){
          this.adicionandoSpanSessao.push(span);
          this.timer.parentNode.appendChild(span);      
        }
        return
      }
      this.min += 5;
      this.timer.innerText = `${this.min}:00`;
      this.textSesso.innerText = `${this.min}m`;
    }
  }
  // Diminui o tempo da sessão
  diminuirTempoSessao(){
    if(this.vendoIntervalo){
      return
    }else {
      if(this.adicionandoSpanSessao.length === 1){
        this.adicionandoSpanSessao.pop();
        this.timer.parentNode.removeChild(this.timer.parentNode.lastChild);
      }
      if(this.min === 5){
        this.min = 5;
        this.timer.innerText = `${this.min}:00`;
        this.textSesso.innerText = `${this.min}m`;
        return
      }
      this.min -= 5;
      this.timer.innerText = `${this.min}:00`;
      this.textSesso.innerText = `${this.min}m`;
    }
  }
  // Adiciona tempo de descanço
  adicionandoTempoPausa(){
    if(this.vendoDescanco){
      return
    }else {
      this.vendoDescanco = false;
      if(this.pausaMin === 30){
        const span = this.criandoSpan('Tempo máximo de descanço atingido');
        if(this.avisoTempoDescanco.length === 0){
          this.avisoTempoDescanco.push(span);
          this.timer.parentNode.appendChild(span);      
        }
        return
      }
      this.pausaMin += 5;
      this.tempoPausa.innerText = `${this.pausaMin}m`;
    }
  }
  // Diminui o tempo de descanço
  diminuirTempoPausa(){
    if(this.vendoDescanco){
      return
    }else {
      this.vendoDescanco = false;
      if(this.avisoTempoDescanco.length === 1){
        this.avisoTempoDescanco.pop();
        this.timer.parentNode.removeChild(this.timer.parentNode.lastChild);
      }
      if(this.pausaMin === 5) return
    
      this.pausaMin -= 5;
      this.tempoPausa.innerText = `${this.pausaMin}m`
    }
  }
  // Tempo de descanço
  contandoDescando(){
    if(this.pausaSec === 0){
      this.pausaMin--
      if(this.pausaMin === 0 && this.pausaSec === 0){
        clearInterval(this.descanco);  
        if(this.minSecTotal){
          console.log(this.vendoIntervalo);
          console.log(this.minSecTotal);
          this.vendoIntervalo = false;
          //Sessao
          this.timer.innerText =  `${this.minSecTotal[0]}:00`;
          this.sessaoOrPausa.innerText = 'Sessão';
          this.min = this.minSecTotal[0];
          this.sec = 0;
          this.minSecTotal.pop();
          //Descanço
          this.pausaMin = this.arrayDescanco[0];
          this.arrayDescanco.pop();
        }else {
          this.vendoIntervalo = false;
          this.sessaoOrPausa.innerText = 'Sessão';
          this.timer.innerText =  `25:00`;
          this.min = 25;
          this.sec = 0;
        }
      }
      this.resolvendoBugDoZeroPausa = true;
    }
    // Organiza meu segundos certos, corrige bugs como do 2:01 pular pra 1:59
    if(this.resolvendoBugDoZeroPausa && this.pausaMin == this.arrayDescanco[0] - 1){
      this.resolvendoBugDoZeroPausa = false;
      this.pausaSec = 59;
      this.timer.innerText = `${this.pausaMin}:${this.pausaSec}`;
    }else if(this.resolvendoBugDoZeroPausa){
      this.resolvendoBugDoZeroPausa = false;
      this.timer.innerText = `${this.pausaMin}:0${this.pausaSec}`;
      this.pausaSec = 59;
    }else if (this.pausaSec < 10 ){
      this.timer.innerText = `${this.pausaMin}:0${this.pausaSec}`;
      this.pausaSec--
    }else {
      this.timer.innerText = `${this.pausaMin}:${this.pausaSec}`;
      this.pausaSec--
    }
  }
  // Criando span para avisos ao usuario
  criandoSpan(text){
    const span = document.createElement('span');
    span.innerText = text;
    //dando alguns estilos ao span
    span.style.color = 'white';
    span.style.display = 'block';
    span.style.marginTop = 5 + 'px';
    return span
  }
  // Bindando todos os métodos que estão como callback
  bindEvents(){
    this.iniciar = this.iniciar.bind(this);
    this.pausar = this.pausar.bind(this);
    this.resetar = this.resetar.bind(this);
    this.contando = this.contando.bind(this);

    this.contandoDescando = this.contandoDescando.bind(this);
    this.adicionandoTempoSessao = this.adicionandoTempoSessao.bind(this);
    this.diminuirTempoSessao = this.diminuirTempoSessao.bind(this);
    this.adicionandoTempoPausa = this.adicionandoTempoPausa.bind(this);
    this.diminuirTempoPausa = this.diminuirTempoPausa.bind(this);
  }

  init(){
    this.bindEvents();
    this.aumentaDiminuiSessaoEPausa();
    this.addEventosItens();
    return this
  }
}
