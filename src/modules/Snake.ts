class Snake {
    element: HTMLElement
    head: HTMLElement
    bodies: HTMLCollection

    constructor() {
        this.element = document.querySelector('#snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 蛇头坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    // 设定蛇头坐标
    set X(val: number) {
        if (this.X == val) return
        // X的合法值范围
        if (val < 0 || val > 290) throw Error('蛇撞墙了，Game Over')

        // 调头问题:蛇头和第二节位置重合
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == val) {
            // 说明发生调头
            if (val > this.X) {
                // 新值val>旧值，欲往下走，要停止，要向新值的反方向移动
                val = this.X - 10
            } else {
                val = this.X + 10
            }
        }

        // 移动身体
        this.moveBodies()

        this.head.style.left = val + 'px'

        // 检查
        this.checkHeadBodies()
    }
    set Y(val: number) {
        if (this.Y == val) return
        // Y的合法值范围
        if (val < 0 || val > 290) throw Error('蛇撞墙了，Game Over')

        // 调头问题:蛇头和第二节位置重合
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == val) {
            // 说明发生调头
            if (val > this.Y) {
                // 新值val>旧值，欲往下走，要停止，要向新值的反方向移动
                val = this.Y - 10
            } else {
                val = this.Y + 10
            }
        }

        // 移动身体
        this.moveBodies()

        this.head.style.top = val + 'px'

        // 检查
        this.checkHeadBodies()
    }

    // 添加身体
    addBodiees() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    // 身体移动
    // 关键：先改后一节的身体，后一节的身体的位置=前一节身体的位置
    moveBodies() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前一节的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值赋予当前身体位置
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    // 蛇头和身体相撞：位置重合
    checkHeadBodies() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
                throw Error('撞到自己了~~~')
            }

        }
    }
}

export default Snake