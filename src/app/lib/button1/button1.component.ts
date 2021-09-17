import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-button1',
  templateUrl: './button1.component.html',
  styleUrls: ['./button1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Button1Component implements OnInit {

  private _large: boolean;
  private _small: boolean;
  private _disabled: boolean;
  private _outline: boolean;

  @Input() content: string;
  @Input() mode = 'text-only';
  @Input() type = 'button';
  @Input() color = 'primary';
  @Input() icon: string;
  @Output() clicked: EventEmitter<any> = new EventEmitter(); // aciona cb a ser executado no click

  constructor() {}

  ngOnInit() {}

  @Input()
  get large() {
       return this._large;
  }
  set large(value: any) {
       this._large = this.coerceBooleanProperty(value);
  }

  @Input()
  get small() {
       return this._small;
  }
  set small(value: any) {
      this._small = this.coerceBooleanProperty(value);
  }

  @Input()
  get disabled() {
      return this._disabled;
  }
  set disabled(value: any) {
       this._disabled = this.coerceBooleanProperty(value);
  }

  @Input()
  get outline() {
       return this._outline;
  }
  set outline(value: any) {
      this._outline = this.coerceBooleanProperty(value);
  }

  onClick() {
       if (this.disabled) {
          return;
      }
       this.clicked.emit();
  }

  private coerceBooleanProperty(value: any) {
       return value != null && `${value}` !== 'false';
  }
}
