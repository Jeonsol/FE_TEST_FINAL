import ImagesModel from "../models/ImagesModel.js"
import SliderViewModel from "../view-models/SliderViewModel.js"
import SelectboxItemView from "../views/SelectboxItemView.js"
import ViewerItemView from "../views/ViewerItemView.js"

/**
 * 메인 콘트롤러
 * 모델 <==> 뷰를 연결시켜주는 역할을 합니다.
 */
class MainController {
  constructor () {
    this.imagesModel = new ImagesModel();
    this.selectBoxView = new SliderViewModel({
      itemListEl: document.getElementById('img_list_rolling'),
      btnPrevEl: document.getElementById('prevBtn_list'),
      btnNextEl: document.getElementById('nextBtn_list'),
      itemClassName: 'link',
      ItemView: SelectboxItemView,
      isLoadedItem: true,
      isClickableItem: true,
      isClickableBtnPrev: true,
      isClickableBtnNext: true
    }).init();
    this.viewerView = new SliderViewModel({
      itemListEl: document.getElementById('img_rolling'),
      btnPrevEl: document.getElementById('prevBtn_big'),
      btnNextEl: document.getElementById('nextBtn_big'),
      ItemView: ViewerItemView,
      isLoadedItem: false,
      isClickableBtnPrev: true,
      isClickableBtnNext: true
    }).init();
  }

  /**
   * 1. 옵저버 패턴을 이용해서 모델과 뷰를 연결합니다.
   * 2. 뷰의 이벤트 핸들러와 모델을 연결합니다.
   * 3. 모델의 데이터를 초기화합니다.
   */
  start () {
    this.connect();
    this.connectEvents();
    this.imagesModel.init();
  }

  /**
   * 모델과 뷰를 연결
   */
  connect () {
    // imagesModel <==> selecBoxView
    this.imagesModel.subscribe(({
      images,
      currentImageId,
      isPrev,
      isNext,
    }) => {
      this.selectBoxView.state = {
        items: images,
        currentIndex: this.imagesModel.indexOfImage(currentImageId),
        isClickableBtnPrev: isPrev,
        isClickableBtnNext: isNext
      };
    });

    // imagesModel <==> viewerView
    this.imagesModel.subscribe(({
      images,
      currentImageId,
      isCurrentPrev,
      isCurrentNext
    }) => {
      const currentImage = images[this.imagesModel.indexOfImage(currentImageId)];

      this.viewerView.state = {
        items: [currentImage],
        isLoadedItem: true,
        isClickableBtnPrev: isCurrentPrev,
        isClickableBtnNext: isCurrentNext
      };
    });
  }

  /**
   * 뷰의 이벤트를 모델과 연결
   */
  connectEvents () {
    // 이미지 선택상자 아이템 클릭
    this.selectBoxView.addEventListener('clickItem', e => {
      const {currentIndex} = e.detail;
      const currentImageId = this.imagesModel.images[currentIndex].id;

      // 이미지묶음모델의 currentImageId 업데이트
      this.imagesModel.updateCurrentImageId(currentImageId);
    });

    // 이미지 선택상자 이전버튼 클릭
    this.selectBoxView.addEventListener('clickBtnPrev', e => {
      // 뷰어상태를 로드중으로 변경
      this.viewerView.state = {
        isLoadedItem: false
      };

      // 이미지묶음모델의 images 업데이트
      this.imagesModel.updatePrevImages();
    });

    // 이미지 선택상자 다음버튼 클릭
    this.selectBoxView.addEventListener('clickBtnNext', e => {
      // 뷰어상태를 로드중으로 변경
      this.viewerView.state = {
        isLoadedItem: false
      };

      // 이미지묶음모델의 images 업데이트
      this.imagesModel.updateNextImages();
    });

    // 뷰어 이전버튼 클릭
    this.viewerView.addEventListener('clickBtnPrev', e => {
      // 뷰어상태를 로드중으로 변경
      this.viewerView.state = {
        isLoadedItem: false
      };

      this.imagesModel.updateCurrentPrevImageId();
    })

    // 뷰어 다음버튼 클릭
    this.viewerView.addEventListener('clickBtnNext', e => {
      // 뷰어상태를 로드중으로 변경
      this.viewerView.state = {
        isLoadedItem: false
      };

      this.imagesModel.updateCurrentNextImageId();
    });
  }
}

export default MainController
