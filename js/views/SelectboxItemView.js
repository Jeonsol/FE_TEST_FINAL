import View from "./View.js"

/**
 * 이미지 선택박스 아이템 요소 정의
 */
class SelectBoxItemView extends View {
  constructor ({thumbURL, imgDesc} = {}) {
    super();

    this.tagName = 'li';
    this.children = [
      new View({
        tagName: 'a',
        className: 'link',
        attributes: {
          href: '#'
        },
        children: [
          new View({
            tagName: 'span'
          }),
          new View({
            tagName: 'img',
            attributes: {
              src: thumbURL || '',
              alt: imgDesc || '',
              width: 92,
              height: 60
            }
          })
        ]
      })
    ];
  }
}

export default SelectBoxItemView
