let escribiendo = false;

let aceptar, rechazar, textoElemento, titulo;

let progreso = 0;
let ultimoTiempo = 0;

const baseW = 90;
const baseH = 32;

const velocidad = 0.02;

// ---------------- COLORES IMPRESIÓN ----------------
const colores = [
  "#009540",
  "#E5007E",
  "#E20613",
  "#FFEC00"
];

let colorActual = 0;
let ultimoCambioColor = 0;

// ---------------- ACTIVACIÓN GLOBAL ----------------
let activacion = 0;

// ---------------- TEXTO BASE ----------------
const textoInicial = `Al acceder, seguir o interactuar con nuestras redes sociales oficiales, aceptas los presentes términos y condiciones de uso. Nuestros perfiles tienen como finalidad compartir información, contenido, novedades y comunicaciones relacionadas con nuestra marca, productos o servicios, por lo que solicitamos a todos los usuarios mantener un comportamiento respetuoso y adecuado. No se permitirá la publicación de contenidos ofensivos, discriminatorios, difamatorios, violentos, ilegales, engañosos o que vulneren derechos de terceros, así como mensajes publicitarios no autorizados, spam o cualquier material inapropiado. Nos reservamos el derecho de eliminar comentarios, restringir interacciones o bloquear usuarios que incumplan estas normas. Todo el contenido publicado en nuestras redes sociales, incluyendo textos, imágenes, vídeos, logotipos, diseños y demás materiales, es propiedad de [NOMBRE DE LA EMPRESA/MARCA] o cuenta con las autorizaciones correspondientes, quedando prohibida su reproducción, distribución o uso sin autorización previa. Cada usuario será responsable de los contenidos y opiniones que publique, eximiendo a [NOMBRE DE LA EMPRESA/MARCA] de cualquier responsabilidad derivada de las manifestaciones realizadas por terceros. Asimismo, recomendamos no compartir datos personales o información confidencial a través de comentarios públicos o mensajes directos. El tratamiento de los datos personales se realizará conforme a la normativa vigente en materia de protección de datos y de acuerdo con nuestra Política de Privacidad. En caso de realizar promociones, sorteos o concursos en redes sociales, estos estarán sujetos a condiciones particulares que se comunicarán oportunamente, sin que las plataformas sociales tengan responsabilidad alguna en dichas acciones. [NOMBRE DE LA EMPRESA/MARCA] se reserva el derecho de modificar estos términos y condiciones en cualquier momento y sin previo aviso. Para cualquier consulta o información adicional, puedes contactarnos a través de [EMAIL], [WEB] o nuestros canales oficiales de atención.`;

// ---------------- GENERACIÓN ----------------
const inicios = [
  "El acceso continuado a nuestras plataformas",
  "La interacción con nuestros servicios digitales",
  "El uso recurrente de nuestros canales oficiales"
];

const sujetos = [
  "implica la aceptación automática",
  "conlleva conformidad expresa",
  "establece aceptación implícita"
];

const condiciones = [
  "de nuestras políticas de uso",
  "de las normas de privacidad",
  "de los criterios de conducta digital"
];

const acciones = [
  "Nos reservamos el derecho de modificar contenido",
  "Podemos restringir interacciones inapropiadas",
  "Se podrá eliminar contenido ofensivo"
];

let buffer = textoInicial;
let fraseActual = "";
let indice = 0;

// ---------------- SETUP ----------------
function setup() {

  noCanvas();

  document.body.style.margin = "8px";
  document.body.style.fontFamily = "serif";
  document.body.style.transition = "background 0.4s linear";

  titulo = createElement('h1', 'Términos y condiciones');

  textoElemento = createP(textoInicial);

  // ---------------- RESPONSIVE TEXTO ----------------
  let textoSize = min(windowWidth * 0.045, 22);

  textoElemento.style('font-size', textoSize + 'px');

  textoElemento.style('line-height', '1.4');
  textoElemento.style('margin-top', '70px');

  let botones = createDiv();

  botones.style('position', 'fixed');
  botones.style('top', '90px');
  botones.style('left', '8px');
  botones.style('z-index', '999');

  // ---------------- RECHAZAR ----------------
  rechazar = createButton('Rechazar');

  rechazar.parent(botones);

  setBotonPequeno(rechazar, baseW + 6);

  rechazar.style('z-index', '0');

  rechazar.mouseOver(() => {
    rechazar.style('opacity', '0');
  });

  rechazar.mouseOut(() => {
    rechazar.style('opacity', '1');
  });

  // ---------------- ACEPTAR ----------------
  aceptar = createButton('Aceptar');

  aceptar.parent(botones);

  setBotonPequeno(aceptar, 0);

  aceptar.style('z-index', '1');

  aceptar.mouseOver(() => {

    escribiendo = true;

    ultimoTiempo = millis();
  });

  aceptar.mouseOut(() => {

    escribiendo = false;

    progreso = 0;

    activacion = 0;

    resetUI();
  });

  // ---------------- LOOP ----------------
  setInterval(() => {

    if (!escribiendo) return;

    let ahora = millis();

    let delta = (ahora - ultimoTiempo) / 1000;

    ultimoTiempo = ahora;

    progreso += delta * velocidad;

    if (progreso > 1) progreso = 1;

    aplicarEfectos();

    generarTexto();

  }, 16);
}

