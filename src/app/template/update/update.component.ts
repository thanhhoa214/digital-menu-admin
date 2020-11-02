import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DrawerService } from 'src/app/drawer.service';
import { TemplatesService } from 'src/generated';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements AfterViewInit {
  data = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    private _drawerService: DrawerService,
    private _templateService: TemplatesService
  ) {}

  async ngAfterViewInit() {
    this._drawerService.close();
    this._drawerService.setMode('over');

    const id = this._activatedRoute.snapshot.params.id;
    const template = await this._templateService
      .apiTemplatesIdGet(id)
      .toPromise();
    this.data = JSON.stringify(template);

    const s = this.renderer2.createElement('script');
    s.async = true;
    s.type = 'module';
    s.src = template.uilink;
    this.renderer2.appendChild(document.body, s);
  }
}
