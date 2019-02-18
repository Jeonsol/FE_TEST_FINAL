import json from "../../json/sample.js"

const lastItem = json.items[json.items.length - 1];

/**
 * 이미지를 Api 불러온다고 가정합니다.
 */
async function fetchImages (firstImageId, imagesLength) {
  const lastImageId = firstImageId + imagesLength - 1;

  const images = json.items.filter(item => (item.index >= firstImageId && item.index <= lastImageId));
  const totalImageCount = json.imageCount;
  const isPrev = firstImageId > 1;
  const isNext = lastImageId < (lastItem ? lastItem.index : 0);

  return {
    images,
    totalImageCount,
    isPrev,
    isNext
  };
}

export default fetchImages
