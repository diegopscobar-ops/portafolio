const techs = document.querySelectorAll('.tech');
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tech = entry.target;
      const progress = parseInt(tech.dataset.progress);
      const color = tech.dataset.color;
      const fill = tech.querySelector('.bar-fill');
      const percent = tech.querySelector('.bar-percent');
      fill.style.background = `linear-gradient(90deg, ${color}88, ${color})`;
      fill.style.boxShadow = `0 0 8px ${color}66`;
      setTimeout(() => {
        fill.style.width = progress + '%';
        let current = 0;
        const duration = 1600;
        const steps = progress;
        const stepTime = duration / steps;
        const interval = setInterval(() => {
          if (current >= progress) {
            clearInterval(interval);
          } else {
            current++;
            percent.textContent = current + '%';
          }
        }, stepTime);
      }, 100);
      techObserver.unobserve(tech);
    }
  });
}, { threshold: 0.3 });
techs.forEach(tech => techObserver.observe(tech));

const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
hamburguesa.addEventListener('click', () => {
  menu.classList.toggle('abierto');
  const icono = hamburguesa.querySelector('i');
  icono.classList.toggle('fa-bars');
  icono.classList.toggle('fa-xmark');
});
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('abierto');
    const icono = hamburguesa.querySelector('i');
    icono.classList.add('fa-bars');
    icono.classList.remove('fa-xmark');
  });
});

const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .tech, .proyecto-scene').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-fill');
let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    loaderFill.style.width = '100%';
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('oculto');
      heroAnim();
    }, 400);
  }
  loaderFill.style.width = progress + '%';
}, 80);

function heroAnim() {
  const titulo = document.querySelector('.titulo');
  const badge = document.querySelector('.bage');
  const h2 = document.querySelector('.contenido-inicio h2');
  const desc = document.querySelector('.contenido-inicio p');
  const btn = document.querySelector('.bnt-cv');

  const fadeUp = (el, delay, duration = 600) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  };

  fadeUp(titulo, 0, 700);
  fadeUp(badge, 150, 600);

  if (h2) {
    h2.style.opacity = '0';
    h2.style.display = 'flex';
    h2.style.flexDirection = 'column';
    h2.style.gap = '0px';
    h2.innerHTML = `
      <div style="overflow:hidden;line-height:1.15;">
        <div id="hl1" style="transform:translateY(110%);transition:transform 0.85s cubic-bezier(.16,1,.3,1) 350ms;">Dev /</div>
      </div>
      <div style="overflow:hidden;line-height:1.15;">
        <div id="hl2" style="transform:translateY(110%);transition:transform 0.85s cubic-bezier(.16,1,.3,1) 520ms;"><em>Junior en</em></div>
      </div>
      <div style="overflow:hidden;line-height:1.15;">
        <div id="hl3" style="transform:translateY(110%);transition:transform 0.85s cubic-bezier(.16,1,.3,1) 680ms;"><em>formación</em></div>
      </div>
    `;
    h2.style.opacity = '1';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById('hl1').style.transform = 'translateY(0)';
      document.getElementById('hl2').style.transform = 'translateY(0)';
      document.getElementById('hl3').style.transform = 'translateY(0)';
    }));
  }

  fadeUp(desc, 900, 700);
  fadeUp(btn ? btn.closest('a') || btn : null, 1100, 600);
}

const animStyle = document.createElement('style');
animStyle.textContent = `
  .slide-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.8s cubic-bezier(.16,1,.3,1),
                transform 0.8s cubic-bezier(.16,1,.3,1);
  }
  .slide-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.8s cubic-bezier(.16,1,.3,1),
                transform 0.8s cubic-bezier(.16,1,.3,1);
  }
  .slide-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
                transform 0.75s cubic-bezier(.16,1,.3,1);
  }
  .slide-left.in, .slide-right.in, .slide-up.in {
    opacity: 1;
    transform: translate(0);
  }
`;
document.head.appendChild(animStyle);

function addAnim(selector, cls, stagger = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add(cls);
    el._delay = i * stagger;
  });
}

addAnim('#sobre-mi .foto', 'slide-left');
addAnim('#sobre-mi .texto', 'slide-right');
addAnim('.stack-header', 'slide-up');
addAnim('.stack-categoria', 'slide-up', 120);
addAnim('#proyectos h2', 'slide-up');
addAnim('#proyectos > p', 'slide-up');
addAnim('#cv .cv-header', 'slide-up');
addAnim('#cv .cv-left', 'slide-left');
addAnim('#cv .cv-right', 'slide-right');
addAnim('.cv-footer-btn', 'slide-up');
addAnim('.footer-titulo', 'slide-up');
addAnim('.footer-sub', 'slide-up');
addAnim('.footer-links', 'slide-up');
addAnim('.footer-bottom', 'slide-up');

document.querySelectorAll('.proyecto-scene').forEach((el, i) => {
  el.classList.add(i % 2 === 0 ? 'slide-left' : 'slide-right');
  el._delay = i * 150;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      setTimeout(() => el.classList.add('in'), el._delay || 0);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.slide-left, .slide-right, .slide-up').forEach(el => {
  revealObserver.observe(el);
});

