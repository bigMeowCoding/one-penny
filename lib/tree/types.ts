export interface TreeNode {
  title: string;
  key: string;
  childNodes?: TreeNode[];
  parentNode?:TreeNode;
  level?: number;
}
