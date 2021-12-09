//Soundtrack credit:  https://magic-spark.itch.io/bits-of-chiptune
//Sound effects obtained from:  https://www.zapsplat.com

let myFont;

let threshold;

let sound_track, end_track, reward_sound, pain_sound;

let m_ava_img, f_ava_img, flower_avatar_img;

let slack_img, starbucks_img, zoom_img, email_img;

let scene0_X, scene0_Y; //start scene mouse
let scene2_X, scene2_Y; //action scene mouse
let scene3_X, scene3_Y; //ending scene mouse

let startButton;
let startButton_col;

let character;

let sceneNum;

let slacks = [];
let zooms = [];
let starbucks_cups = [];
let emails = [];


function preload() {
    sound_track = loadSound('sounds/Groovy.wav');
    end_track = loadSound('sounds/gameover.mp3');
    reward_sound = loadSound('sounds/ping.mp3');
    pain_sound = loadSound('sounds/ugh.mp3');

    myFont = loadFont('fonts/Minecraft.ttf');

    //***** Load images for START SCENE *****
    m_ava_img = loadImage('images/m_avatar.png');
    f_ava_img = loadImage('images/f_avatar.png');
    flower_avatar_img = loadImage('images/flower_avatar.png');

    //***** Load images for ACTION SCENE *****
    slack_img = loadImage('images/slack.png');
    starbucks_img = loadImage('images/starbucks.png');
    zoom_img = loadImage('images/zoom.png');
    email_img = loadImage('images/email.png');
}

//*******SETUP********
function setup() {

    var canvas = createCanvas(600, 600);
    // Move the canvas so it’s inside our <div id="sketch_holder">.
    canvas.parent('sketch_holder');

    sound_track.loop();

    threshold = 6;

    imageMode(CENTER);

    sceneNum = 0;

    noStroke();

    character = 0;

    score = 0;

    //*****START SCNENE AVATAR OPTIONS********
    m_avatar = new M_avatar(106, 313, 100, 100); //ellipse(this.x, this.y, this.r, this.r);
    f_avatar = new F_avatar(305, 313, 100, 100); //ellipse(this.x, this.y, this.r, this.r);
    flower_avatar = new Flower_avatar(490, 313, 120, 120);

    //*****ACTION SCNENE********
    m_empl = new M_empl(300, 415, 40, 40);
    f_empl = new F_empl(300, 415, 40, 40);
    flower_empl = new Flower_empl(300, 415, 50, 50);

    for (let j = 0; j < 6; j++) {
        starbucks_cups[j] = new Starbucks(random(width - 100), random(height - 100), 100, 100);
    }

    for (let s = 0; s < threshold; s++) {
        slacks[s] = new Slack(random(width - 100), random(height - 100), 30, 30);
    }

    for (let i = 0; i < threshold; i++) {
        zooms[i] = new Zoom(random(width - 100), random(height - 100), 30, 30);
    }

    for (let i = 0; i < threshold; i++) {
        emails[i] = new Email(random(width - 100), random(height - 100), 30, 30);
    }

    quit = new Quit_button(10, 540, 200, 53);

    //*****ENDING SCNENE********
    m_avatar1 = new M_avatar(305, 313, 100, 100); //ellipse(this.x, this.y, this.r, this.r);
    f_avatar1 = new F_avatar(305, 313, 100, 100); //ellipse(this.x, this.y, this.r, this.r);
    flower_avatar1 = new Flower_avatar(305, 313, 200, 200);
    again = new Again_button(200, 520, 200, 53);
}


//******* DRAW ********
function draw() {
    background(255, 239, 204); //BG beidge

    switch (sceneNum) {
        case 0:
            startScence();
            break; // stop right here & exit

        case 1:
            actionScence();
            break;

        case 2:
            endScence();
            break;

        case 3:
            endScence();
            break;

        case 4:
            winScene();
            break;
    }
}


////*******START SCENCE********
function startScence() {

    scene0_X = mouseX;
    scene0_Y = mouseY;

    textFont(myFont);
    textSize(38);
    fill(208, 21, 76); //pink
    text('Choose your avatar to start', 40, 102);

    push();
    textSize(20);
    fill(0);
    text('Mission: finish all the tasks', 160, 500);
    // text('Hint: avoid caffein', 190, 550);
    pop();

    m_avatar.show();
    fill(0);
    textSize(20);
    text("Billy", 92, 400);

    f_avatar.show();
    fill(0);
    textSize(20);
    text("Kelly", 292, 400);

    flower_avatar.show();
    fill(0);
    textSize(20);
    text("Flowery", 462, 400);
}


