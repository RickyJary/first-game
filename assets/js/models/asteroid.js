class Asteroid {
    constructor(board) {
      this.board = board;
      this.width = 50; 
      this.height = 50;
  
      
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { 
        this.x = Math.random() * this.board.clientWidth;
        this.y = -this.height; 
      } else if (side === 1) { 
        this.x = this.board.clientWidth;
        this.y = Math.random() * this.board.clientHeight;
      } else if (side === 2) { 
        this.x = Math.random() * this.board.clientWidth;
        this.y = this.board.clientHeight;
      } else { 
        this.x = -this.width; 
        this.y = Math.random() * this.board.clientHeight;
      }
  
      
      if (side === 0) { 
        this.vx = (Math.random() * 4) - 2; 
        this.vy = Math.random() * 2; 
      } else if (side === 1) { 
        this.vx = -(Math.random() * 2); 
        this.vy = (Math.random() * 4) - 2; 
      } else if (side === 2) { 
        this.vx = (Math.random() * 4) - 2; 
        this.vy = -(Math.random() * 2); 
      } else { 
        this.vx = Math.random() * 2; 
        this.vy = (Math.random() * 4) - 2; 
      }
  
      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.backgroundColor = "white";
      this.element.style.borderRadius = "50px"

      
    }
  
    draw() {
        console.log("dibujando asteroide")
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px"; 

      this.board.appendChild(this.element);
    }
  
    move() {
      this.x += this.vx;
      this.y += this.vy;
  
    }
  }
  