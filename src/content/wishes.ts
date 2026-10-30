export const TINTS = ['peach', 'butter', 'sky', 'mint', 'lilac', 'blush'] as const;
export type Tint = (typeof TINTS)[number];

export type Wish = {
    id: string;
    name: string; // who it's from
    title: string; // the short message
    message?: string; // the longer message; a blank line (\n\n) starts a new paragraph
    priority?: number; // lower comes first; omit to go after all ranked wishes, in list order
    tint?: Tint; // override: leave it out and a tint is picked for you
};

// Sample copy until the real wishes arrive. Adding a friend = adding one object.
export const WISHES: Wish[] = [
    {
        id: 'buita',
        name: 'Buita',
        title: 'Dirgahayu Fadhilah!',
        message: `Happy Quarter-Century to my favorite pain in the neck!
            
            You've been on this earth for 25 years, and I have loved you for every single one of them — even during those teenage years when we both weren't sure we’d make it this far.
             
            You might be a real adult now, but you’ll always be the little angel who threw epic supermarket tantrums to me.  
            
            Eat some cake, drink some wine, and please remember to finally start paying your own streaming subscriptions!`,
        priority: 1,
        tint: 'sky',
    },
    {
        id: 'sam',
        name: 'Sam',
        title: 'Happy Birthday Sayangg! ❤️',
        message:
            'I hope you get to enjoy your birthdayy, reminding yourself of the signifcant presence you have on all our lives and how we all love you so very much. To many more birthdays to come! 🥂',
        priority: 2,
        tint: 'butter',
    },
    {
        id: 'tama',
        name: 'Tama',
        title: 'I still laugh every time I think about it. Never change!',
    },
    {
        id: 'kenzo',
        name: 'Kenzo',
        title: 'Dinner is on the calendar, and no, you cannot get out of it.',
    },
    {
        id: 'sari',
        name: 'Sari',
        title: 'Watching you grow up has been one of my favorite things. 🎂',
    },
];
