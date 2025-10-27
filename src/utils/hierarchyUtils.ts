export const getInitials = (firstName: string, lastName: string): string => {
    if (!firstName && !lastName) {
        console.error('First & last name strings required');
        return '?';
    }
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}