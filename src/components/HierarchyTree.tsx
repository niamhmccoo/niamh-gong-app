import type { FC } from 'react'
import HierarchyTreeNode from './HierarchyTreeNode';
import type { HierarchyTreeProps } from '../types';


const HierarchyTree: FC<HierarchyTreeProps> = ({ nodes }) => {
    if (!nodes || nodes.length === 0) {
        return <div>Data unavailable</div>;
    };

    return nodes.map(node => (
        <HierarchyTreeNode key={node.id} node={node} />
    ))
}

export default HierarchyTree;