////*******ACTION SCENCE********
function actionScence() {

    scene2_X = mouseX;
    scene2_Y = mouseY;

    for (let j = 0; j < starbucks_cups.length; j++) {
        starbucks_cups[j].show();
        starbucks_cups[j].checkCollision();
        starbucks_cups[j].move();
    }

    for (let s = 0; s < slacks.length; s++) {
        slacks[s].show();
        slacks[s].checkCollision();
    }

    for (let i = 0; i < zooms.length; i++) {
        zooms[i].show();
        zooms[i].checkCollision();
    }

    for (let i = 0; i < emails.length; i++) {
        emails[i].show();
        emails[i].checkCollision();
    }


    if (character == 1) {
        m_empl.show();
        m_empl.move();
        m_empl.checkBorder();
    }

    if (character == 2) {
        f_empl.show();
        f_empl.move();
        f_empl.checkBorder();

    }

    if (character == 3) {
        flower_empl.show();
        flower_empl.move();
        flower_empl.checkBorder();
    }

    //quit button
    quit.show();

    if (slacks.length == 0 &&
        zooms.length == 0 &&
        emails.length == 0) {
        sceneNum = 4;
    }
}


////*******ENDING SCENCE********
function endScence() {

    scene3_X = mouseX;
    scene3_Y = mouseY;

    push();
    fill(208, 21, 76);
    textSize(42);
    text("You are burn-out", 120, 104);
    pop();

    if (character == 1) {
        m_avatar1.show();
    }

    if (character == 2) {
        f_avatar1.show();

    }

    if (character == 3) {
        flower_avatar1.show();
    }

    again.show();
}

// ***** WIN SCENE ******
function winScene() {
    push();
    fill(208, 21, 76);
    textSize(42);
    text("Well done,", 200, 104);
    text("you finish your tasks", 100, 200);
    pop();

    push();
    fill(0);
    textSize(32);
    text("Refresh page for a new game", 60, 500);
    pop();

    sceneWin_X = mouseX;
    sceneWin_Y = mouseY;

    if (character == 1) {
        m_avatar1.show();
    }

    if (character == 2) {
        f_avatar1.show();

    }

    if (character == 3) {
        flower_avatar1.show();
    }
}


//********MOUSE PRESSED*********
function mousePressed() {

    if (dist(scene0_X, scene0_Y, m_avatar.x, m_avatar.y) < m_avatar.r / 2) {
        character = 1;
        console.log('male empl');
        sceneNum = 1;
    }

    if (dist(scene0_X, scene0_Y, f_avatar.x, f_avatar.y) < f_avatar.r / 2) {
        console.log('female empl');
        character = 2;
        sceneNum = 1;
    }

    if (dist(scene0_X, scene0_Y, flower_avatar.x, flower_avatar.y) < flower_avatar.r / 2) {
        console.log('flower empl');
        character = 3;
        sceneNum = 1;
    }

    quit.checkCollision();

    again.checkCollision();
}


//*******START SCENCE MALE CLASSES********
class M_avatar {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() { //method that show the object
        fill(108, 25, 242);
        image(m_ava_img, this.x, this.y, this.r, this.r);
    }
}


//*******START SCENCE FEMALE CLASSES********
class F_avatar {

    constructor(x, y, r) { // a special method that creates the car object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(224, 93, 131); //light pink
        image(f_ava_img, this.x, this.y, this.r, this.r);
    }

}

//*******START SCENCE FLOWER CLASSES********
class Flower_avatar {

    constructor(x, y, r) { // a special method that creates the car object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(131, 164, 146);
        image(flower_avatar_img, this.x, this.y, this.r, this.r);
    }

}

//*******ACTION SCENCE MALE CLASSES********
class M_empl {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(108, 25, 242);
        image(m_ava_img, this.x, this.y, this.r, this.r);
    }

    move() {
        if (keyIsDown(39)) {
            m_empl.x += 5;
        }
        if (keyIsDown(37)) {
            m_empl.x -= 5;
        }
        if (keyIsDown(38)) {
            m_empl.y -= 5;
        }
        if (keyIsDown(40)) {
            m_empl.y += 5;
        }
    }

    checkBorder() {
        if (this.x > width) {
            this.x = 600;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y > height) {
            this.y = 600;
        }

        if (this.y < 0) {
            this.y = 0;
        }
    }
}



//*******ACTION SCENCE FEMALE CLASSES********
class F_empl {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(224, 93, 131);
        image(f_ava_img, this.x, this.y, this.r, this.r);
    }

    move() {
        if (keyIsDown(39)) {
            f_empl.x += 5;
        }
        if (keyIsDown(37)) {
            f_empl.x -= 5;
        }
        if (keyIsDown(38)) {
            f_empl.y -= 5;
        }
        if (keyIsDown(40)) {
            f_empl.y += 5;
        }
    }

    checkBorder() {
        if (this.x > width) {
            this.x = 600;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y > height) {
            this.y = 600;
        }

        if (this.y < 0) {
            this.y = 0;
        }
    }
}


