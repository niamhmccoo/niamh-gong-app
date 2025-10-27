import type { HierarchyNode, User } from '../types';

export const getInitials = (firstName: string, lastName: string): string => {
    if (!firstName && !lastName) {
        console.error('First & last name strings required');
        return '?';
    }
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export const buildHerarchyTree = (users: User[]): HierarchyNode[] => {
    const userMap: Record<number, HierarchyNode> = {};
    const managerIds = new Set<number | undefined>();

    // Map users to HierarchyNodes & collect manager IDs
    users.forEach(user => {
        userMap[user.id] = {
            ...user,
            children: [],
            initials: getInitials(user.firstName, user.lastName),
            isManager: false, // TODO: update later
            isExpanded: false, // TODO: update later
        };

        if (user.managerId) {
            managerIds.add(Number(user.managerId));
        }

    });

    // Update managers in userMap 
    managerIds.forEach(managerId => {
        if (managerId && userMap[managerId]) {
            userMap[managerId].isManager = true;
        }
    });

    // Build the hierarchy tree
    const rootNodes: HierarchyNode[] = [];
    
    Object.values(userMap).forEach(node => {
        const isManager = userMap[Number(node.managerId)];
        
        // if user has manager, push node to manager's children array
        if (node.managerId && isManager) {
            isManager.children.push(node);
        } else {
            rootNodes.push(node);
        }
    });

    return rootNodes;
    
}