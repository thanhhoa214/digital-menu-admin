import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageModalComponent } from '../shared/components/image-modal/image-modal.component';

const sampleSkeleton = {
  id: 'skeleton',
  icon: 'skeleton',
  name: 'skeleton',
  description: 'skeleton',
};

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(title: string, src: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { title, src },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