//*******ACTION SCENCE FLOWER CLASSES********
class Flower_empl {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(131, 164, 146);
        image(flower_avatar_img, this.x, this.y, this.r, this.r);
    }

    move() {
        if (keyIsDown(39)) {
            flower_empl.x += 5;
        }
        if (keyIsDown(37)) {
            flower_empl.x -= 5;
        }
        if (keyIsDown(38)) {
            flower_empl.y -= 5;
        }
        if (keyIsDown(40)) {
            flower_empl.y += 5;
        }
    }

    checkBorder() {
        if (this.x > width) {
            this.x = 600;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y > height) {
            this.y = 600;
        }

        if (this.y < 0) {
            this.y = 0;
        }
    }
}

//*******STARBUCKS CLASS*******
class Starbucks {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;
    }

    show() {
        fill(100, 100, 100);
        image(starbucks_img, this.x, this.y, this.r, this.r);
    }

    move() {
        this.x += 2;

        if (this.x > width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x += 2;
        }
    }

    checkCollision() {
        if (dist(this.x, this.y, m_empl.x, m_empl.y) < this.r / 2 ||
            dist(this.x, this.y, f_empl.x, f_empl.y) < this.r / 2 ||
            dist(this.x, this.y, flower_empl.x, flower_empl.y) < this.r / 2) {

            this.x = random(width);
            this.y = random(height - 150);

            reward_sound.play();

            slacks.push(new Slack(random(width - 100), random(height - 100), 30, 30));
            zooms.push(new Zoom(random(width - 100), random(height - 100), 30, 30));
            emails.push(new Email(random(width - 100), random(height - 100), 30, 30));

        }
    }
}

//*******SLACK CLASS*******
class Slack {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;
    }

    show() {
        fill(0);
        image(slack_img, this.x, this.y, this.r, this.r);
    }


    checkCollision() {
        if (dist(this.x, this.y, m_empl.x, m_empl.y) < this.r / 2 ||
            dist(this.x, this.y, f_empl.x, f_empl.y) < this.r / 2 ||
            dist(this.x, this.y, flower_empl.x, flower_empl.y) < this.r / 2) {

            this.x = random(width);
            this.y = random(height - 150);

            pain_sound.play();

            slacks.pop();
        }
    }
}


//*******ZOOM CLASS*******
class Zoom {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(0);
        image(zoom_img, this.x, this.y, this.r, this.r);
    }

    checkCollision() {
        if (dist(this.x, this.y, m_empl.x, m_empl.y) < this.r / 2 ||
            dist(this.x, this.y, f_empl.x, f_empl.y) < this.r / 2 ||
            dist(this.x, this.y, flower_empl.x, flower_empl.y) < this.r / 2) {

            this.x = random(width);
            this.y = random(height - 150);

            pain_sound.play();

            zooms.pop();
        }
    }
}

//*******EMAIL CLASS*******
class Email {

    constructor(x, y, r) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.r = r;

    }

    show() {
        fill(0);
        image(email_img, this.x, this.y, this.r, this.r);
    }

    checkCollision() {
        if (dist(this.x, this.y, m_empl.x, m_empl.y) < this.r / 2 ||
            dist(this.x, this.y, f_empl.x, f_empl.y) < this.r / 2 ||
            dist(this.x, this.y, flower_empl.x, flower_empl.y) < this.r / 2) {

            this.x = random(width);
            this.y = random(height - 150);

            pain_sound.play();

            emails.pop();
        }
    }
}


// ****** QUIT BUTTON CLASS *****
class Quit_button {

    constructor(x, y, w, h) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(208, 21, 76);
        rect(this.x, this.y, this.w, this.h);

        fill(255);
        text("Quit", this.x + 70, this.y + 35);
    }

    checkCollision() {
        if (scene2_X > this.x && scene2_X < this.x + this.w &&
            scene2_Y > this.y && scene2_Y < this.y + this.h) {
            console.log('quit button clicked');
            sceneNum = 3;

            scene2_X = scene3_X;
            scene2_Y = scene3_Y;

            sound_track.stop();
            end_track.play();
        }
    }
}

// ****** AGAIN BUTTON CLASS *****
class Again_button {

    constructor(x, y, w, h) { // a special method that creates the object

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(208, 21, 76);
        rect(this.x, this.y, this.w, this.h);

        fill(255);
        text("Try Harder", this.x + 45, this.y + 35);
    }

    checkCollision() {
        if (scene3_X > this.x && scene3_X < this.x + this.w &&
            scene3_Y > this.y && scene3_Y < this.y + this.h) {
            console.log('again button clicked');
            sceneNum = 1;

            scene3_X = scene2_X;
            scene3_Y = scene2_Y;

            sound_track.loop();
        }
    }
}
