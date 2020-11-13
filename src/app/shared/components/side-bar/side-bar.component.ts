import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { AccountReadDto } from 'src/generated';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';
interface TreeNode {
  name: string;
  icon: string;
  children?: TreeNode[];
  route?: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  treeData = [];
  selectedNode: TreeNode;
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const account: AccountReadDto = JSON.parse(
      localStorage.getItem('accountInfor') ?? '{}'
    );

    if (account.roleName === 'Admin') {
      this.treeData = [
        {
          name: 'Templates',
          route: '/templates',
          icon: 'web',
        },
        {
          name: 'Screens',
          route: '/screens',
          icon: 'cast',
        },
        {
          name: 'Displays',
          route: '/displays',
          icon: 'screen_share',
        },
        {
          name: 'Products',
          route: '/products',
          icon: 'view_list',
        },
      ];
    } else if (account.roleName === 'Super admin') {
      this.treeData = [
        {
          name: 'Templates',
          route: '/templates',
          icon: 'web',
        },
        {
          name: 'Stores',
          route: '/stores',
          icon: 'storefront',
        },
        {
          name: 'Accounts',
          route: '/accounts',
          icon: 'account_circle',
        },
      ];
    }
    this.selectedNode = this.treeData[0];
  }

  setSelectedNode(node: TreeNode): void {
    this.selectedNode = node;
  }

  hasSelectedChild(node: TreeNode): boolean {
    return node.children?.some((c) => c.route === this.selectedNode.route);
  }
  logout() {
    this._snackBar.openFromComponent(SnackBarSuccessComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'mat-snack-bar-success',
      data: { title: 'Success !', message: 'Logout successfully' },
    });
    this._tokenService.removeAccessToken();

    this._router.navigateByUrl('/auth');
  }
}