// ---------------- GENERACIÓN LETRA A LETRA ----------------
function generarTexto() {

  let velocidadTexto = floor(
    lerp(1, 12, activacion)
  );

  for (let i = 0; i < velocidadTexto; i++) {

    if (indice >= fraseActual.length) {

      fraseActual = generarFrase();

      indice = 0;
    }

    buffer += fraseActual.charAt(indice);

    indice++;
  }

  textoElemento.html(buffer);

  // ---------------- AUTO SCROLL ----------------
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function generarFrase() {

  return (
    random(inicios) + " " +
    random(sujetos) + " " +
    random(condiciones) + ". " +
    random(acciones) + ". "
  );
}

// ---------------- UI ----------------
function setBotonPequeno(btn, x) {

  btn.style('position', 'absolute');
  btn.style('top', '0px');
  btn.style('left', x + 'px');
  btn.style('width', baseW + 'px');
  btn.style('height', baseH + 'px');
}

// ---------------- RESET ----------------
function resetUI() {

  aceptar.style('width', baseW + 'px');
  aceptar.style('height', baseH + 'px');

  aceptar.style('filter', 'none');
  aceptar.style('opacity', '1');

  document.body.style.background = 'white';

  titulo.style('color', 'black');

  textoElemento.html(buffer);

  aceptar.style('background', '');

  aceptar.style('color', 'black');

  rechazar.style('background', '');

  rechazar.style('color', 'black');

  rechazar.style('opacity', '1');
}

// ---------------- EFECTOS ----------------
function aplicarEfectos() {

  let maxW = windowWidth - 16;

  // crecimiento
  let w = lerp(baseW, maxW, progreso);

  let h = lerp(baseH, windowHeight * 1.5, progreso);

  aceptar.style('width', w + 'px');

  aceptar.style('height', h + 'px');

  // porcentaje de crecimiento
  let activacionCorrupcion = w / maxW;

  // ---------------- ACTIVACIÓN PROGRESIVA ----------------
  activacion = map(
    activacionCorrupcion,
    0.2,
    1,
    0,
    1,
    true
  );

  // curva suave → explosiva
  activacion = pow(activacion, 0.35);

  // ---------------- CAMBIO COLOR LENTO ----------------
  let intervaloColor = lerp(1200, 120, activacion);

  if (millis() - ultimoCambioColor > intervaloColor) {

    colorActual++;

    ultimoCambioColor = millis();
  }

  // colores independientes
  let c1 = colores[colorActual % colores.length];
  let c2 = colores[(colorActual + 1) % colores.length];
  let c3 = colores[(colorActual + 2) % colores.length];
  let c4 = colores[(colorActual + 3) % colores.length];

  // mezcla progresiva
  let fondo = lerpColor(
    color(255),
    color(c1),
    activacion
  );

  let tituloColor = lerpColor(
    color(0),
    color(c2),
    activacion
  );

  let aceptarColor = lerpColor(
    color(255),
    color(c3),
    activacion
  );

  let rechazarColor = lerpColor(
    color(255),
    color(c4),
    activacion
  );

  document.body.style.background = fondo.toString();

  titulo.style('color', tituloColor.toString());

  aceptar.style('background', aceptarColor.toString());

  aceptar.style('color', 'black');

  rechazar.style('background', rechazarColor.toString());

  rechazar.style('color', 'black');

  // ---------------- CORRUPCIÓN TEXTO ----------------
  let original = buffer;

  let corrupted = "";

  for (let i = 0; i < original.length; i++) {

    let char = original[i];

    if (random() < activacion * progreso * 0.001) {

      char = random(['#', '%', '&', '§', '@']);
    }

    corrupted += char;
  }

  textoElemento.html(corrupted);

  // ---------------- BOTÓN ACEPTAR ----------------
  aceptar.style(
    'filter',
    `blur(${activacion * progreso * 100}px)`
  );

  aceptar.style(
    'opacity',
    1 - activacion * progreso * 0.2
  );
}