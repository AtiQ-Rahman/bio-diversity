// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    // caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'species',
            title: 'Manage Species',
            type: 'collapse',
            url: '/manage-species',
            target: true
        },
        {
            id: 'register3',
            title: 'Requested Species List',
            type: 'collapse',
            url: '/manage-requested-species',
            target: true
        }
    ]
};

export default pages;
