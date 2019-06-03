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
