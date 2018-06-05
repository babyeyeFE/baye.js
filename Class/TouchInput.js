// import babyEye from '../../babyEye'
export class TouchInput {
    constructor(config){
        this.config = config
        this._buildData()
        this._buildView()
        this._buildComponents()
        this._events()
        this._filter()
    }

    _buildData(){
        this.oldMap = {}
        this.map = {}
    }

    _buildComponents(){
        let ids = ['A','B','X','Y','direction-inner','direction-outter']
        let buttonsSettings = [
            {id: 'Y', position: {x: 0, y: 0}},
            {id: 'B', position: {x: 70, y:70}},
            {id: 'A', position: {x: 0, y: 140}},
            {id: 'X', position: {x: -70, y:70}},
        ]
        buttonsSettings.forEach((setting)=>{
            let image = this.config.resource.getResult(setting.id)
            let bitmap = new createjs.Bitmap(image)
            bitmap.set(setting.position)
            bitmap.set({regX: image.width/2,regY: image.height/2})
            bitmap.name = setting.id

            this.buttonContainer.addChild(bitmap)
        })

        let directionSettings = [
            {id: 'direction-inner', position: {x: -200, y:60}},
            {id: 'direction-outter', position: {x: -200, y:60}},
        ]

        directionSettings.forEach((setting)=>{
            let image = this.config.resource.getResult(setting.id)
            let bitmap = new createjs.Bitmap(image)
            bitmap.set(setting.position)
            bitmap.set({regX: image.width/2,regY: image.height/2})
            bitmap.name = setting.id
            this.directionContainer.addChild(bitmap)
        })
    }

    _events(){
        this.innerCircle = this.directionContainer.getChildByName('direction-inner')
        this.outterCircle = this.directionContainer.getChildByName('direction-outter')
        this.innerCircle.addEventListener('pressmove',(ev)=>{
            let pt = this.innerCircle.localToLocal(ev.localX,ev.localY, this.directionContainer)
            this.innerCircle.set(pt)
        })

        this.innerCircle.addEventListener('pressup', (ev)=>{
            this.innerCircle.set({x:this.outterCircle.x,y:this.outterCircle.y})
        })

        this.buttonContainer.children.forEach((button)=>{
            button.addEventListener('mouseout',(ev)=>{
                this.map[button.name] = false
            })

            button.addEventListener('mousedown',(ev)=>{
                this.map[button.name] = true
            })

            button.addEventListener('click',(ev)=>{
                this.map[button.name] = false
            })
        })
    }

    _filter(){
        if(this.config.buttons){
            this.buttonContainer.children.forEach((button)=>{
                if(!this.config.buttons.includes(button.name)){
                    button.visible = false
                }
            })
        }
        if(this.config.direction === false) {
            this.directionContainer.visible = false
        }
    }

    _buildView(){
        this.view = new createjs.Container()
        this.buttonContainer = new createjs.Container()
        this.directionContainer = new createjs.Container()
        this.view.addChild(this.buttonContainer, this.directionContainer)
        this.view.set({x: 1280/2, y: 520})
        this.buttonContainer.set({x: 500})
        this.directionContainer.set({x: -300})
    }

    //public
    update(){
        Object.assign(this.oldMap, this.map)
    }

    getDirection(){
        let radius = this.outterCircle.image.width * 0.5
        let radiusRevert = 1/radius
        let delta = babyEye.Vec2.sub(this.innerCircle, this.outterCircle)
        let deltaX = babyEye.constrain(delta.x,-radius,radius) * radiusRevert
        let deltaY = babyEye.constrain(delta.y,-radius,radius) * radiusRevert
        return {
            x: deltaX,
            y: deltaY
        }
    }

    pressed(button){
        return this.map[button]
    }

    justPressed(button){
        return this.map[button] && !this.oldMap[button]
    }

    justReleased(button){
        return !this.map[button] && this.oldMap[button]
    }
}

//let touchInput = new babyEye.TouchInput(config)
//config里需要resource属性，是个加载队列，里面需要'A','B','X','Y','direction-inner','direction-outter'这些图片
//config里的direction如果是false，表示不需要方向
//config里的buttons可以是['A','B']，表示只有'A','B'按键
//具体见双鱼an867

// 每帧 touchInput.update()
// touchInput.pressed('A') 是否被按下
// touchInput.justPressed('A')是否刚被按下
// touchInput.justReleased('A')刚抬起
// touchInput.getDirection() 得到{x,y},中心是0，最大是1
//