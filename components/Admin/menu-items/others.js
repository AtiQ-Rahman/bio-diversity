// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const others = {
    id: 'pages',
    title: 'Pages',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'zoning',
            title: 'Zoning',
            type: 'collapse',
            url: '/admin-zoning',
            target: true
        },
        {
            id: 'distribution',
            title: 'Distribution',
            type: 'collapse',
            url: '/distribution',
            target: true
        }
    ]
};

export default others;
