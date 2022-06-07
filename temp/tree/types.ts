export interface TreeNodeProp {
  title: string;
  key: string;
  childNodes?: TreeNode[] | null;
}

export interface TreeNode {
  title: string;
  key: string;
  parentNode?: TreeNode | null;
  level?: number;
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  childNodes?: TreeNode[] | null;
  isLeaf?: boolean;
}
