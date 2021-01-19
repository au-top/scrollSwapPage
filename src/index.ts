import $ from "jquery";
import "jquery-mousewheel";
import "./index.d";

class scrollGod {
  index: number;
  domList: HTMLDivElement[];
  lock: boolean;
  animationTime: number;
  rootSelect:string;
  reversal:boolean;
  Stateization = (a: number) => (a === 0 ? 0 : a > 0 ? 1 : -1);
  moveCallBack: (
    a: boolean,
    b: number,
    c: HTMLDivElement | undefined
  ) => any | void;
  _onscroll(e: JQueryMousewheel.JQueryMousewheelEventObject) {
    e.deltaY=this.reversal?this.Stateization(e.deltaY)*-1:e.deltaY;
    if (
      this.lock ||
      this.index + this.Stateization(e.deltaY) >= this.domList.length ||
      this.index + this.Stateization(e.deltaY) < 0
    ) {
      this.moveCallBack(false, this.index, undefined);
      return;
    }
    this.lock = true;
    this.index += this.Stateization(e.deltaY);

    $(this.rootSelect).animate(
      {
        scrollTop: `${$(this.domList[this.index]).offset()?.top ?? 0}`,
      },
      this.animationTime,
      () =>
        void (this.lock = false) ||
        this.moveCallBack(true, this.index, this.domList[this.index])
    );
  }

  constructor(config: scrollGodConfig) {
    this.lock = false;
    this.reversal=config.reversal??false;
    this.index = config.index;
    this.domList = config.domList;
    this.animationTime = config.animationTime;
    this.moveCallBack = config.callBack;
    this.rootSelect= config.rootSelect??"body,html";
    const movePos = $(config.domList[config.index]).offset()?.top;
    $(this.rootSelect).scrollTop(movePos ?? 0);
    $(document).mousewheel(this._onscroll.bind(this));
  }
}

window['scrollGod']=scrollGod;

new scrollGod({
  domList: Array.from(document.querySelectorAll("div")),
  index: 1,
  animationTime: 500,
  rootSelect:"body,html",
  reversal:true,
  callBack: (state, index, dom) => console.log(state, index, dom),
});
