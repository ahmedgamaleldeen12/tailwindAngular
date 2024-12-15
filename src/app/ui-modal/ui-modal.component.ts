import { NgClass, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  standalone: true,
  styleUrls: ['./ui-modal.component.scss'],
  imports:[NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None,
})
export class UiModalComponent implements OnInit {
  @Input() dialogClass!: string;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @Input() isSub = false;
  @Input() specWidth: string | null = null;
  @Input() containerClick = true;
  @Input() isLeftModal = false;
  @Output() onModalClosed = new EventEmitter<boolean>();
  public visible = false;
  public visibleAnimate = false;
  tagData: any;
  constructor() {}
  getExtraStyle() {
    var style = '';
    if (this.specWidth != null) {
      style += `--bs-modal-width: ${this.specWidth}rem !important;`;
    }
    return style;
  }
  ngOnInit() {}

  @Input()
  set closeModal(value: any) {
    if (value) {
      this.hide();
    }
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 100);
    document.querySelector('body')?.classList.add('modal-open');
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 300);
    if (!this.isSub) {
      document.querySelector('body')?.classList.remove('modal-open');
      this.onModalClosed.emit(true);
    }
  }

  public onContainerClicked(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).classList.contains('modal') &&
      this.containerClick === true
    ) {
      this.hide();
    }
  }
}
