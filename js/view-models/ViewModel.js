import assert from "../utils/assert.js"

/**
 * 뷰를 추상화하는 뷰모델에 대해서 정의
 * - 사용하는 요소
 * - 이벤트
 * - 상태(데이터)
 */
class ViewModel extends EventTarget {
  constructor ({
    elements = {},
    events = {},
    state = {}
  } = {}) {
    super();

    assert([typeof elements, typeof events, typeof state].every(type => type === 'object'));

    // 데이터구조
    // elements = {elementName: element, ...}
    // events = {elementName: {eventName: eventHandler...}, ... }
    // state = {prop: value, ...}
    this.elements = elements;
    this.events = events;
    this._state = state;
  }

  /** 
   * state getter 함수
   */
  get state() {
    return this._state;
  }

  /**
   * state setter 함수
   * state 변경에 따른 업데이트 함수 실행 (자동화)
   */
  set state(data) {
    this._state = {...this._state, ...data};
    this.update(this._state);
  }

  /**
   * 뷰의 상태, 이벤트를 초기화
   */
  init () {
    this.update(this.state);
    this.attachEvents();

    return this;
  }

  /**
   * @overriding 필요함
   * state 변경시 자동으로 호출되는 update 함수
   */
  update (data) {
    return data;
  }

  /**
   * 이벤트 맵에 따라 이벤트 핸들러 등록
   */
  attachEvents (events) {
    this.forEachEvents(events || this.events, (targetEl, eventName, eventHandler) => {
      assert(targetEl instanceof Element);

      targetEl.addEventListener(eventName, eventHandler);
    });
  }

  /**
   * 이벤트 맵에 따라 이벤트 핸들러 제거
   */
  detachEvents (events) {
    this.forEachEvents(events || this.events, (targetEl, eventName, eventHandler) => {
      assert(targetEl instanceof Element);

      targetEl.removeEventListener(eventName, eventHandler);
    });
  }

  /**
   * 이벤트 맵에 따라 forEach 루프
   */
  forEachEvents(events, callback) {
    Object.keys(events).forEach(elementName => {
      const targetEl = this.elements[elementName];
      const eventMap = this.events[elementName];

      Object.keys(eventMap).forEach(eventName => {
        const eventHandler = eventMap[eventName];

        callback(targetEl, eventName, eventHandler);
      });
    })
  }
}

export default ViewModel
