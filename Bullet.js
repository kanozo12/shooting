class Bullet {
    constructor(){
        this.x = null;
        this.y = null;
        this.r = null;
        this.speed = null;
        this.vector = null;
        this.active = false;
    }

    setActive(x, y, r, s, v){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = s;
        this.vector = v;
        this.active = true;
    }

    update(d){
        if(!this.active) return;
        this.x += this.vector.x * d * this.speed;
        this.y += this.vector.y * d * this.speed;

        //화면밖으로 나가면 active를 false로 변경한다.
        if(this.x < - this.r 
            || this.x > App.app.gameWidth + this.r 
            || this.y < - this.r
            || this.y > App.app.gameHeight + this.r){
                this.active = false;
            }
    }

    render(ctx){
        if(!this.active) return;
        ctx.beginPath();
        ctx.fillStyle = "#c35d2b";
        ctx.arc(this.x, this.y, this.r + 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#e17d39";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}