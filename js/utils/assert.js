/**
 * Assertion 필요한 부분에 사용하기 위해
 */
function assert (assertion, message = 'Assertion Fail') {
  if (!assertion) {
    throw new Error(message);
  }
}

export default assert
