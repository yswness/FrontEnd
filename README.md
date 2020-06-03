# xtuoj Frontend
这是XTUOJ的前端，基于vue-cli开发，使用了vue.js, ElementUI等框架

## 开发生产环境

### 开发环境
window10 + nodejs，在linux上也是可以滴

### 生产环境
window10 + nginx，linux亦可

## 如何使用
1. 下载好后可以自行修改文件夹名字, (注：若只进行部署，请勿修改内部文件文件名)
2. 然后执行命令

``` 
npm install
```

3. 为了测试我加入了mockjs, 代码里我懒得删来删去了，大家自行删除目录 /FrontEnd/src/ 下 main.js 文件中如下部分代码

```
/* mockjs 模拟数据 测试完及时删除 */
import './mockjs';
```

4. 若是进行部署，执行

```
npm run build
```

5. 若只是为了看效果或继续开发，执行

```
npm run serve
```

6. 在开发环境下编译好后会显示url，在浏览器中输入该url即可看到效果

## 说明
1. 数据接口已经写好，后续直接用就行
2. 已加入Mathjax渲染，本项目是通过CDN引入的，版本是2.7.5，如果大家想直接引入本地下好的，可以直接修改Public文件夹下的index.html，把源改一下就行，
3. 已插入codemirror模块，现在可以在界面随便插入代码了
4. 等等

## 待完成
1. 对齐数据接口
2. 美化UI界面
3. 细分OI赛制与ACM赛制
4. 其它一些细节部分
