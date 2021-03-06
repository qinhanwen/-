class MaxHeap {
  constructor(arr = []) {
    this.data = arr;
    //heapify方式创建堆结构
    for (let i = this.parent(arr.length - 1); i >= 0; i--) {
      this.siftDown(i);
    }
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return !this.data.length;
  }
  //父索引
  parent(index) {
    if (index === 0) {
      throw new Error(`'index-0 doesn't not have parent `);
    }
    return ((index - 1) / 2) | 0;
    //这是索引从0开始的情况，如果从1开始可以直接index/2向下取整即可
  }
  leftChild(index) {
    return index * 2 + 1;
  }
  rightChild(index) {
    return index * 2 + 2;
  }
  add(element) {
    this.data.push(element);
    this.siftUp(this.data.length - 1); //将最后一个元素进行上浮操作
  }
  findMax() {
    if (this.data.length === 0) {
      //越界判断
      throw new Error('is empty');
    }
    return this.data[0]; //因为是最大堆所以找数组第一个元素即可
  }
  extractMax() {
    const ret = this.findMax();
    this.swap(this.data, 0, this.data.length - 1);
    this.data.pop();
    siftDown(0); //下沉操作
    return ret;
  }
  //上浮
  siftUp(index) {
    //只要元素没有上浮到最顶层并且父元素比当前小就继续上浮(堆的性质：
    //最大堆的父节点应该比左右两个结点都要大
    while (index > 0 && this.data[this.parent(index)] < this.data[index]) {
      //交换数组中位置
      this.swap(this.data, index, this.parent(index));
      //是不是依然不满足堆的性质
      index = this.parent(index);
    }
  }
  //下沉
  siftDown(index) {
    //极端情况：当左孩子索引小于数组长度时代表绝对没有右孩子，是叶子结点
    while (this.leftChild(index) < this.data.length) {
      let j = this.leftChild(index);
      if (j + 1 < this.data.length && this.data[j + 1] > this.data[j]) {
        j = this.rightChild(index);
      }
      //data[j]是左右孩子中最大的值
      if (this.data[index] > this.data[j]) {
        break; //满足了堆的性质直接跳出
      } else {
        this.swap(this.data, index, j); //否则继续交换
        index = j;
      }
    }
  }
  //交换方法
  swap(array, i, j) {
    if (i < 0 || i >= this.data.length || j < 0 || j >= this.data.length) {
      throw new Error('索引越界');
    }
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const maxHeap = new MaxHeap();
maxHeap.add(4);
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);
maxHeap.add(6);
maxHeap.add(5);
console.log(maxHeap);
