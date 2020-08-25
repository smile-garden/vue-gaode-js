export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/marker',
    name: 'marker',
    component: () => import('@/views/Marker'),
  },
];
