// Find components upward
function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export {
  findComponentUpward
}

// Find component downward
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find components downward
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export function findComponentsUpward (context, componentName) {
  const parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// Find brothers components
export function findBrothersComponents (context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  const index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

// 寻找子节点
export function findChildren (context, componentName, ignoreComponentNames = []) {
  if (!Array.isArray(ignoreComponentNames)) {
    ignoreComponentNames = [ignoreComponentNames]
  }
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
      const foundChilds = findComponentsDownward(child, componentName)
      return components.concat(foundChilds)
    } else {
      return components
    }
  }, [])
}

// 寻找父节点
export function findParents (context, componentName) {
  const parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 寻找兄弟节点
export function findBrothers (context, componentName, exceptSelf = true) {
  const res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  const index = res.findIndex(item => item._uid === context._uid)
  if (exceptSelf) res.splice(index, 1)
  return res
}
