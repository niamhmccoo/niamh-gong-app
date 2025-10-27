import type { ReactNode } from 'react';

export interface User {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    photo?: string;
    managerId?: string;
}

export interface HierarchyNode extends User {
    children: HierarchyNode[];
    initials: string;
    isManager: boolean;
    isExpanded: boolean;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export interface PrivateRouteProps {
    children: ReactNode;
}

export interface HierarchyNodeProps {
    node: HierarchyNode;
}
export interface HierarchyTreeProps {
    nodes: HierarchyNode[];
}