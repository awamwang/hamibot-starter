import { Record } from '../../lib/logger'

let 搜索 = (keyword: string, { findTimeout = 2000 }) => {
  // className = android.widget.TextView
  const 搜索按钮 = className('android.widget.TextView').text('搜索').findOne(findTimeout)
  // const 搜索框 = className('android.widget.RelativeLayout').id('origin_toolbar').findOnce()
  if (!搜索按钮) {
    Record.warn('没有找到搜索按钮')
    return false
  }
  搜索按钮.click()

  const 搜索关键词 = id('search_keyword').findOne(findTimeout)
  if (!搜索关键词) {
    Record.warn('没有找到搜索关键词输入框')
    return false
  }

  setClip(keyword)
  搜索关键词.paste()
  sleep(1000)
  // const 添加框 = id('add_search_keyword').findOne(findTimeout)
  // if (!添加框) {
  // if (!搜索关键词.setText(keyword)) {
  //   Record.warn('搜索关键词设置失败')
  //   return false
  // }

  const 签到入口 = className('android.widget.TextView').text('签到开红包').findOne(findTimeout)
  // const 首选结果 = className('android.widget.FrameLayout').desc('main_item').clickable().findOne(findTimeout)
  if (!签到入口) {
    Record.warn('没有找到签到入口')
    return false
  }

  签到入口.click()
}
