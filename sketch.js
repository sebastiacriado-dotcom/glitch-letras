let word   = '';
let chars  = [];
let archive = [];

const SYM  = '░▒▓█▀▄▌▐■□◙♦♣♠♥†‡§¶‰™©←→↑↓↔∞≠≈±÷√∑∫∂∆∇∀∃∈∉⊕⊗⊥∧∨⟨⟩⌊⌋⌈⌉─│◊●◐◑◒◓▪€£¥¿¡';
const RATE  = 4;
const COLS  = 6;
const FSIZE = 12;
const LHEIGHT = 18;
const PADDING = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Times New Roman');
  noStroke();

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
      word = word.slice(0, -1);
      chars.pop();
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      if (word.trim().length > 0) {
        archive.push(word);
      }
      word  = '';
      chars = [];
      e.preventDefault();
    }
  });

  document.addEventListener('keypress', function(e) {
    if (e.key.length === 1) {
      word += e.key;
      chars.push({ base: e.key, glyph: '', on: false, dy: 0 });
    }
  });
}

function draw() {
  background(255);

  // ── Texto central grande ──────────────────────────────
  if (word.length === 0) {
    fill(0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(frameCount % 60 < 35 ? '|' : '', width / 2, height / 2);
  } else {
    let fs = min(width * 0.88 / word.length, height * 0.55, 220);
    textSize(fs);
    textAlign(LEFT, CENTER);

    if (frameCount % RATE === 0) {
      for (let i = 0; i < chars.length; i++) {
        let t         = frameCount * 0.025 + i * 1.3;
        let wave      = sin(t) * sin(t * 0.37 + i);
        let intensity = (wave + 1) / 2;
        chars[i].on = intensity > 0.52 && random() < 0.8;
        if (chars[i].on) {
          chars[i].glyph = SYM[floor(random(SYM.length))];
          chars[i].dy    = random(-fs * 0.04, fs * 0.04);
        }
      }
    }

    let total = chars.reduce((sum, c) => sum + textWidth(c.base), 0);
    let x = width / 2 - total / 2;

    for (let i = 0; i < chars.length; i++) {
      let c = chars[i];
      fill(0);
      text(c.on ? c.glyph : c.base, x, height / 2 + (c.on ? c.dy : 0));
      x += textWidth(c.base);
    }
  }

  // ── Archivo en columnas (blend: difference) ───────────
  if (archive.length === 0) return;

  let colWidth   = (width - PADDING * 2) / COLS;
  let maxPerCol  = floor((height - PADDING * 2) / LHEIGHT);

  drawingContext.globalCompositeOperation = 'difference';
  textSize(FSIZE);
  textAlign(LEFT, TOP);
  fill(255); // blanco + difference = negro sobre blanco, blanco sobre negro

  for (let i = 0; i < archive.length; i++) {
    let col = floor(i / maxPerCol);
    let row = i % maxPerCol;
    if (col >= COLS) break; // límite máximo de palabras visibles

    let x = PADDING + col * colWidth;
    let y = PADDING + row * LHEIGHT;
    text(archive[i], x, y);
  }

  drawingContext.globalCompositeOperation = 'source-over';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}