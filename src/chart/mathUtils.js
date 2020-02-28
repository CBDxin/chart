export function random(n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10,n-1))
}

export function getActiveIndex(x, list){
  let result;
  list.sort((a, b)=>{
    return a - b;
  });
  list.some((item, index)=>{
    if(index === 0){
      result = index
    }else{
      if(Math.abs(x - item) > Math.abs(x - list[index - 1])){
        result = index - 1;
        return true;
      }else{
        result = index;
        return false;
      }
    }
    return false;
  })
  return result;
}

