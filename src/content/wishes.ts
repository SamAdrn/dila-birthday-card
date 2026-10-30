export type Tint = 'peach' | 'butter' | 'sky' | 'mint' | 'lilac' | 'blush';

export type Wish = {
    id: string;
    name: string; // who it's from
    title: string; // the short message
    message?: string; // the longer message; a blank line (\n\n) starts a new paragraph
    priority?: number; // lower comes first ; omit to go after all ranked wishes, in list order
    tint: Tint;
};

// Sample copy until the real wishes arrive. Adding a friend = adding one object.
export const WISHES: Wish[] = [
    {
        id: 'rafi',
        name: 'Rafi',
        title: 'Happy mid-quarter life crisis birthday! Welcome to big 25, hope this year brings you so much happiness and everything your heart desires!!! 💕💕💕',
        message:
            "We are grateful for your friendship and all the adventures we get to share! May the year ahead bring you happines, good health, and as much joy as you bring to those around you. Here's to many more adventures together! 🥂",
        tint: 'sky',
    },
    {
        id: 'nadia',
        name: 'Nadia',
        title: 'Happy birthday to the one who has heard every one of my voice notes, even the very long ones. Love you loads!',
        tint: 'peach',
    },
    {
        id: 'maya',
        name: 'Maya',
        title: 'You always show up, with snacks, with advice, or just with a hug.',
        message: 'Wishing you a birthday as warm as you make everyone feel.',
        tint: 'mint',
    },
    {
        id: 'tama',
        name: 'Tama',
        title: 'I still laugh every time I think about it. Never change!',
        tint: 'butter',
    },
    {
        id: 'kenzo',
        name: 'Kenzo',
        title: 'Dinner is on the calendar, and no, you cannot get out of it.',
        tint: 'lilac',
    },
    {
        id: 'sari',
        name: 'Sari',
        title: 'Watching you grow up has been one of my favorite things. 🎂',
        priority: 1, // sample: family
        tint: 'blush',
    },
];
