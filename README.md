[![npm](https://img.shields.io/npm/v/latest-createjs.svg)](https://www.npmjs.com/package/latest-createjs)

# 函数

## 依赖
baye@1.1.1 版本所依赖的[CreateJS][1]为script引入
``` html
<script src="<%= htmlWebpackPlugin.options.path %>static/libs/create.js"></script>
```
baye@1.2.4 版本所依赖的[CreateJS][1]通过[Akimyou/latest-createjs][2]引入
```bash
$ yarn add latest-createjs
# or
$ npm install latest-createjs --save
```

```js
import 'latest-createjs'
// or
require('latest-createjs')

// then
console.log(createjs) // <- Global
```
## 数学函数

### *babyEye.randomRange(low,high)*

* 返回[low,high)中的一个随机整数

### *babyEye.randomExcept(low, high, except)*

* 返回[low,high)中的一个随机整数，但不会是except

### *babyEye.shuffle(arr)*

* 洗牌，打乱了arr里面元素顺序

### *babyEye.rangeArr(min,max,step)*

* 返回一个数组，从min到max，区间[min,max)
* 相邻相差step，默认step为1

### *babyEye.constrain(value,min,max)*

* 如果value在[min,max] 之间返回value,否则返回与value相近的值

### *babyEye.map(value,minSource,maxSouce,minTarget,maxTarget)*

* value的范围是[minSource,maxSource]
* 返回value在[minTarget, maxTarget]的映射值

### *babyEye.selectFrom(arr, num)*

* 从数组arr中随机选取num个元素，返回值是一个数组

### *babyEye.isMobile()*

* 返回bool， 判断是否为移动设备

### *babyEye.Button(img ,callbackDown, callbackUp)*

* 图片，按下的回调函数，抬起时候的回调函数
* 返回一个bitmap

### *babyEye.randomChoice(arr)*

* 随机返回arr中的一个元素

## 图像函数

### 过滤图片颜色 *babyEye.ImageFiltered(img, filters)*

  ```js
  // 返回一张处理过的图片
  new babyEye.ImageFiltered(img, filters)

  // img是加载的图片，filters是createjs的filters 如:
  new createjs.ColorFilter(1,0,0,1,255,0,0,0)
  ```

### 产生立体式图片一 *ImageSTE({image:img, colors:["r","b"], delta:10})*

  ```js
  // 返回值是一个处理后的图片，左边只有红通道，右边没有红通道，delta是错位的距离像素
  new ImageSTE({image:img, colors:["r","b"], delta:10})
  ```

### 产生立体式图片二 *ImageSTE2({image:img, colors:["r","b"], delta:10})*

  ```js
  // 返回值是一个处理后的图片，左边只有红通道，右边没有蓝通道，与上一个区别，差了一个绿通道
  new ImageSTE2({image:img, colors:["r","b"], delta:10})
  ```

### 产生立体式图片 *ImageMidSTE({image:img, colors:["r","b"], delta:10})*

  ```js
  // 返回值是一个处理后的图片，只有中间部分有像素，两边是透明的
  new ImageMidSTE({image:img, colors:["r","b"], delta:10})
  ```
### *babyEye.getImagePoints(image,resolution=30,regular=false)*

* 图片，分辨率，规则化点
* 返回一个数组，里面的元素是{x: number,y:number} 对象，一组为image的形状的点

### *babyEye.Page* 具体用法参见 Space/an725 用来简化开始结束页面


## 备忘录
~~es6 module~~  
~~commonJS~~   
npm:
[开发更好用的 JavaScript 模块](https://zhuanlan.zhihu.com/p/31499310)



[1]: https://github.com/CreateJS
[2]: https://github.com/Akimyou/latest-createjs