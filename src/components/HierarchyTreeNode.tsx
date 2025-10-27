import { useState, type FC } from 'react';
import type { HierarchyNodeProps } from '../types';
import { getInitials } from '../utils/hierarchyUtils';


const HierarchyTreeNode: FC<HierarchyNodeProps> = ({ node }) => {
    const [isExpanded, setIsExpanded] = useState(node.isExpanded);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const initials = getInitials(node.firstName, node.lastName);

    if (!node) {
        return <div>User data unavailable</div>;
    }

    return (
        <div>
            <div>
                <button onClick={node.isManager ? toggleExpand : undefined}>
                    {node.isManager ? '+' : '-'}
                </button>
                {node.photo ? (
                    <img src={node.photo} alt={`${node.firstName} ${node.lastName}`} />
                ) : (
                    <div>{initials}</div>
                )}
                <span>{node.firstName} {node.lastName} {node.email} </span>
            </div>
            <div>
                {isExpanded && node.children.length > 0 && node.children.map((child) => (
                    <HierarchyTreeNode key={child.id} node={child} />
                ))}
            </div>
        </div>
    )
};

export default HierarchyTreeNode;