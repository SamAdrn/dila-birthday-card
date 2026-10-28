export type Tint = 'peach' | 'butter' | 'sky' | 'mint' | 'lilac' | 'blush';

export type Wish = {
    id: string;
    name: string;
    message: string; // a blank line (\n\n) starts a new paragraph
    photo?: string; // a file in public/friends/, e.g. '/friends/maya.webp'
    tint: Tint;
};

// Sample copy until the real wishes arrive. Adding a friend = adding one object.
// The left column takes the 1st, 3rd, 5th... wish and the right column the rest.
export const WISHES: Wish[] = [
    {
        id: 'rafi',
        name: 'Rafi',
        message:
            'Dila, another year already! Thank you for being the person who says yes to the random plan and somehow makes it the best part of the week.\n\nI hope this year is as kind to you as you are to everyone around you. Boba is on me.',
        tint: 'sky',
    },
    {
        id: 'nadia',
        name: 'Nadia',
        message:
            'Happy birthday to the one who has heard every one of my voice notes, even the very long ones. I am so lucky to know you.\n\nHere is to a year of good news, slow mornings and ridiculous laughs.\n\nLove you loads!',
        tint: 'peach',
    },
    {
        id: 'maya',
        name: 'Maya',
        message:
            'You always show up, with snacks, with advice, or just with a hug. It means more than you know.\n\nWishing you a birthday as warm as you make everyone feel.',
        tint: 'mint',
    },
    {
        id: 'tama',
        name: 'Tama',
        message:
            'I still laugh every time I think about it. Never change.\n\nHappy birthday, Dila! May this year bring you everything you have been quietly hoping for.',
        tint: 'butter',
    },
    {
        id: 'kenzo',
        name: 'Kenzo',
        message:
            'Happy birthday! You are one of the kindest, funniest people I know.\n\nDinner is on the calendar, and no, you cannot get out of it.',
        tint: 'lilac',
    },
    {
        id: 'sari',
        name: 'Sari',
        message:
            'Watching you grow up has been one of my favorite things.\n\nI hope today is full of cake and people who adore you.',
        tint: 'blush',
    },
];
