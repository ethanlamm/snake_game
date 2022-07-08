// 定义食物类（面向对象）
class Food {
    element: HTMLElement
    constructor() {
        this.element = document.querySelector('#food')!
    }

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    // 随机生成food的位置
    change() {
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10

        // 修改位置
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food