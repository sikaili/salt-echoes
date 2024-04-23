import setListeners from '../utils/setEventListeners';


export default function shapeInSpace(sk) {
  const createDebris = (index,x,y,size, color)=> ({
    index:index,
    x:x?x:sk.noise(index)*sk.windowWidth,
    y:y?y:Math.random()*sk.windowHeight,
    speed: sk.noise(index*index/100)*0.05,
    size: size?size:sk.noise(1000/index)*30,
    vector: {
      x:sk.noise(index/20)-0.3+Math.sin(sk.frameCount/200),
      y:sk.noise(index/100)-0.2,
    },
    isOutSide:(item)=>{
      return (item.x > sk.width)||(item.y>sk.height);
    },
    display: (item)=>{
      sk.push();
      if(item.isOutSide(item)){
        item.vector.x*=-1;
        item.vector.y*=-1;
      }
      sk.translate(item.x +=item.vector.x, item.y +=item.vector.y);
      sk.rotateZ(sk.frameCount * item.speed);
      sk.rotateX(sk.frameCount * item.speed);
      sk.rotateY(sk.frameCount * 0.01);
      if(color && sk.noise(item.x, item.y)>0.6){

        sk.emissiveMaterial(255,50,50);
      }
      switch (Math.floor(sk.noise(sk.frameCount/200+sk.mouseX/3+sk.mouseY/3+index) * 3)) {
        case 0:
          sk.plane(item.size);
          break;
        case 1:
          sk.box(item.size/2);
          break;
        case 2:
          sk.sphere(item.size / 4);
          break;
      }
      sk.pop();
    }
  })
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL);
    sk.normalMaterial();
    sk.ambientLight(100, 100, 100);
    sk.pointLight(250, 250, 250, sk.mouseX - sk.width / 2, sk.mouseY - sk.height / 2, 50);
    sk.debris = Array(666).fill('').map((item, index)=>{
      return createDebris(index);
    })
    sk.backgroundColor = Math.random()>0.5?28:228;
    sk.currentBackgroundColor = 0;
  }
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  }
  window.sk = sk;

  sk.handleTouchStart = () =>{
    sk.backgroundColor=Math.random()*255;
    Array(Math.ceil(Math.random()*25)).fill('').map((item, index)=>{
      sk.debris?.push(createDebris(Math.random()*400*index, sk.mouseX, sk.mouseY, Math.random()*sk.width/8, true))
    })
  }

  sk.draw = () => {
    sk.currentBackgroundColor += (sk.backgroundColor - sk.currentBackgroundColor)*0.05
    sk.background(sk.currentBackgroundColor);
    sk.translate(-sk.width/2,-sk.height/2)
    sk.debris.map(item=>{
      item.display(item);
    })
  };
  setListeners(sk);

}