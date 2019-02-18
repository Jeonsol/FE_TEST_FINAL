/**
 * 구체화된 요소에 대한 정의
 * Element 클래스가 존재해서 임의로 View 로 명명
 */
class View {
  constructor({
    tagName = '',
    id = '',
    className = '',
    attributes = {},
    content = '',
    children = []
  } = {}) {
    this.tagName = tagName;
    this.id = id;
    this.className = className;
    this.attributes = attributes;
    this.content = content;
    this.children = children;
  }

  /**
   * 요소로 생성
   */
  createElement () {
    const element = document.createElement(this.tagName);

    if (this.id) {
      element.id = this.id;
    }

    if (this.className) {
      element.className = this.className;
    }

    if (this.content) {
      element.innerText = this.content;
    }

    if (this.attributes) {
      Object.keys(this.attributes).forEach(key => {
        const value = this.attributes[key];
  
        element.setAttribute(key, value);
      });
    }

    if (this.children) {
      this.children.forEach(child => {
        element.appendChild(child.createElement());
      });
    }

    return element;
  }
}

export default View
