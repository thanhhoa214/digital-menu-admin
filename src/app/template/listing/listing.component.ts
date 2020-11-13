import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  TemplateReadDtoPagingResponseDto,
  TemplatesService,
} from 'src/generated';
import { ImageModalComponent } from '../shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  templates$: Observable<TemplateReadDtoPagingResponseDto>;
  sampleData = [
    {
      id: '1',
      src: 'assets/images/img1.jpg',
    },
    {
      id: '2',
      src: 'assets/images/img2.jpg',
    },
    {
      id: '3',
      src: 'assets/images/img3.jpg',
    },
    {
      id: '4',
      src: 'assets/images/img4.jpg',
    },
    {
      id: '5',
      src: 'assets/images/img5.jpg',
    },
    {
      id: '6',
      src: 'assets/images/img6.jpg',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private templateService: TemplatesService
  ) {}
  ngOnInit(): void {
    this.templates$ = this.templateService.apiTemplatesGet();
  }

  openDialog(id: string, title: string, src: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { id, title, src },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
