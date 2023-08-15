// import { ApplicationInfo, PackageInfo } from 'app'

const PackageNameReg = /^com\.(\S+)\.(\S+)/
const SettingPackageName = 'com.android.settings'
const ForceStop = '强行停止'

export class AwamApp {
  packageName = ''
  appName = ''
  // packageInfo: PackageInfo | null;
  // appInfo: ApplicationInfo | null;

  constructor(name) {
    // 如果name是com.hamibot.hamibot格式，则不做处理，否则调用getPackageName获取包名
    if (!PackageNameReg.test(name)) {
      name = getPackageName(name)
    }

    if (!name) {
      throw new exceptionUtils.BaseException('无效的包名或APP名，可能APP未安装')
    }

    this.packageName = name
    this.appName = app.getAppName(this.packageName) || '获取失败'
    // this.packageInfo = app.getPackageInfo(this.packageName);
    // this.appInfo = this.packageInfo.applicationInfo;
  }

  // 启动，调用launch启动app
  start() {
    // 确保APP启动
    threads.start(() => {
      while (currentPackage() != this.packageName) {
        app.launchPackage(this.packageName)

        sleep(500)
      }
    })

    Record.log(`启动APP: ${this.appName}`)
  }

  stop() {
    app.openAppSetting(this.packageName)

    // text(ForceStop).packageName(SettingPackageName).waitFor();
    const 强行停止按钮 = text(ForceStop).packageName(SettingPackageName).findOne()

    if (强行停止按钮) {
      强行停止按钮.click()

      if (textContains('可能导致异常').findOne(1000)) {
        textContains('确定').findOne().click()
      }
      sleep(100)
    }

    Record.log(`关闭APP: ${this.appName}`)
  }

  restart() {
    this.stop()
    this.start()
  }
}
