export interface TreeNode {
  title: string;
  key: string;
  childNodes?: TreeNode[];
  level?: number;
}
