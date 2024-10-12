class Player {
    constructor(board){
    this.board = board
    this.width = 60;
    this.height = 40;
    this.y = 0;
    this.x = 320;
    this.vy = 10;
    this.vx = 10;
    this.bullets = [];

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.className = "player";
    this.element.style.backgroundColor = "white"
    this.element.style.backgroundPosition = "center";
    

    this.setListeners();
    this.actions = {
        up: false,
        down: false,
        left: false,
        right: false,
        canShoot: true
        };
}

move() {
    if (this.actions.up) {
      this.y += this.vy;
    } else if (this.actions.down) {
      this.y -= this.vy;
    }

    if (this.actions.left) {
        this.x -= this.vx;
      } else if (this.actions.right) {
        this.x += this.vx;
      }

      if (this.x < 0) {
        this.x = this.board.clientWidth;
      }

      if (this.x > this.board.clientWidth) {
        this.x = 0;
      }

      if(this.y > this.board.clientHeight){
        this.y = 0;
      }

      if(this.y < 0){
        this.y = this.board.clientHeight;
      }
     
  
    this.bullets.forEach((bullet) =>{
    bullet.move()})
}

draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
    this.bullets.forEach((bullet) => {
        bullet.draw();
      });
}

shoot() {
    if (this.actions.canShoot) {
      this.bullets.push(
        new Bullet(
          this.board,
          this.x + this.width / 2,
          this.y + this.height / 2
        )
      );

      this.actions.canShoot = false;

      setTimeout(() => {
        this.actions.canShoot = true;
      }, 1000);
    }
  }

setListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
           this.actions.up = true;
           break;
        case "ArrowDown":
           this.actions.down = true;
           break;
        case "ArrowLeft":
          this.actions.left = true;
          break;
        case "ArrowRight":
          this.actions.right = true;
          break;
        case " ":
            console.log("shooting")
          this.shoot();
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.actions.up = false;
          break;
        case "ArrowDown":
          this.actions.down = false;
          break;
        case "ArrowLeft":
          this.actions.left = false;
          break;
        case "ArrowRight":
          this.actions.right = false;
          break;
        }
    });
}


}