class App {
    constructor() {
        this.gameWidth = 400;
        this.gameHeight = 600;
        this.canvas = document.querySelector("#myGame");
        this.ctx = this.canvas.getContext("2d");
        this.start = false;
        this.imageList = {}; //이미지 저장 오브젝트

        this.backList = []; //배경 그림 리스트
        this.init(); //초기화 함수
    }

    async init() {
        this.imageList.player = await this.loadImage("player.png");
        this.imageList.back = await this.loadImage("back.png");

        for (let i = 0; i < 3; i++) {
            this.backList.push(new Background(0, - i * this.gameHeight, this.gameWidth, this.gameHeight, this.imageList.back));
        }
        requestAnimationFrame(this.frame.bind(this));
    }

    loadImage(name) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = `./images/${name}`;
            img.addEventListener("load", () => {
                res(img);
            })

        });
    }

    frame(time) {  //현재 시간
        if (!this.start) this.start = time; //맨처음 시작 될 때
        let delta = time - this.start; //지금 시간 - 이전 시간 = delta
        this.start = time;
        this.update(delta / 1000);
        this.render();
        requestAnimationFrame(this.frame.bind(this));
    }

    update(delta) {
        this.backList.forEach(back => back.update(delta));
        if (this.backList[0].y > this.gameHeight) {
            let first = this.backList.shift();
            first.y = this.backList[this.backList.length - 1].y - this.gameHeight;
            this.backList.push(first);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.backList.forEach(back => back.render(this.ctx));
    }
}