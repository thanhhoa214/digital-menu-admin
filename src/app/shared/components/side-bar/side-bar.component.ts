import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';
interface TreeNode {
  name: string;
  icon: string;
  children?: TreeNode[];
  route?: string;
}

const TREE_DATA: TreeNode[] = [
  // {
  //   name: 'Products',
  //   route: '/product',
  //   icon: 'storefront',
  //   children: [
  //     { name: 'Bets', route: '/product/bet', icon: 'gavel' },
  //     { name: 'Buys', route: '/product/buy', icon: 'shopping_basket' },
  //   ],
  // },
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
    name: 'Accounts',
    route: '/accounts',
    icon: 'account_circle',
  },
  {
    name: 'Products',
    route: '/products',
    icon: 'view_list',
  },
];
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  treeData = TREE_DATA;
  selectedNode: TreeNode = TREE_DATA[0];
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _tokenService: TokenService
  ) {}

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
