let judul;
let nama;
let tombol;
let hello;
let objek;
let jalan = false;
let windForce;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('Jalankan/Pause')
  tombol.position(150,140)
  
  objekPos = createVector(width/10,height/2);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 15;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);

  windForce = createVector(0.5, 0);
}


function draw() {
  background(220);
  judul = createElement('h1', 'Simulasi Hukum Newton I')
  judul.position(50, 15)
  body = createElement('h3','Nama =' + 'Dinda Salsabila')
  body.position(50, 60)
  body = createElement('h3', 'NIM =' + '122160001')
  body.position(50, 80)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/10;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**15) *A1*Cd)

  
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}


function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('blue')
    ellipse(this.location.x, this.location.y, 4*this.mass, 2*this.mass);
    
  }  

  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }

}
