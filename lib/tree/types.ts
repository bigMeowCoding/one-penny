export interface NodeBase {
  title: string;
  key: string;
  childNodes?: TreeNode[];
  parentNode?: TreeNode | null;
  level?: number;
  expanded?:boolean
}
export type LeafNode = NodeBase & {
  isLeaf: boolean;
};

export type TreeNode =  NodeBase| LeafNode;
