import ImageItemModel from "./ImageItemModel.js"
import Observable from "../utils/Observable.js"
import fetchImages from "../api/fetchImages.js"

/**
 * 이미지 묶음의 데이터모델
 */
class ImagesModel extends Observable {
  constructor({
    images = [],
    imagesLength = 10,
    currentImageId = 1,
    isPrev = false,
    isNext = false,
    isCurrentPrev = false,
    isCurrentNext = false
  } = {}) {
    super();

    // 이미지묶음
    this.images = images;
    // 이미지묶음의 크기
    this.imagesLength = imagesLength;
    // 현재 이미지 아이템의 ID값 (배열의 인덱스 아님)
    this.currentImageId = currentImageId;
    // 이전 이미지묶음 존재여부
    this.isPrev = isPrev;
    // 다음 이미지묶음 존재여부
    this.isNext = isNext;
    // 이전 이미지 존재여부
    this.isCurrentPrev = isCurrentPrev;
    // 다음 이미지 존재여부
    this.isCurrentNext = isCurrentNext;
  }

  /**
   * 데이터 초기화
   */
  async init () {
    await this.updateImages(1, 1);
  }

  /**
   * (불러올 첫번째 아이템 ID, 현재 선택된 아이템 ID) => 설정된 이미지 묶음의 갯수만큼 가져와서 모델에 등록
   */
  async updateImages (firstItemId, currentImageId) {
    let {images, isPrev, isNext} = await fetchImages(firstItemId, this.imagesLength);

    this.images = images.map(image => (new ImageItemModel({
      id: image.index,
      thumbURL: image.thumbURL,
      viewURL: image.viewURL,
      originURL: image.originURL
    })));

    if (this.images.length > 0) {
      this.currentImageId = currentImageId === -1 ? this.images[images.length - 1].id : currentImageId;
      this.isPrev = isPrev;
      this.isNext = isNext;

      this.isCurrentPrev = this.isPrev || this.indexOfImage(this.currentImageId) > 0;
      this.isCurrentNext = this.isNext || this.indexOfImage(this.currentImageId) < this.images.length - 1
    }

    this.notify(this);
  }

  /**
   * 이전 이미지묶음 가져와서 모델에 등록
   */
  async updatePrevImages (currentImageId) {
    if (this.isPrev) {
      const firstItemId = this.images[0].id - this.imagesLength;
      await this.updateImages(firstItemId, currentImageId || firstItemId);
    }
  }

  /**
   * 다음 이미지묶음 가져와서 모델에 등록
   */
  async updateNextImages (currentImageId) {
    if (this.isNext) {
      const firstItemId = this.images[this.images.length - 1].id + 1;
      await this.updateImages(firstItemId, currentImageId || firstItemId);
    }
  }

  /**
   * 현재 이미지 ID 변경해서 모델에 등록
   */
  updateCurrentImageId (imageId) {
    this.currentImageId = imageId;
    this.isCurrentPrev = this.isPrev || this.indexOfImage(this.currentImageId) > 0;
    this.isCurrentNext = this.isNext || this.indexOfImage(this.currentImageId) < this.images.length - 1

    this.notify(this);
  }

  /**
   * 이전 이미지 ID로 변경해서 모델에 등록
   */
  updateCurrentPrevImageId () {
    if (this.isCurrentPrev) {
      const isFirst = this.currentImageId === this.images[0].id;

      if (isFirst) {
        this.updatePrevImages(-1);
      } else {
        const prevIndex = this.indexOfImage(this.currentImageId) - 1;
        this.updateCurrentImageId(this.images[prevIndex].id);
      }
    }
  }

  /**
   * 다음 이미지 ID로 변경해서 모델에 등록
   */
  updateCurrentNextImageId () {
    if (this.isCurrentNext) {
      const isLast = this.currentImageId === this.images[this.images.length - 1].id;

      if (isLast) {
        this.updateNextImages();
      } else {
        const nextIndex = this.indexOfImage(this.currentImageId) + 1;
        this.updateCurrentImageId(this.images[nextIndex].id);
      }
    }
  }

  /**
   * 이미지 ID 를 이용해서 배열의 인덱스를 찾기
   */
  indexOfImage(imageId) {
    const image = this.images.find(image => image.id === imageId);

    if (image) {
      return this.images.indexOf(image);
    } else {
      return -1;
    }
  }
}

export default ImagesModel
