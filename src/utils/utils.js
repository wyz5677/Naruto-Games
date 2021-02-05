export function _randomNum(minNum,maxNum){ 
    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
}

 // 随机从数组中选几个元素
export function _getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}