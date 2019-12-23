class Enemy {
    constructor(){
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = null;
        this.vector = null;
        this.speed = null;
        this.active = false;

        this.fireTerm = 1000;
    }

    reset(x, y, w, h, img, s, v){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.speed = s;
        this.vector = v;
        this.active = true;
        this.fire(); //일단 발사 시작
    }

    fire(){
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 5 , 3, 300, new Vector(-1, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 5 , 3, 300, new Vector(0, 1));
        App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 5 , 3, 300, new Vector(1, 1));

        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    update(d){
        if(!this.active) return;
        this.x += this.vector.x * d * this.speed;
        this.y += this.vector.y * d * this.speed;

        //화면밖으로 나가면 active를 false로 변경한다.
        if(this.x < 0
            || this.x > App.app.gameWidth + this.w
            || this.y > App.app.gameHeight + this.h){
                this.active = false;
            }
    }

    render(ctx){
        if(!this.active) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}