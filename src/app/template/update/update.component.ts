import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements AfterViewInit {
  @ViewChild('templateRoot') templateRoot: ElementRef<HTMLElement>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {}

  ngAfterViewInit(): void {
    const id = this._activatedRoute.snapshot.params.id;
    console.log(id);

    const templateRootElement = this.templateRoot.nativeElement;
    templateRootElement.attachShadow({ mode: 'open' });
    templateRootElement.shadowRoot.innerHTML = '<div id="template-root"></div>';
    const s = this.renderer2.createElement('script');
    s.async = true;
    s.type = 'module';
    s.src = 'assets/template1.js';
    this.renderer2.appendChild(templateRootElement.shadowRoot, s);
  }
}
