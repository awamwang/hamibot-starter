import { Image } from 'images'

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

export function findOneSelectorAncestor(current: UiObject, selector: UiSelector): UiObject | null {
  // 找一个符合selector的祖先
  let target = current.parent() // 从parent开始判断
  let parentParent = target?.parent() || null

  while (target && parentParent) {
    if (parentParent.find(selector).includes(target)) {
      return target
    } else {
      target = parentParent
      parentParent = parentParent.parent()
    }
  }

  return null
}

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
  return clickSelectorAncestor(className('android.widget.TextView').text(text), {
    ...config,
    selectorDesc: `TextView(${text})`,
  })
}

// 对UiObject的Bounds进行操作，返回操作是否成功
export function operateUiBounds(target: UiObject | null, operation = click): boolean {
  if (!target) return false

  const bounds = target.bounds()
  if (!bounds) return false

  if (operation === click) {
    click(bounds.centerX(), bounds.centerY())
  }

  return true
}

export function clickImg(img: Image | string | null) {
  if (typeof img === 'string') {
    img = images.fromBase64(img)
  }

  if (!img) return null

  let pos = findImage(captureScreen(), img)

  if (pos) {
    click(pos.x, pos.y)
    return pos
  } else {
    Record.warn(`图片不存在`)
    return null
  }
}
