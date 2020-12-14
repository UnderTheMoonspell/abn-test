export default class Utils {

  static buildTreeData (arr, parentKey) {
    const treeData = []
    const inputArray = arr.slice()
    const tempMap = {}
    inputArray.forEach(item => tempMap[item.name] = {...item, children: []});
    inputArray.forEach(item => {
      if (item[parentKey]) {
        tempMap[item[parentKey]].children.push(tempMap[item.name])
      } else {
        treeData.push(tempMap[item.name])
      }
    });
    return treeData
  }

  static debounce (func, wait, immediate) {
    let timeout;

    return function executedFunction () {
      let context = this;
      let args = arguments;

      let later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      let callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }
}
