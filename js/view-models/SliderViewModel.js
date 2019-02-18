import ViewModel from "./ViewModel.js"
import {findAll} from "../utils/dom.js"

/**
 * 슬라이더(뷰)에 대한 추상화
 */
class SliderViewModel extends ViewModel {
  constructor ({
    itemListEl = null,
    btnPrevEl = null,
    btnNextEl = null,
    ItemView = null,
    itemClassName = '',
    items = [],
    currentIndex = 0,
    isLoadedItem = false,
    isClickableItem = false,
    isClickableBtnPrev = false,
    isClickableBtnNext = false
  }) {
    super();
    /** 
     * 요소들: 슬라이더 뷰에 사용되는 요소들
     * - itemList: 아이템리스트 요소
     * - btnPrev: 이전버튼 요소
     * - btnNext: 다음버튼 요소
     */
    this.elements = {
      itemList: itemListEl,
      btnPrev: btnPrevEl,
      btnNext: btnNextEl
    };
    /**
     * 이벤트: 슬라이더 뷰에 실제로 바인딩되는 이벤트들
     * - itemList:click: 아이템리스트 클릭 (Event Delegation)
     * - btnPrev:click: 이전버튼 클릭
     * - btnNext:click: 다음버튼 클릭
     */
    this.events = {
      itemList: {
        click: this.handleClickItem.bind(this)
      },
      btnPrev: {
        click: this.handleClickBtnPrev.bind(this)
      },
      btnNext: {
        click: this.handleClickBtnNext.bind(this)
      }
    };
    /**
     * 데이터: 슬라이더 뷰에서 가지는 상태값들
     * - items: 아이템 배열
     * - currentIndex: 현재 아이템의 배열 인덱스
     * - isLoadedItem: 아이템이 로드되는 아이템일 경우 로드여부
     * - isClickableItem: 아이템이 클릭가능여부
     * - isClickableBtnPrev: 이전버튼 클릭가능여부
     * - isClickableBtnNext: 다음버튼 클릭가능여부
     */
    this.state = {
      items,
      currentIndex,
      isLoadedItem,
      isClickableItem,
      isClickableBtnPrev,
      isClickableBtnNext
    };

    // 동적으로 생성되는 아이템요소의 템플릿(DomModel)
    this.ItemView = ItemView;
    // 이벤트 델리게이션 활용을 위한 아이템의 클래스명
    this.itemClassName = itemClassName;
  }

  /**
   * @override
   * update(state): view 의 state 를 변경해줄시 자동으로 호출되는 함수
   */
  update ({items = [], currentIndex, isLoadedItem, isClickableBtnPrev, isClickableBtnNext}) {
    const ItemView = this.ItemView;

    // item 의 로드 상태에 따라 data-loaded="true"로 설정
    this.elements.itemList.dataset.loaded = isLoadedItem ? 'true' : 'false';

    // itemList에 이벤트가 바인딩되어 있어서 removeEventListener 불필요
    this.elements.itemList.innerHTML = '';
    
    // 현재 선택된 아이템에 data-selected="true"로 설정
    items.forEach((item, index) => {
      let itemView = new ItemView(item);
      let itemEl = itemView.createElement();

      itemEl.dataset.selected = index === currentIndex ? 'true' : 'false'
      this.elements.itemList.appendChild(itemEl);
    });

    // 클릭가능한 버튼일 경우 data-disabled="false"로 설정
    if (this.elements.btnPrev) this.elements.btnPrev.dataset.disabled = isClickableBtnPrev ? 'false' : 'true';
    if (this.elements.btnNext) this.elements.btnNext.dataset.disabled = isClickableBtnNext ? 'false' : 'true';
  }

  /**
   * eventName: clickItems
   * 아이템 클릭 이벤트핸들러 정의 (이벤트 델리게이션으로 리스트에 바인드)
   */
  handleClickItem (e) {
    // 클릭 가능할 경우에만 이벤트 발생
    if (this.state.isClickableItem) {
      // 클릭된 아이템 타겟요소와 인덱스 찾기 (Delegation)
      let itemEls = findAll(this.elements.itemList, `.${this.itemClassName}`);
      let currentIndex = -1;
      let targetItemEl = itemEls.find((itemEl, index) => {
        if (itemEl.contains(e.target)) {
          currentIndex = index;
          return true;
        }

        return false;
      });
      
      if (targetItemEl) {
        if (targetItemEl.tagName.toLowerCase() === 'a') {
          e.preventDefault();
        }

        // clickItem 이라는 이벤트 발생
        // 클릭된 아이템 타겟요소와, 현재 클릭된 아이템의 인덱스 전송
        this.dispatchEvent(new CustomEvent('clickItem', {
          detail: {
            target: targetItemEl,
            currentIndex
          }
        }));
      }
    }
  }

  /**
   * eventName: clickBtnPrev
   * 이전버튼 클릭 이벤트핸들러 정의
   */
  handleClickBtnPrev (e) {
    e.preventDefault();
    // 클릭 가능할 경우에만 이벤트 발생
    if (this.state.isClickableBtnPrev) {
      this.dispatchEvent(new CustomEvent('clickBtnPrev', {
        detail: {
          currentIndex: this.state.currentIndex
        }
      }));
    }
  }

  /**
   * eventName: clickBtnNext
   * 다음버튼 클릭 이벤트 핸들러 정의
   */
  handleClickBtnNext (e) {
    e.preventDefault();
    // 클릭 가능할 경우에만 이벤트 발생
    if (this.state.isClickableBtnNext) {
      this.dispatchEvent(new CustomEvent('clickBtnNext', {
        detail: {
          currentIndex: this.state.currentIndex
        }
      }));
    }
  }
}

export default SliderViewModel
