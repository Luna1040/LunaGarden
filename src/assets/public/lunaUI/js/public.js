// 寻找子节点
export function findChildren (context, componentName, ignoreComponentNames = []) {
    if (!Array.isArray(ignoreComponentNames)) {
        ignoreComponentNames = [ignoreComponentNames];
    }
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
            const foundChilds = findComponentsDownward(child, componentName);
            return components.concat(foundChilds);
        } else {
            return components;
        }
    }, []);
}

// 寻找父节点
export function findParents (context, componentName) {
    let parents = [];
    const parent = context.$parent;
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}

// 寻找兄弟节点
export function findBrothers (context, componentName, exceptSelf = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
    });
    let index = res.findIndex(item => item._uid === context._uid);
    if (exceptSelf) res.splice(index, 1);
    return res;
}