(function(){
  var c=document.getElementById('hero-canvas');
  if(!c)return;
  var g=c.getContext('2d');
  var section=document.getElementById('inicio');

  function resize(){
    c.width=section.offsetWidth;
    c.height=section.offsetHeight;
  }
  resize();
  window.addEventListener('resize',resize);

  var stars=Array.from({length:38},function(){return{
    x:Math.random(),y:Math.random(),
    r:Math.random()<0.15?Math.random()*1.2+0.8:Math.random()*0.5+0.1,
    a:Math.random()*0.35+0.1,
    tw:Math.random()*Math.PI*2,
    sp:Math.random()*0.004+0.001
  };});

  var planet={rx:0.78,ry:0.22,r:28};
  var horizon={ry:0.68};
  var dust=[
    {rx:0.75,ry:0.25,r:180,a:0.07},
    {rx:0.15,ry:0.60,r:140,a:0.05},
    {rx:0.55,ry:0.85,r:160,a:0.04}
  ];
  var special={rx:0.32,ry:0.14,tw:0};

  function drawSpecialStar(W,H,pulse){
    var sx=special.rx*W,sy=special.ry*H;
    var a=0.75+0.25*Math.sin(pulse);
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
      var gr=g.createLinearGradient(sx,sy,sx+d[0]*18,sy+d[1]*18);
      gr.addColorStop(0,'rgba(255,255,255,'+a*0.6+')');
      gr.addColorStop(1,'rgba(255,255,255,0)');
      g.strokeStyle=gr;g.lineWidth=0.6;
      g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+d[0]*18,sy+d[1]*18);g.stroke();
    });
    [[1,1],[-1,1],[1,-1],[-1,-1]].forEach(function(d){
      var gr=g.createLinearGradient(sx,sy,sx+d[0]*10,sy+d[1]*10);
      gr.addColorStop(0,'rgba(255,255,255,'+a*0.25+')');
      gr.addColorStop(1,'rgba(255,255,255,0)');
      g.strokeStyle=gr;g.lineWidth=0.4;
      g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+d[0]*10,sy+d[1]*10);g.stroke();
    });
    var halo=g.createRadialGradient(sx,sy,0,sx,sy,22);
    halo.addColorStop(0,'rgba(200,215,255,'+a*0.12+')');
    halo.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=halo;g.beginPath();g.arc(sx,sy,22,0,Math.PI*2);g.fill();
    var core=g.createRadialGradient(sx,sy,0,sx,sy,4.8);
    core.addColorStop(0,'rgba(255,255,255,'+a+')');
    core.addColorStop(0.4,'rgba(220,230,255,'+a*0.5+')');
    core.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=core;g.beginPath();g.arc(sx,sy,4.8,0,Math.PI*2);g.fill();
    g.beginPath();g.arc(sx,sy,1.6,0,Math.PI*2);
    g.fillStyle='rgba(255,255,255,'+a+')';g.fill();
  }

  function draw(){
    var W=c.width,H=c.height;
    special.tw+=0.012;
    g.clearRect(0,0,W,H);

    dust.forEach(function(d){
      var grd=g.createRadialGradient(d.rx*W,d.ry*H,0,d.rx*W,d.ry*H,d.r);
      grd.addColorStop(0,'rgba(140,170,255,'+d.a+')');
      grd.addColorStop(1,'rgba(0,0,0,0)');
      g.fillStyle=grd;g.beginPath();g.arc(d.rx*W,d.ry*H,d.r,0,Math.PI*2);g.fill();
    });

    stars.forEach(function(s){
      s.tw+=s.sp;
      var a=s.a*(0.6+0.4*Math.sin(s.tw));
      g.beginPath();g.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);
      g.fillStyle='rgba(210,225,255,'+a+')';g.fill();
    });

    drawSpecialStar(W,H,special.tw);

    var px=planet.rx*W,py=planet.ry*H;
    g.beginPath();g.arc(px,py,planet.r,0,Math.PI*2);
    g.fillStyle='#0d0d22';g.fill();
    var rim=g.createRadialGradient(px-8,py-8,2,px,py,planet.r);
    rim.addColorStop(0,'rgba(120,160,255,0.22)');
    rim.addColorStop(1,'rgba(0,0,0,0)');
    g.beginPath();g.arc(px,py,planet.r,0,Math.PI*2);
    g.fillStyle=rim;g.fill();
    g.beginPath();g.arc(px,py,planet.r,0,Math.PI*2);
    g.strokeStyle='rgba(100,140,255,0.1)';g.lineWidth=0.8;g.stroke();

    var hy=horizon.ry*H;
    var hl=g.createLinearGradient(0,hy,W,hy);
    hl.addColorStop(0,'rgba(100,140,255,0)');
    hl.addColorStop(0.3,'rgba(100,140,255,0.15)');
    hl.addColorStop(0.7,'rgba(100,140,255,0.15)');
    hl.addColorStop(1,'rgba(100,140,255,0)');
    g.fillStyle=hl;g.fillRect(0,hy,W,0.8);

    var v=g.createRadialGradient(W/2,H/2,H*0.1,W/2,H/2,H*0.9);
    v.addColorStop(0,'rgba(5,5,13,0)');
    v.addColorStop(1,'rgba(3,3,10,0.82)');
    g.fillStyle=v;g.fillRect(0,0,W,H);

    requestAnimationFrame(draw);
  }
  draw();
})();