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