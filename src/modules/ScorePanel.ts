// 计分板
class ScorePanel {
    score = 0
    level = 1

    // 升级分数阈值
    levelUpScore: number
    // 最高等级
    maxLevel: number


    // 获取元素
    scoreEle: HTMLElement
    levelEle: HTMLElement
    constructor(levelUpScore: number = 10, maxLevel: number = 10,) {
        this.scoreEle = document.querySelector('#score')!
        this.levelEle = document.querySelector('#level')!
        this.levelUpScore = levelUpScore
        this.maxLevel = maxLevel

    }

    // 加分方法
    addScore() {
        this.score++
        this.scoreEle.innerText = this.score.toString()
        // 每当score到达阈值时，调用升级方法进行升级
        if (this.score % this.levelUpScore == 0) {
            this.levelUp()
        }
    }

    // 等级提升方法
    levelUp() {
        // 当小于最大等级时，才升级
        if (this.level < this.maxLevel) {
            this.level++
            this.levelEle.innerText = this.level.toString()
        }
    }
}
export default ScorePanel