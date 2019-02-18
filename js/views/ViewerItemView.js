import View from "./View.js"

/**
 * 뷰어 아이템 요소 정의
 */
class ViewerItemView extends View {
  constructor({viewURL, imgDesc} = {}) {
    super();

    this.tagName = 'li';
    this.children = [
      new View({
        tagName: 'img',
        id: 'bigImg',
        className: 'fade_in',
        attributes: {
          src: viewURL || '',
          alt: imgDesc || '',
          width: 980,
          height: 654,
          style: 'position: absolute; top: 50%; transform: translate(-50%, -50%);'
        }
      })
    ];
  }
}

export default ViewerItemView
