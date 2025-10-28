import { useEffect, useState, type FC } from 'react';
import HierarchyTree from '../components/HierarchyTree';
import type { HierarchyNode } from '../types';
import { fetchAllUsers } from '../services/userService';
import { buildHerarchyTree } from '../utils/hierarchyUtils';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HierarchyPage.css';

const HierarchyPage: FC = () => {
    const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadHierarchyData = async () => {
            try {
                setLoading(true);
                const users = await fetchAllUsers();
                const tree = buildHerarchyTree(users);
                setHierarchyData(tree);
            }
            catch (error) {
                setError('Failed to load hierarchy data');
                console.error('Error loading hierarchy data:', error);
            } 
            finally {
                setLoading(false);
            }
        };

        // name & call immediately
        loadHierarchyData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    if (loading) {
        return <div>Loading hierarchy...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <header className='hierarchy-page-header'>
            <h1 className="title">Hierarchy Tree</h1>
            <div className="user-info">{user?.firstName} {user?.lastName}{' '}<a className="logout-link" href="#" onClick={handleLogout}>(logout)</a></div>
            </header>
            <main>
                {hierarchyData.length > 0 ? (
                    <HierarchyTree nodes={hierarchyData} />
                ) : (
                    <div>No hierarchy data available</div>
                )}
            </main>
        </div>
    );
}

export default HierarchyPage;