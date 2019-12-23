class App {
    constructor(){
        App.app = this; //싱글톤을 위해 App에 스태틱으로 넣음
        this.gameWidth = 400;
        this.gameHeight = 600;

        this.canvas = document.querySelector("#myGame");
        this.ctx = this.canvas.getContext("2d");
        this.start = false;
        this.imageList = {}; //이미지 저장 오브젝트

        this.player = null;
        this.backList = []; //배경그림 리스트
        this.playerBulletList = []; //플레이어 총알 리스트
        this.enemyList = []; //적기체 리스트

        this.gameTimer = 0; //게임시작후의 타이머
        this.stageIdx = 0;
        this.stageData = [];

        this.init(); //초기화 함수
        
    }

    async init(){
        this.imageList.player = await this.loadImage("player.png");
        this.imageList.back = await this.loadImage("back.png");
        this.imageList.enemy = await this.loadImage("enemy1.png");
        
        //백그라운드 생성
        for(let i = 0; i < 3; i++){
            this.backList.push(
                new Background(0, - i * this.gameHeight, 
                                this.gameWidth, this.gameHeight,
                                this.imageList.back));
        }
        //플레이어 생성(x좌표 y좌표 너비 높이 이미지)
        this.player = new Player(
            this.gameWidth / 2 - 30, this.gameHeight - 60,
            60, 40, this.imageList.player, this);

        this.stageData.push({time:2, data:{x:this.gameWidth / 3 - 30, y: -10, w: 60, h:40, img:this.imageList.enemy, s:200, v:new Vector(0, 1)}});
        this.stageData.push({time:2, data:{x:this.gameWidth / 3 * 2 - 30, y: -10, w: 60, h:40, img:this.imageList.enemy, s:200, v:new Vector(0, 1)}});
        this.stageData.push({time:8, data:{x:this.gameWidth / 3 - 30, y: -10, w: 60, h:40, img:this.imageList.enemy, s:200, v:new Vector(0, 1)}});
        this.stageData.push({time:8, data:{x:this.gameWidth / 3 * 2 - 30, y: -10, w: 60, h:40, img:this.imageList.enemy, s:200, v:new Vector(0, 1)}});

        requestAnimationFrame(this.frame.bind(this));
    }

    getOrCreateBullet(x, y, r, s, v){
        let bullet = this.playerBulletList.find(x => !x.active);
        if(bullet === undefined){
            bullet = new Bullet();   
            this.playerBulletList.push(bullet);
        }
        bullet.setActive(x, y, r, s, v);
        
    }

    getOrCreateEnemy(data){
        let enemy = this.enemyList.find(x => !x.active);
        if(enemy === undefined){
            enemy = new Enemy();
            this.enemyList.push(enemy);
        }
        enemy.reset(data.x, data.y, data.w, data.h, data.img, data.s, data.v);
    }

    loadImage(name){
        return new Promise((res, rej)=>{
            let img = new Image();
            img.src = `./images/${name}`;
            img.addEventListener("load", ()=>{
                res(img);
            });
        });
    }

    frame(time){
        if(!this.start) this.start = time;
        let delta = time - this.start;
        this.start = time;
        this.update(delta / 1000);
        this.render();
        requestAnimationFrame(this.frame.bind(this));
    }

    update(delta){
        this.backList.forEach(back => back.update(delta));
        if(this.backList[0].y > this.gameHeight){
            let first = this.backList.shift();
            first.y = this.backList[this.backList.length - 1].y - this.gameHeight;
            this.backList.push(first);
        }
        this.player.update(delta);
        this.player.checkOut(this.gameWidth, this.gameHeight);

        this.playerBulletList.forEach(b => b.update(delta));

        this.enemyList.forEach(e => e.update(delta));

        this.gameTimer += delta;

        let nowEnemy = this.stageData[this.stageIdx];

        if(nowEnemy != undefined && nowEnemy.time <= this.gameTimer){
            this.getOrCreateEnemy(nowEnemy.data);
            this.stageIdx++;
        }
    }

    render(){
        this.ctx.clearRect(0,0,this.gameWidth, this.gameHeight);
        this.backList.forEach(back => back.render(this.ctx));

        this.player.render(this.ctx);
        this.playerBulletList.forEach(b => b.render(this.ctx));
        this.enemyList.forEach(e => e.render(this.ctx));
    }

}