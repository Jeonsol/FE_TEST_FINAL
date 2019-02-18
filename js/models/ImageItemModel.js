/**
 * 이미지 아이템의 데이터모델
 */
class ImageItemModel {
  constructor ({
    id,
    thumbURL,
    viewURL,
    originURL,
    imgDesc
  } = {}) {
    this.id = id;
    this.thumbURL = thumbURL;
    this.viewURL = viewURL;
    this.originURL = originURL;
    this.imgDesc = imgDesc;
  }
}

export default ImageItemModel
