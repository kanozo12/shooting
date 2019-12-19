class Player {
    constructor(x, y, w, h, img, app){
        this.app = app;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.keyArr = [];
        this.speed = 150;
        this.init();        
    }

    init(){
        document.addEventListener("keydown", e => {
            if(e.code === "ArrowLeft")  this.keyArr[0] = true;
            if(e.code === "ArrowRight") this.keyArr[1] = true;
            if(e.code === "ArrowUp")    this.keyArr[2] = true;
            if(e.code === "ArrowDown")  this.keyArr[3] = true;
            if(e.code === "Space") this.fire();
        });

        document.addEventListener("keyup", e => {
            if(e.code === "ArrowLeft")  this.keyArr[0] = false;
            if(e.code === "ArrowRight") this.keyArr[1] = false;
            if(e.code === "ArrowUp")    this.keyArr[2] = false;
            if(e.code === "ArrowDown")  this.keyArr[3] = false;
        });

    }

    fire(){
        this.app.getOrCreateBullet(
            this.x + this.w / 2, this.y, 3, 300, new Vector(0, -1));
    }

    update(d){
        let dx = 0, dy = 0;
        if(this.keyArr[0])  dx = -1;
        if(this.keyArr[1])  dx = 1;
        if(this.keyArr[2])  dy = -1;
        if(this.keyArr[3])  dy = 1;

        this.x += dx * d * this.speed;
        this.y += dy * d * this.speed;
    }

    checkOut(w, h){
        if(this.x < 0 )             this.x = 0;
        if(this.x + this.w >= w)    this.x = w - this.w;
        if(this.y < 0)              this.y = 0;
        if(this.y + this.h >= h)    this.y = h - this.h;
    }

    render(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}