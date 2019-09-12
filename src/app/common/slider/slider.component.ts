import { Component, AfterContentInit, ContentChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { SliderItemDirective } from '../../directives/slider-item.directive';
import { faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterContentInit {
  faAngleRight =faAngleRight;
  faAngleLeft = faAngleLeft;
  @ContentChildren(SliderItemDirective, { read: ElementRef }) items
    : QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('slides',{static:true}) slidesContainer: ElementRef<HTMLDivElement>;

  private slidesIndex = 0;

  get currentItem(): ElementRef<HTMLDivElement> {
    return this.items.find((item, index) => index === this.slidesIndex);
  }

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  ngAfterViewInit() {
    console.log('slides', this.slidesContainer);
  }

  onClickLeft() {
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth;
    
    if (this.slidesIndex > 0) {
      this.slidesIndex--;
    } 
  }

  onClickRight() {
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex < this.items.length - 1) {
      this.slidesIndex++
    }
  }

}