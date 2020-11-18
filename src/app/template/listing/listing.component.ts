import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  StoresService,
  TemplateReadDtoPagingResponseDto,
  TemplatesService,
} from 'src/generated';
import { ImageModalComponent } from '../shared/components/image-modal/image-modal.component';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
  templates: TemplateReadDtoPagingResponseDto;
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
  search: FormControl = new FormControl('');
  subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private templateService: TemplatesService,
    private accountService: AccountService,
    private storeService: StoresService
  ) {}
  ngOnInit(): void {
    const account = this.accountService.getAccount();
    if (account.roleId === 1) {
      this.storeService
        .apiStoresIdTemplatesGet(account.storeId)
        .subscribe((templates) => {
          this.templates = templates;
        });
      this.subscriptions.push(
        this.search.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((value) => {
            this.subscriptions.push(
              this.storeService
                .apiStoresIdTemplatesGet(
                  account.storeId,
                  1,
                  0,
                  undefined,
                  value
                )
                .subscribe((templates) => {
                  this.templates = templates;
                })
            );
          })
      );
    }
    if (account.roleId === 3) {
      this.templateService.apiTemplatesGet().subscribe((templates) => {
        this.templates = templates;
      });
      this.subscriptions.push(
        this.search.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((value) => {
            this.subscriptions.push(
              this.templateService
                .apiTemplatesGet(1, 0, undefined, value)
                .subscribe((templates) => {
                  this.templates = templates;
                })
            );
          })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
