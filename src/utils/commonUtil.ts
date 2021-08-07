export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

export function isPrimitive(value: any) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean" ||
    typeof value === "function"
  );
}

export function isArray(obj: any) {
  return Object.prototype.toString.call(obj) == "[object Array]";
}

export function isString(obj: any) {
  return Object.prototype.toString.call(obj) == "[object String]";
}

export function isBlob(obj: any) {
  return Object.prototype.toString.call(obj) == "[object Blob]";
}

export function isNumber(obj: any) {
  return Object.prototype.toString.call(obj) == "[object Number]";
}

export function isFunction(obj: any) {
  return Object.prototype.toString.call(obj) == "[object Function]";
}

export function walkObj(
  obj: Record<string, any>,
  handler: (value: any, key: string, obj: any) => void | boolean,
  context?: any
): void {
  if (isEmpty(obj)) {
    console.error("遍历的obj对象为空");
    return;
  }
  const keys = Object.keys(obj);
  const len = keys.length;
  let key = null,
    value = null;
  for (let i = 0; i < len; i++) {
    key = keys[i];
    value = obj[key];
    if (!isEmpty(handler)) {
      const stop = handler.call(context, value, key, obj);
      if (stop) {
        return;
      }
    }
  }
}

/**
 *
 * 判断是否为空
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isEmpty(obj: any): boolean {
  return obj === undefined || obj === null || obj === "";
}

/**
 *
 * 去除字符串前后空格
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function trim(str: string): string {
  if (str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  }
  return str;
}

export function walkArray(
  array: Array<any>,
  handler: (item: any, index: number, data: Array<any>) => void | boolean,
  context?: any
): void {
  if (isEmpty(array)) {
    return;
  }
  const len = array.length;
  let value;
  for (let i = 0; i < len; i++) {
    value = array[i];
    if (!isEmpty(handler)) {
      const stop: boolean | void = handler.call(context, value, i, array);
      if (stop) {
        return;
      }
    }
  }
}

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 *
 * 将含横杠字符串转成驼峰式字符串如：article-author-name 转成 驼峰式 articleAuthorName
 * @export
 * @param {string} str
 * @return {*}
 */
export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
// export function requireDir(
//   container: Record<string | number, any>,
//   path: string,
//   Regex: RegExp
// ): Record<string | number, any> {
//   const modulesFiles = require.context(path, true, Regex);
//   container = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules;
//   }, container);
//   return container;
// }

/**
 *
 * 将 source上所有属性复制一份到target上，当有相同属性时会不会覆盖取决于override是否为true,默认为true
 * @export
 * @param {*} target
 * @param {*} source
 * @param {boolean} [isInter=false]
 * @param {boolean} [override=true]
 * @return {*}
 */
export function extend(target: any, source: any, isInter = false, override = true) {
  if (!override) {
    if (isEmpty(source)) {
      return;
    }
  }
  if (isPrimitive(source)) {
    if (override || isEmpty(target)) {
      target = source;
    }
  } else if (isObject(source)) {
    if (isInter) {
      if (!isObject(target)) {
        target = {};
      }
    }
    for (const p in source) {
      if (Object.prototype.hasOwnProperty.call(source, p)) {
        target[p] = extend(target[p], source[p], true, override);
      }
    }
  } else if (isArray(source)) {
    if (isInter) {
      if (!isArray(target)) {
        target = [];
      }
    }
    const len = source.length;
    for (let i = 0; i < len; i++) {
      target[i] = extend(target[i], source[i], true, override);
    }
  }
  return target;
}

export function ArrayToObject(
  object: Record<string, any>,
  array: Array<any>,
  config: { deep: boolean; key: string; childKey: string; handler?: (item: any) => any } = {
    deep: true,
    key: "name",
    childKey: "children",
  }
) {
  walkArray(array, function (item: any) {
    object[item[config.key]] = item;
    if (config.deep && item[config.childKey]) {
      ArrayToObject(object, item[config.childKey], config);
    }
    if (config.handler) {
      object[item[config.key]] = config.handler(object[item[config.key]]);
    }
  });
  return object;
}

export function bubbleSort(
  arr: Array<any>,
  config: { key: string; asc: boolean } = { key: "", asc: true }
) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      const valuej = config.key ? arr[j][config.key] : arr[j];
      const valuej1 = config.key ? arr[j + 1][config.key] : arr[j + 1];
      if (config.asc) {
        if (valuej > valuej1) {
          // 相邻元素两两对比
          const temp = arr[j + 1]; // 元素交换
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      } else {
        if (valuej < valuej1) {
          // 相邻元素两两对比
          const temp = arr[j + 1]; // 元素交换
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
  return arr;
}
