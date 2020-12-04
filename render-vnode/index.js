var vnodes = [
  {
    id: 'node1',
    type: 'div',
    className: 'section1',
    childrens: [
      {
        id: 'node2',
        type: 'div',
        className: 'test',
        childrens: [
          {
            id: 'node3',
            type: 'span',
            context: '说明文字',
            childrens: []
          },
          {
            id: 'node4',
            type: 'i',
            context: '',
            childrens: []
          }
        ]
      }
    ]
  },
  {
    id: 'node5',
    type: 'div',
    className: 'section2',
    childrens: [
      {
        id: 'node6',
        type: 'input',
        className: 'custom-input',
        childrens: []
      }
    ]
  }
];

/**
 * 属性 map
 */
const attrMap = {
  className: 'class',
  id: 'id'
};

/**
 * 开始工作
 * @param {*} node
 * @param {*} parentNode
 */
function beginWork(node, parentNode) {
  switch (node.type) {
    case 'div':
      updateHostComponent(node, parentNode);
      break;
    case 'input':
      updateInputComponent(node, parentNode);
      break;
    case 'span':
      updateSpanComponent(node, parentNode);
      break;
    case 'i':
      updateIComponent(node, parentNode);
      break;
    default:
      break;
  }
}

/**
 * 设置 attr 属性
 * @param {*} node
 */
function setNodeAttr(node) {
  Object.keys(node).forEach(attr => {
    if (attr in attrMap) {
      node.stateNode.setAttribute(attrMap[attr], node[attr]);
    }
  });
}

/**
 * 设置文本内容
 * @param {*} node
 * @param {*} context
 */
function setNodeContext(node, context) {
  node.stateNode.textContent = context;
}

/**
 * 更新 host
 * @param {*} node
 * @param {*} parentNode
 */
function updateHostComponent(node, parentNode) {
  const div = document.createElement('div');
  node.stateNode = div;
  setNodeAttr(node);
  node.childrens.forEach(node => {
    beginWork(node, div);
  });
  parentNode.appendChild(div);
}

/**
 * 更新 span
 * @param {*} node
 * @param {*} parentNode
 */
function updateSpanComponent(node, parentNode) {
  const span = document.createElement('span');
  node.stateNode = span;
  setNodeAttr(node);
  setNodeContext(node, node.context);
  parentNode.appendChild(span);
}

/**
 * 更新 input
 * @param {*} node
 * @param {*} parentNode
 */
function updateInputComponent(node, parentNode) {
  const input = document.createElement('input');
  node.stateNode = input;
  setNodeAttr(node);
  parentNode.appendChild(input);
}

/**
 * 更新 i 标签
 * @param {*} node
 * @param {*} parentNode
 */
function updateIComponent(node, parentNode) {
  const i = document.createElement('i');
  node.stateNode = i;
  setNodeAttr(node);
  setNodeContext(node, node.context);
  parentNode.appendChild(i);
}

/**
 * 移动节点至目标节点
 * @param {*} source
 * @param {*} target
 */
function moveNode(source, target) {
  target.stateNode.appendChild(source.stateNode);
}

/**
 * 渲染
 */
function render() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  vnodes.forEach(node => {
    beginWork(node, container);
  });
}

render();

moveNode(vnodes[0].childrens[0].childrens[0], vnodes[1]);
