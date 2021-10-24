import { IconNamesEnum } from 'ngx-bootstrap-icons';

export const USER_NAV = [
    {
        url: '/dashboard',
        name: 'Home',
        icon: IconNamesEnum.HouseFill,
        isHome: true
    },
    {
        url: '/dashboard/workout',
        name: 'WorkOut',
        icon: IconNamesEnum.LightningFill,
        isWorkout: true,
    },
    {
        url: '/dashboard/video',
        name: 'Video',
        icon: IconNamesEnum.CameraVideoFill,
    },
];
