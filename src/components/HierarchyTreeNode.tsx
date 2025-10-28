import { useState, type FC } from 'react';
import type { HierarchyNodeProps } from '../types';
import { getInitials } from '../utils/hierarchyUtils';
import './HierarchyTreeNode.css'; 

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
        <div className="tree-node">
            <div className="node-row">
                <button className="toggle-button" onClick={node.isManager ? toggleExpand : undefined} disabled={!node.isManager}>
                    {node.isManager ? (isExpanded ? '-' : '+') : '-'}
                </button>
                {node.photo ? (
                    <img className="avatar avatar-image" src={node.photo} alt={`${node.firstName} ${node.lastName}`} />
                ) : (
                    <div className="avatar">{initials}</div>
                )}
                <span className="user-info-text">{node.firstName} {node.lastName} {node.email} </span>
            </div>
            <div className="children-container">
                {isExpanded && node.children.length > 0 && node.children.map((child) => (
                    <HierarchyTreeNode key={child.id} node={child} />
                ))}
            </div>
        </div>
    )
};

export default HierarchyTreeNode;