export function addClass (el, className) {
  if (hasClass(el, className)) {

  } else {
    let newClassName = el.className.split(' ')
    newClassName.push(className)
    el.className = newClassName.join(' ')
  }
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(//s|$)')
  return reg.test(el.className)
}
export function getindex (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
