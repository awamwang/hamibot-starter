import { Record } from './logger'

// UiObject.prototype.findOneAncestor = function (selector: UiSelector): UiObject | null {
//   // 一个符合selector的祖先
//   let target = this.parent() // 从parent开始判断
//   let parentParent = target?.parent() || null

//   while (target && parentParent) {
//     if (parentParent.find(selector).includes(target)) {
//       return target
//     } else {
//       target = parentParent
//       parentParent = parentParent.parent()
//     }
//   }

//   return null
// }

export function getSelectorDesc(selector: UiSelector) {
  return selector
}

export function clickSelectorAncestor(
  selector: UiSelector,
  config: UiOperationConfig & {
    selectorDesc?: string
  } = {}
): UiObject | null {
  const { findTimeout = 2000, selectorDesc = selector } = config

  let target = selector.findOne(findTimeout)

  while (target) {
    if (target.clickable()) {
      target.click()
      return target
    } else {
      target = target.parent()
    }
  }

  Record.warn(`没有找到 selector: ${selectorDesc}`)
  return null
}

export function clickAncestor(target: UiObject | null): UiObject | null {
  // return target?.clickable() ? target : target!.findOneAncestor(selector().clickable())

  // 向上查找可点击的parent()
  while (target) {
    if (target.clickable()) {
      target.click()
      return target
    } else {
      target = target.parent()
    }
  }

  Record.warn(`没有找到带有文字${text}的可点击控件`)
  return null
}

export function clickTextViewAncestor(text: string, config: UiOperationConfig = {}): UiObject | null {
  const { findTimeout = 2000 } = config

  // let target = className('android.widget.TextView').text(text).findOne(findTimeout)
  const target = clickSelectorAncestor(className('android.widget.TextView').text(text), {
    ...config,
    selectorDesc: `TextView(${text})`,
  })

  if (!target) {
    Record.warn(`没有找到${text}`)
    return null
  }

  return clickAncestor(target)
}
