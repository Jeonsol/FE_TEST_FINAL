import assert from "./assert.js"

/**
 * (targetEl: Element, querySelector: String) => (targetEls: Array)
 * CSS 셀렉터를 이용해서 특정 타겟 내부의 요소를 선택합니다.
 */
export function findAll(targetEl, querySelector) {
  assert(targetEl instanceof Element);

  return Array.from(targetEl.querySelectorAll(':scope ' + querySelector));
}
