import ViewGraph from '../view-graphs/view-graphs';
import AddGraph from '../add-graph/AddGraph';
import UserGuide from '../user-guide/user-guide';

const Routes = [
    {
        path: '/AddGraph',
        sidebarName: 'Add Graph',
        component: AddGraph,
    },
    {
        path: '/ViewGraph',
        sidebarName: 'View Graphs',
        component: ViewGraph,
    },
    {
        path: '/UserGuide',
        sidebarName: 'User Guide',
        component: UserGuide,
    },
];

export default Routes;
