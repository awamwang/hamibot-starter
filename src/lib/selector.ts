export interface AwamSelectorConfig {
  text?: string;
  className?: string;
  desc?: string;
}

export class AwamSelector extends UiSelector {
  getIdMap(): { [key: string]: AwamSelectorConfig } {
    return {
      "123": {
        text: "我的",
        className: "icon-my",
        desc: "我的",
      },
    };
  }
}
