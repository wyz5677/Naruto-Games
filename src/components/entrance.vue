<template>
  <div class="container">
    <img :src="require(`../imgs/bg/bg_${level}.png`)" alt="" style="width:100%;height:100%;">
    <div class="container-inner">
      <div class="title">
        第{{level}}关
      </div>
      <div class="monsterBox">
        <div style="display:flex;margin-right:20px;">
          <img :src="require(`../imgs/monsters/monster${level}.gif`)" alt=""  class="renwutupian">
          <!-- 普攻动画 -->
          <div v-show="jingongshanghai" ref="jingongshanghai" class="jingongshanghai">
            <img src="../imgs/skills/pugongdonghua.gif" alt="">
          </div>
          <!-- 技能动画 -->
          <div class="showgongjidonghua" v-show="showgongjidonghua">
            <img :src="require(`../imgs/skills/${obj1.gongjidonghua}`)"  alt="">
          </div>
          <!-- 血条 -->
          <div class="Article-blood">
            <div :style="{'height':obj2.life*100/obj2.maxLife+'%'}">
            </div>
          </div>
        </div>
        <!-- 属性栏目 -->
        <div class="shuxinglan">
          <div>
            攻击：{{obj2.attack}}
          </div>
          <div style="margin-top:10px;">
            生命：{{obj2.life}}
          </div>
        </div>
      </div>
      <div class="fightingBox">
        <!-- 技能浮动动画 -->
        <div class="floatdonghua" :class="{'active':showfloatdonghua}">
          <img :src="require(`../imgs/skillsfloat/skill_${obj1.id}.png`)" alt="" style="width:100%;height:100%;">
        </div>
        <!-- 开始按钮 -->
        <div @click="_gameStart" v-show="showFight" class="kaishianniu">
          <img src="../imgs/ui/kaishi.png" alt="">
        </div>
      </div>
      <div class="myBox">
        <div style="display:flex;margin-right:20px;">
          <img :src="require(`../imgs/people/you_${obj1.id}.jpg`)" alt="" style="width:120px;height:180px;">
          <!-- 普攻动画 -->
          <div v-show="fangyushanghai" ref="fangyushanghai" class="fangyushanghai">
            <img src="../imgs/skills/pugongdonghua.gif" alt="">
          </div>
           <!-- 技能动画 -->
          <!-- <div class="showfangyudonghua" v-show="showfangyudonghua">
            <img :src="require(`${obj1.gongjidonghua}`)"  alt="">
          </div> -->
           <!-- 血条 -->
          <div class="Article-blood">
            <div :style="{'height':obj1.life*100/obj1.maxLife+'%'}">
            </div>
          </div>
          <div class="lan-blood">
            <div :style="{'height':obj1.lan*100/obj1.maxLan+'%'}">
            </div>
          </div>
        </div>
        <!-- 属性栏目 -->
        <div class="shuxinglan">
          <div>
            攻击：{{obj1.attack}}
          </div>
          <div style="margin-top:10px;">
            防御：{{obj1.beingAttacked}}
          </div>
          <div style="margin-top:10px;">
            生命：{{obj1.life}}
          </div>
        </div>
      </div>
      <!-- 选技能 -->
      <div class="chooseSkills" v-show="showChooseSkillsBox">
        <div class="title2">请选择技能</div>
        <div class="skillBox">
          <div v-for="(item,index) in skillsCOPY" :key="index" @click="_chooseSkills(item)">
            <img :src="require(`../imgs/xuanjineng/jineng_${item.id}.png`)" alt="" style="width:60px;height:60px;">
            <span style="color:aqua">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="choosehero" v-if="showChooseHeroBox">
        <div class="title3">请选择英雄</div>
        <div class="heroBox">
          <div v-for="(item,index) in heros" :key="index" @click="_chooseHeros(item)">
            <img :src="require(`../imgs/hero/hero_${item.id}.png`)" alt="" style="width:140px;height:180px;">
            <span style="color:aqua;margin-top:5px;">{{item.name}}</span>
            <span style="color:black;font-size:12px;margin-top:5px;">{{item.skilDatail}}</span>
          </div>
        </div>
      </div>
      <audio src="../music/yy_01.mp3" id="music"></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      obj1:{
        id:1,
        attack:5,
        life:100,
        maxLife:100,
        rate:10,
        lan:0,
        maxLan:10,
        meicinan:10,
        meimiaolan:0,
        // 防御
        beingAttacked:0,
        huixue:0,
        // 每击败一个怪兽增加血量
        chengzhangxueliang:0,
        // 前五秒增加攻击
        fiveAddAttack:0,
        skills:['超旋光螺旋舞吼三式'],
        gongjidonghua:'skills_1.png'
      },
      obj2:{
        attack:5,
        maxLife:100,
        life:100,
         rate:10,
      },
      monsters:[
        {
          attack:5,
          maxLife:50,
          life:50,
          rate:10,
        },{
          attack:7,
          maxLife:100,
          life:100,
          rate:10,
        },{
          attack:9,
          maxLife:150,
          life:150,
          rate:10,
        },{
          attack:10,
          maxLife:200,
          life:200,
          rate:10,
          // 5
        },{
          attack:20,
          maxLife:350,
          life:350,
          rate:10,
        },{
          attack:21,
          maxLife:360,
          life:360,
          rate:10,
        },{
          attack:22,
          maxLife:370,
          life:370,
          rate:10,
        },{
          attack:23,
          maxLife:380,
          life:380,
          rate:10,
        },{
          attack:24,
          maxLife:390,
          life:390,
          rate:10,
        },{
          // 10
          attack:30,
          maxLife:200,
          life:200,
          rate:10,
        },{
          attack:31,
          maxLife:220,
          life:220,
          rate:10,
        },{
          attack:32,
          maxLife:240,
          life:240,
          rate:10,
        },{
          attack:33,
          maxLife:260,
          life:260,
          rate:10,
        },{
          attack:34,
          maxLife:270,
          life:270,
          rate:10,
        },{
          // 15
          attack:30,
          maxLife:500,
          life:500,
          rate:10,
        },{
          attack:30,
          maxLife:550,
          life:550,
          rate:10,
        },{
          attack:30,
          maxLife:580,
          life:580,
          rate:10,
        },{
          attack:30,
          maxLife:600,
          life:600,
          rate:10,
        },{
          attack:31,
          maxLife:650,
          life:650,
          rate:10,
        },{
          // 20
          attack:50,
          maxLife:1000,
          life:1000,
          rate:10,
        },{
          attack:55,
          maxLife:1000,
          life:1000,
          rate:10,
        },{
          attack:60,
          maxLife:1000,
          life:1000,
          rate:10,
        },{
          attack:70,
          maxLife:1000,
          life:1000,
          rate:10,
        },{
          attack:80,
          maxLife:1000,
          life:1000,
          rate:10,
          // 25
        },{
          attack:100,
          maxLife:1000,
          life:1000,
          rate:10,
        }
      ],
      skills:[
        {
          id:1,
          name:'+5攻击'
        },
        {
          id:2,
          name:'+50血量'
        },
        {
          id:3,
          name:'每秒回1血'
        },
        {
          id:4,
          name:'+2攻击+2防御'
        },
        {
          id:5,
          name:'每击败一个怪兽增加10血量'
        },
        {
          id:6,
          name:'前5秒增加8点伤害'
        },
        {
          id:7,
          name:'每秒回能量1'
        },
      ],
      heros:[
        { 
          id:1,
          name:'波风水门',
          skills:['超旋光螺旋舞吼三式'],
          skilDatail:'超旋光螺旋舞吼三式:以超时光速度快速攻击8次.',
          gongjidonghua:'skills_1.png'
        },
        {
          id:2,
          name:'宇智波佐助',
          skills:['天照'],
          skilDatail:'天照:战斗开始后4秒即释放永不熄灭之黑炎.',
          gongjidonghua:'skills_2.gif'
        },
        { 
          id:3,
          name:'宇智波鼬',
          skills:['超旋光螺旋舞吼三式'],
          skilDatail:'敬请期待.'
        },
        {
          id:4,
          name:'宇智波斑',
          skills:['天照'],
          skilDatail:'敬请期待.'
        }
      ],
      skillsCOPY:[],
      level:0,
      showChooseSkillsBox:false,
      showChooseHeroBox:false,
      // 进攻造成伤害
      jingongshanghai:0,
      // 防御造成伤害
      fangyushanghai:0,
      // 技能动画
      showgongjidonghua:false,
      showfangyudonghua:false,
      showFight:false,
      showfloatdonghua:false
    }
  },
  methods: {
    _inits(){
      // 选英雄
      this.showChooseHeroBox=true
      // 升级怪兽
      this._levelMonster()
    },
    _win(){
      if(this.level==25) {
        alert('赢得游戏')
        location.reload()
      }
      // 初始化属性
      this.obj1.life=this.obj1.maxLife
      this.obj1.lan=0
      // 升级怪兽
      this._levelMonster()
      // 随机技能选择
      this.skillsCOPY=this._getRandomArrayElements(this.skills,4)
      // 展示选择技能框
      this.showChooseSkillsBox = true
    },
    async _gameStart(){
      this.showFight=false
      // 主进程
      // 主进程次数
      let i=0
      this.TIM=setInterval(async ()=>{
        i++
        this.obj1.meicinan && (this.obj1.lan+=this.obj1.meicinan)
        // 防御伤害位置变化
        // this.$refs.fangyushanghai.style.top=this._randomNum(80,100)+'px'
        // this.$refs.fangyushanghai.style.left=this._randomNum(80,120)+'px'
        // 进攻伤害位置变化
        // this.$refs.jingongshanghai.style.top=this._randomNum(80,100)+'px'
        // this.$refs.jingongshanghai.style.left=this._randomNum(80,120)+'px'


        // 进攻进程
        this.jingongshanghai = this.jingongshanghai + this.obj1.attack
        if(this.obj1.fiveAddAttack && i<=5){
          this.jingongshanghai = this.jingongshanghai + this.obj1.fiveAddAttack
        }
        this.obj2.life-=this.jingongshanghai
        setTimeout(()=>{
          this.jingongshanghai=0
        },200)


        // 防御进程
        setTimeout(()=>{
          this.fangyushanghai=this.jingongshanghai + this.obj2.attack
          this.obj1.life-=this.fangyushanghai
          setTimeout(()=>{
            this.fangyushanghai=0
          },200)
        },1000)

        console.log(this.obj1.lan);
        // 技能进程
        if(this.obj1.skills.some(item=> item=='超旋光螺旋舞吼三式' ) && this.obj1.lan>=this.obj1.maxLan){
          this.showfloatdonghua=true
          this.obj1.lan=0
          // 500豪秒后金色闪光 连续攻击8次
          await new Promise((res)=>{
            setTimeout(res, 500);
          })
          let i=0;
          this.TIM1=setInterval(() => {
            i++
            this.showgongjidonghua = true
            setTimeout(() => {
              this.showgongjidonghua = false
            }, 100);
            this.obj2.life-= this.obj1.attack
            if(this.obj1.life<=0 || this.obj2.life<=0 || i==8){
              clearInterval(this.TIM1)
            }
            this._jieshu()
          }, 200);
           // 500秒后关名字动画
          await new Promise((res)=>{
            setTimeout(res, 3000);
          })
          this.showfloatdonghua=false
        }
        this._jieshu()
      },2000)
      if(this.obj1.skills.some(item=> item=='天照' )){
        // 4秒后释放天照
        await new Promise((res)=>{
          setTimeout(res, 4000);
        })
        this.showfloatdonghua=true
        // 500秒后关名字动画
        await new Promise((res)=>{
          setTimeout(res, 3000);
        })
        this.showfloatdonghua=false
        this.TIM1=setInterval(() => {
          this.showgongjidonghua = true
          // setTimeout(() => {
          //   this.showgongjidonghua = false
          // }, 100);
          this.obj2.life-= Math.ceil(this.obj2.maxLife * 0.001)
          console.log('11');
          this._jieshu()
        }, 500);
      }
      // 半秒进程
      this.TIM2=setInterval(() => {
      }, 500);
      // 秒进程
      this.TIM3=setInterval(() => {
        this.obj1.life+= this.obj1.huixue
        this.obj1.lan+= this.obj1.meimiaolan
      }, 1000);
    },
    // 选技能
    _chooseSkills(item){
      if(item.id == 1) {
        this.obj1.attack +=5
      }else if(item.id == 2) {
        this.obj1.life +=50
        this.obj1.maxLife +=50
      }else if(item.id == 3) {
        this.obj1.huixue +=1
      }else if(item.id == 4) {
        this.obj1.attack +=1
        this.obj1.beingAttacked +=1
      }else if(item.id == 5) {
        this.obj1.chengzhangxueliang +=10
      }else if(item.id == 6) {
        this.obj1.fiveAddAttack +=8
      }else if(item.id == 7) {
        this.obj1.meimiaolan +=1
      }
      // 选完技能后关闭技能框
      this.showChooseSkillsBox=false
      // 展示进攻Icon
      this.showFight=true
      // 初始化属性
      this.obj1.life=this.obj1.maxLife
      this.obj2.life=this.obj2.maxLife
    },
    _chooseHeros(item){
      if(item.id==3 || item.id==4) {
        alert('请期待')
        return
      }
      this.obj1.skills=this.heros[item.id-1].skills
      this.obj1.id=this.heros[item.id-1].id
      this.obj1.gongjidonghua=this.heros[item.id-1].gongjidonghua
      this.showChooseHeroBox=false
      // 随机技能选择
      this.skillsCOPY=this._getRandomArrayElements(this.skills,4)
      // 展示选择技能框
      this.showChooseSkillsBox = true
      let m = document.getElementById('music');
      m.play();//播放
    },
    _levelMonster(){
      this.level++
      this.obj2=this.monsters[this.level-1]
    },
    _randomNum(minNum,maxNum){ 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    },
    // 随机从数组中选几个元素
    _getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    _jieshu(){
      if(this.obj1.life<=0){
        clearInterval(this.TIM)
        clearInterval(this.TIM1)
        clearInterval(this.TIM2)
        clearInterval(this.TIM3)
        this.showgongjidonghua = false
        alert('挂逼了')
        location.reload()
      }else if (this.obj2.life<=0){
        clearInterval(this.TIM)
        clearInterval(this.TIM1)
        clearInterval(this.TIM2)
        clearInterval(this.TIM3)
        this.showgongjidonghua = false
        alert('胜利!')
        if(this.obj1.chengzhangxueliang) {
          this.obj1.maxLife += this.obj1.chengzhangxueliang
        }
        this._win()
      }
    }
  },
  created(){
    this._inits()
  },
  mounted(){
  },
  watch:{
    obj1:{
      handler(newVal){
        if(newVal.life>this.obj1.maxLife){
          newVal.life = this.obj1.maxLife
        }
        if(newVal.lan>this.obj1.maxLan){
          newVal.lan = this.obj1.maxLan
        }
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.title {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bolder;
  color: #f3c258;
}
.title2 {
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-weight: bolder;
  color:#fb6400 !important;
  font-size: 20px;
}
.title3 {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bolder;
  color:#fb6400 !important;
  font-size: 20px;
}
.container {
  width: 100%;
  height: 100%;
  // background:url('../imgs/ui/bg.png');
  // background-size: 100% 100%;
}
.container-inner {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
}
.myBox,.monsterBox {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .renwutupian {
    width: 100px;
    height: 100px;
  }
  .fangyushanghai,.jingongshanghai {
    position: absolute;
    // top: 0px;
    // left: 0px;
    left: 20%;
    top: 40%;
    transition: all 0.7s;
    color: red;
    font-size: 20px;
  }
  .showgongjidonghua {
    position: absolute;
    left: 5%;
    top:-7%;
    // transition: all 0.1s;
    // opacity: 0;
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
    }
  }
  .showfangyudonghua {
    position: absolute;
    left: 0%;
    // transition: all 0.1s;
    // opacity: 0;
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
.fightingBox {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .floatdonghua {
    z-index: 1;
    color:yellow;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    transition: all 3s;
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
    &.active {
      opacity: 1;
      width: 200px;
      height: 200px;
    }
  }
  .kaishianniu{
    z-index: 2;
    text-align: center;
    color: blue;
    // border: 1px solid black;
    padding: 5px;
    // background: white;
    border-radius: 10px;
  }
}
// .monsterBox {
//   flex: 1;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   img {
//     width: 100px;
//     height: 100px;
//   }
//   .jingongshanghai {
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     transition: all 0.7s;
//     color: red;
//   }
// }
.Article-blood,.lan-blood {
  width: 10px;
  height: 100px;
  border: 1px solid black;
  margin-left: 10px;
  position: relative;
  border-radius: 5px;
  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    border-radius: 5px;
  }
}
.lan-blood {
  div {
    background-color: blue;
  }
}
.chooseSkills {
  width: 90%;
  height: 450px;
  // border:1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background:url('../imgs/bg/bg_xuanjineng.png');
  background-size: 100% 100%;
  .skillBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding:0 20px 20px;
    box-sizing: border-box;
    flex:1;
    div {
      width: 130px;
      height: 150px;
      // border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
.choosehero {
  width: 90%;
  height: 600px;
  // border:1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background:url('../imgs/bg/bg_xuanjineng.png');
  background-size: 100% 100%;
  .heroBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding:0 20px 20px;
    box-sizing: border-box;
    flex:1;
    div {
      width: 130px;
      height: 150px;
      // border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
.shuxinglan {
  color: aqua;
}
</style>
