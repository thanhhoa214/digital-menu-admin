import { Component } from '@angular/core';
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

  setSelectedNode(node: TreeNode): void {
    this.selectedNode = node;
  }

  hasSelectedChild(node: TreeNode): boolean {
    return node.children?.some((c) => c.route === this.selectedNode.route);
  }
  logout() {}
}
