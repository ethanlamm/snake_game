import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

// 游戏控制器，控制其他所有类
class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    // 存储方向
    direction: string = ''
    // 游戏是否结束
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        // 初始化即开始
        this.init()
    }

    // 游戏初始化
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))

        this.run()
    }

    // 键盘按下处理函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key);
        // 按键代表方向 ArrowUp ArrowDown ArrowLeft ArrowRight
        this.direction = event.key
    }

    // 蛇移动方法
    run() {
        // 获取当前蛇头位置
        let X = this.snake.X
        let Y = this.snake.Y

        // 按下按键后修改偏移量
        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10
                break;
            case 'ArrowDown':
                Y += 10
                break;
            case 'ArrowLeft':
                X -= 10
                break;
            case 'ArrowRight':
                X += 10
                break;
        }

        // 检查蛇是否吃到食物
        this.checkEat(X, Y)

        try {
            // 重新赋值
            this.snake.X = X
            this.snake.Y = Y
        } catch (error: any) {
            alert(error.message)
            // 停止蛇的移动
            this.isLive = false
        }

        // 开启定时器（自调用）
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    checkEat(X: number, Y: number) {
        if (X == this.food.X && Y == this.food.Y) {
            // 坐标重合，表示吃到食物
            // 1.food位置改变
            this.food.change()
            // 2.分数增加
            this.scorePanel.addScore()
            // 3.蛇增加一节
            this.snake.addBodiees()
        }
    }
}

export default GameControl