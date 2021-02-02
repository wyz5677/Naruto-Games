<template>
  <div class="container">
    <div class="title">
      第{{level}}关
    </div>
    <div class="myBox">
      <div style="display:flex;margin-right:20px;">
        <img src="../imgs/you.jpg" alt="">
        <div v-show="fangyushanghai" ref="fangyushanghai" class="fangyushanghai">
          -{{fangyushanghai}}
        </div>
        <div class="Article-blood">
          <div :style="{'height':obj1.life*100/obj1.maxLife+'%'}">
          </div>
        </div>
      </div>
      <div>
        <div>
          攻击：{{obj1.attack}}
        </div>
        <div style="margin-top:10px;">
          生命：{{obj1.maxLife}}
        </div>
      </div>
    </div>
    <div class="fightingBox">
      <div @click="_gameStart">
        开始战斗
      </div>
    </div>
    <div class="monsterBox">
      <div style="display:flex;margin-right:20px;">
        <img :src="require(`../imgs/monster${level}.jpg`)" alt="">
        <div class="Article-blood">
          <div :style="{'height':obj2.life*100/obj2.maxLife+'%'}">
          </div>
        </div>
      </div>
      <div>
        <div>
          攻击：{{obj2.attack}}
        </div>
        <div style="margin-top:10px;">
          生命：{{obj2.maxLife}}
        </div>
      </div>
    </div>
    <div class="chooseSkills" v-show="showChooseSkillsBox">
      <div class="title">请选择技能</div>
      <div class="skillBox">
        <div v-for="(item,index) in skills" :key="index" @click="_chooseSkills(item)">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      obj1:{
        attack:8,
        maxLife:15000,
        rate:10,
        life:15000,
        beingAttacked:0
      },
      obj2:{
        attack:5,
        maxLife:10000,
        life:10000,
         rate:10,
      },
      monsters:[
        {
          attack:5,
          maxLife:8000,
          life:8000,
          rate:10,
        },{
          attack:7,
          maxLife:15000,
          life:15000,
           rate:10,
        },{
          attack:9,
          maxLife:30000,
          life:30000,
           rate:10,
        },{
          attack:5,
          maxLife:80000,
          life:80000,
          rate:10,
        },{
          attack:9,
          maxLife:80000,
          life:80000,
           rate:10,
        },{
          attack:10,
          maxLife:100000,
          life:100000,
          rate:10,
        }
      ],
      skills:['+10攻击','+5000血量','每秒多攻击1次','每次被攻击减少2点伤害'],
      level:0,
      showChooseSkillsBox:false,
      // 进攻造成伤害
      jingongshanghai:0,
      // 防御造成伤害
      fangyushanghai:0
    }
  },
  methods: {
    _init(){
      // 初始化属性
      this.obj1.life=this.obj1.maxLife
      this.level++
      this._levelMonster()
      this.showChooseSkillsBox = true
    },
    _gameStart(){
      let TIM=setInterval(()=>{
        // 进攻伤害位置变化
        this.$refs.fangyushanghai.style.top=this._randomNum(40,140)+'px'
        this.$refs.fangyushanghai.style.left=this._randomNum(50,150)+'px'
        // 进攻
        for(let i =0 ;i<=this.obj1.rate;i++){
          this.jingongshanghai = this.obj2.attack
          this.obj2.life-=this.jingongshanghai
        }
        // 防御
        for(let i =0 ;i<=this.obj2.rate;i++){
          if(this.obj1.beingAttacked) {
            this.fangyushanghai=(this.obj2.attack-this.obj1.beingAttacked)
            this.obj1.life-=this.fangyushanghai
          }else{
            this.fangyushanghai=this.obj2.attack
            this.obj1.life-=this.fangyushanghai
          }
        }
        if(this.obj1.life<=0){
          clearInterval(TIM)
          alert('挂逼了')
          this._init()
        }else if (this.obj2.life<=0){
          clearInterval(TIM)
          alert('胜利!')
          this._init()
        }
      },100)
    },
    _chooseSkills(item){
      if(item == '+10攻击') {
        this.obj1.attack +=2
      }else if(item == '+5000血量') {
        this.obj1.life +=5000
        this.obj1.maxLife +=5000
      }else if(item == '每秒多攻击1次') {
        this.obj1.rate +=1
      }else if(item == '每次被攻击减少2点伤害') {
        this.obj1.beingAttacked +=2
      }
      this.showChooseSkillsBox=false
    },
    _levelMonster(){
      this.obj2=this.monsters[this.level-1]
    },
    _randomNum(minNum,maxNum){ 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    } 
  },
  created(){
    this._init()
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
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:url('../imgs/bg.jpg');
  background-size: 100% 50%;
}
.myBox {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    width: 100px;
    height: 100px;
  }
  .fangyushanghai {
    position: absolute;
    top: 0px;
    left: 0px;
    transition: all 0.5s;
  }
}
.fightingBox {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    text-align: center;
    color: blue;
    border: 1px solid black;
    padding: 5px;
    background: white;
    border-radius: 10px;
  }
}
.monsterBox {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
    height: 100px;
  }
}
.Article-blood {
  width: 10px;
  height: 100px;
  border: 1px solid black;
  margin-left: 10px;
  position: relative;
  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: red;
  }
}
.chooseSkills {
  width: 90%;
  height: 450px;
  border:1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
    }
  }
}
</style>
