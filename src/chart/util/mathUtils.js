import { timer } from "d3";

export function random(n) {
  if (n > 21) return null
  return parseInt((Math.random()) * Math.pow(10,n))
}

/**
 * 三阶贝塞尔曲线ease-in-out
 * @param {number} k
 */
function easeInOutCubic(k) {
  return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
}

let timeStamp;

export let transition = (animation, duration)=>{
  timeStamp && timeStamp.stop();
  timeStamp = timer((elapsed)=>{
    let precent = elapsed / duration
    if(precent > 1){
      timeStamp.stop();
      timeStamp = null;
    }else{
      animation(precent)
    }
  })
}

export let sumArr =  (arr)=>{
  return arr.reduce(function(prev,cur){
      return prev + cur;
  },0);
}