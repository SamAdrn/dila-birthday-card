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
        id: 'papie',
        name: 'Papie Tovi',
        title: 'Dirgahayu Dhil..Dhil..',
        message: `Selamat birthday ponakanku... sehat selalu, bahagia selalu, sukses selalu.
            Dimudahkan dan dilancarkan segala urusannya, tercapai apa yang dicita-citakan.
            Berkah Tuhan menyertai selalu...
            😘😘😘`,
        priority: 2,
        tint: 'lilac',
    },
    {
        id: 'sam',
        name: 'Sam',
        title: 'Happy Birthday Sayangg! ❤️',
        message:
            'I hope you get to enjoy your birthdayy, reminding yourself of the signifcant presence you have on all our lives and how we all love you so very much. To many more birthdays to come! 🥂',
        priority: 3,
        tint: 'butter',
    },
    {
        id: 'salma',
        name: 'mochichim',
        title: "HAPPY BIRTHDAY FADEHILA here's to more chicken dinners",
        message: 'semoga sehat bahagia selalu kaya raya selamat dunia akhirat aamiin',
    },
    {
        id: 'yuda',
        name: 'YUDS',
        title: 'HBD',
        message: `HBDDDDD

        happy birthday fadhh!!! wishing you nothing but good things in life, more happiness, more opportunities, less worries. semoga semua hal yg km usahakan bisa tercapaii, selalu diberi kesehatan, kebahagiaan, dan dikelilingi oleh orang2 baik. all the best for youu, happy 25th fadd`,
    },
    {
        id: 'randi',
        name: 'randi',
        title: '25 taun nii 🎉🥳',
        message: 'semoga bahagia terus, hidup yang lama biar bisa berguna buat kita kita fad',
    },
    {
        id: 'rian',
        name: 'rian',
        title: 'bebski happy 25th birthday <3',
        message: `happy 25th birthday, dhil! wishing you an abundance of success, happiness, and good health. even though we’ve only known each other for a while, i can see how much you’ve grown as a person. you’re doing so much better than when we first met (not that there was anything wrong back then), but i guess that’s what being human is all about. we’re always growing and striving to become better versions of ourselves. look at you joining running events left and right, kerennnnnn!

                semoga di umur yang baru ini lo terus berkembang dan selalu bahagia, especially with the people around you, because they all genuinely love and care about you. also, 25 is usually the quarter life crisis age, but i hope you get through it smoothly and that everything you do and every decision you make is always dimudahkan.

                semangat terus, bebski! gue menyusul 25 tahun depan. rawrrrr`,
    },
    {
        id: 'agasha',
        name: 'Agasha',
        title: 'Happy 25th birthday Dil! 🥳🥳',
        message: 'Semoga terus semangat lari supaya taun depan bisa race bareng2 lagi 🏃‍♀️💨',
    },
    {
        id: 'chacha',
        name: 'Chachu cantik sedunia',
        title: 'HAPPY BIRTHDAY JELEK',
        message:
            'HAPPY BIRTHDAY MY JELEK I LOVE U FOREVER MAKASIH YA UDH JD TEMEN GUE SINCE FOREVERRRR ❤️❤️❤️❤️ makasih jg udah bela2in ke INDO FOR ME 🫶🫶 kaget gak gw bs ngucapin ini pdhl gue lg sm lo IXIXIXIXIXZI LOVE U 4EVER MY LOVE FADEHHHHH MY MURTAD FRIEND 🫶💗💗💗',
    },
    {
        id: 'raska',
        name: 'Raska',
        title: 'Habede',
        message: 'Habede',
    },
    {
        id: 'biru',
        name: 'Warna Biru',
        title: 'Happy 25th Fadhilaa gas pickleball',
        message: 'Semoga di beri kesehatan selalu, kelancaraan dan ajarin lari dong hehehe',
    },
    {
        id: 'prajna',
        name: 'PE',
        title: 'welcome to your quarter-life era fadd 🙌🏻',
        message:
            'HBD YAHH FAD, may life always be kind to you super grateful for this friendship, even across 10k miles ✈️',
    },
    {
        id: 'steffanus',
        name: 'Steffanus',
        title: 'Pibesdey Dhil!',
        message: 'Wish you all the best! Semoga dikabulkan semua yang di semogakan!',
    },
    {
        id: 'denisa',
        name: 'Denisa',
        title: 'HAPPY BIRTHDAY DILA SAYANG ❤️YAY 25!!!!',
        message:
            'Happy birthday Dila ❤️ you’re so loved by everyone around you, I hope you get to spend ur birthday with ur loved ones di Indo. Can’t wait to celebrate with you when you get back!!',
    },
    {
        id: 'natasha',
        name: 'Natasha',
        title: 'Happy mid-quarter life crisis birthday!',
        message:
            'Welcome to big 25, hope this year brings you so much happiness and everything your heart desires!!! 💕💕💕',
    },
    {
        id: 'christabel',
        name: 'Christabel',
        title: 'Happyyyy Birthday DILAALALALA!!!',
        message: 'Wishing you a wonderful birthday 🕺🕺',
    },
    {
        id: 'tempo',
        name: "The Tempo's (Mos, Yol, Biru and Jingga)",
        title: 'Cheers to 25 – to the Fabulous Fadhila!',
        message: `Cheers to 25! 
25 years young, 25 years awesome, and still counting!
May this year bring you 25x more happiness, adventures, and reasons to smile!.Muuuach!

With love from the Tempo Family, grateful to be part of your beautiful and joyful journey.`,
    },
    {
        id: 'alvito',
        name: 'Alvito pake F',
        title: 'HABEDE FADH',
        message: `Selamat ulang tahun fadhila, semoga makin jago larinya biar bisa jadi full marathoner, semoga langgeng sama sam dan CEPET NIKAH biar gue ada alesan ke US hehehehehe. sorry kalo kita gabisa ketemu di jakarta sekarang, semoga next gue n RSL yg bisa nyamperin lu sama sam sama buita ke US WAKAKAKAKA. 

                semoga sehat selalu juga fadh, semoga bisa cepet dapet kuliah S2 di US atau bisa kerja full time disana yoo dan yang terpenting HARUS BANYAK BANYAK HAPPY YA FADH. intinya wish you all the goodnesss Amiin GBU. SALAM BUAT SAM N BUITA `,
    },
    {
        id: 'tante-vivi',
        name: 'Princess Consuela Banana Hammock',
        title: 'SELAMAT ULANG TAHUN, DEAR FADHILA',
        message: 'Semoga sehat selalu, semua rencana lancar dijalani, tambah rejeki.',
    },
    {
        id: 'putut',
        name: 'Putut',
        title: 'Happy birthda fade!!',
        message:
            'Wishing you the happiest birthday! May this year bring you lots of happiness, good health, and everything you wishes for ya fadhhh. Semoga apa pun yang diinginkan tercapai semua. Miss you & love you lotsss🫶',
    },
    {
        id: 'ratu',
        name: 'Ratu',
        title: 'HAPIBAAAAAA FADHHH<3',
        message:
            'Happy 25th birthday, fadh!! 🎉 We’ve officially entered the quarter-life crisis ^__^ May all the happiness in this world find its way to you. I actually miss you so much, but I don’t know how to say it HAHA malu. Ya pokoknya, aku selalu support apa pun yang km lakukan and I know you’ll do great at anything anyway. Luvvvvvv<3',
    },
    {
        id: 'rafy',
        name: 'Rafy',
        title: 'Selamat Hbd Mba Dila',
        message: 'Semoga yg disemogakan terkabulkan. Wyatb!',
    },
    {
        id: 'james',
        name: 'JAMES UNCH',
        title: 'Happyyyy 25th!',
        message:
            'FADHILA happy bersdey my girlllllll ways love you to the moon and back!!!!!!!! God bless you and alwayssss be happyyyy!!! Xoxoo LOVEEEEE',
    },
    {
        id: 'gendis',
        name: 'gendisus',
        title: 'enjoy 25 fadh!',
        message:
            'HAPPY BIRTHDAY FADHHH!! thank you ya sudah menjadi my best friend!! semoga di tahun ini hanya kebaikan yang datang secara terus menerus ke lo dan ke orang2 terdekat loooo... semoga selalu diberikan kebahagiaan juga di setiap harinya dan selalu melewati hati-hari dengan tertawa!! very grateful to have you in my life fadh, enjoy 25 cheerrrssss',
    },
    {
        id: 'radut',
        name: 'radut',
        title: 'happy 25th fadh! so u gotta run 25k ok',
        message:
            'happiest birthday to ex bintaro peeps. wishing you endless blessing and tons of luck ahead. keep lacing up ya 🏃‍♀️🏃‍♀️',
    },
    {
        id: 'bagus',
        name: 'bagus',
        title: 'hbd y🫵',
        message:
            'selamat ulang tahun temen gua yang marah kalo ulang tahunnya dilupain tapi gainget ulang tahun gua. semoga diberikan terus kebahagiaan siapapun presidennya. ',
    },
    {
        id: 'ray-and-sheila',
        name: 'Ray and Sheila',
        title: 'Happiest 25th birthday, Dila!',
        message:
            "We are grateful for your friendship and all the adventures we get to share! May the year ahead bring you happines, good health, and as much joy as you bring to those around you. Here's to many more adventures together! 🥂",
    },
    {
        id: 'denisa-carla',
        name: 'Denisa Carla',
        title: 'Happy 25th Birthday!!',
        message:
            'Selamat ulang tahun Fadhila! Miss you so muchh and I hope you have an amazing birthday in Indo this year. Can’t wait to see you when I’m back in Arlington😊 enjoy your trip!!',
    },
    {
        id: 'faris',
        name: 'Faris',
        title: 'Happy birthday, Dila!',
        message:
            'Welcome to the new age. Semoga diberi umur panjang, sukses dunia akhirat. Makin seru lagi. Aamiin yra',
    },
    {
        id: 'fajri',
        name: 'Fudge',
        title: 'Happy belated birthdayy Fadhilaaa!!',
        message:
            'Hope you stay healthy, happy, and blessed alwaysss 🫶🏻💗 hope everything you’re working towards works out for you and life keeps treating you good. Keep being your cool ass self and never changee!! 🥳�',
    },
    {
        id: 'sigap',
        name: 'Sigap make some noise',
        title: 'Hepi birthday!',
        message:
            'NEW YORK MAKE SOME NOISE HABEDE all the best wishes for youu Fad! Bahagia selalu, sukses sakses, and may God always bless you throughout your life aminnn',
    },
    {
        id: 'satrio',
        name: 'Bang Disco',
        title: 'Happy Birthday Dila semoga selalu di dalam lindungan Allah SWT. Panjang umur pendek problem!!!!!',
    },
    {
        id: 'sumi',
        name: 'Sumiiii',
        title: 'HBD SAYANGKUUUU <3',
        message: 'Semogaa diberi kelancaran, kesehatan, dan rezeki selaluuu yaa! ❤️',
    },
    {
        id: 'louis-luce',
        name: 'LouLu',
        title: 'happy Birthday Dila! Panjang umur sehat selalu, all your wish come true in the upcoming years. Cheers!',
        message: 'Miso also says happy birthday kakak 🐱 🐱 🐱',
    },
    {
        id: 'nike-michael-mira',
        name: 'Nike, Michael, Mira',
        title: 'Happiest birthday, Kaka Dhila!',
        message:
            'We love you and so grateful to have you in our life. Mudah2an panjang umur, sehat selalu dan jadi rahmatan lil alamin. ',
    },
    {
        id: 'laskar',
        name: 'Laskar',
        title: 'Happy bday dila!',
        message: 'Congrats on making it to 25! Wishing you all the best in life :)',
    },
    {
        id: 'alhubab',
        name: 'Alhubab',
        title: 'Happy quarter of life Dila!',
        message: 'Semoga panjang semua nya',
    },
    {
        id: 'iyung',
        name: 'Yungkeee',
        title: 'Happy Birthday Fadila!!',
        message: 'Happy Birthday Fadila, I hope you had a great time in Indo! Wish you all the best!!',
    },
    {
        id: 'jo',
        name: 'Jo :)',
        title: 'hepi bdei',
        message:
            'Dila!! Happy 25th birthday!! Hope you have so much fun celebrating and an awesome year ahead, and that the quarter life crisis doesn’t hit too hard hahhaha… all the best :)',
    },
    {
        id: 'irham',
        name: 'Irham',
        title: 'happy birthday broo',
        message: 'wish u all the bestt, semoga cepet dapet green card 🍻',
    },
    {
        id: 'bagas',
        name: 'bagas baso',
        title: 'FAD HBD 🎉🥳🎂',
        message: 'semoga semakin baddie',
    },
    {
        id: 'angie',
        name: 'angie',
        title: 'happy birthday fadhilaa!',
        message:
            'god bless you and wish you all the best 🥺 kangen sekalii dan sudah lama tak berjumpa. sukses terus yaa dimana pun kamu berada, hoping we could meet again n have fun together 🫶🏻',
    },
    {
        id: 'cocolmanja',
        name: 'cocolmanja',
        title: 'hbddd fadhilaa',
        message:
            'Habedeee fadd semogaaa semua yang diimpikann dan dicita citakaan semuanyaa terwujud yaa faddd, happy teruss fadd ',
    },
    {
        id: 'william',
        name: 'William Nguyen',
        title: 'Happiest to your quarter century!',
        message: 'May your next year be full of pain free miles on strava!',
    },
    {
        id: 'ghina',
        name: 'Ghina Arda',
        title: 'Happy Birthday, Fadhila 🩶',
        message:
            'FADDDDD happy birthday 🩶 alhamdulilah udah lewatin banyak ulangtahun lo selama ini mungkin udah 5 kali???? HAHA skrg udah 25 tahun semoga lo semakin baik di semua nya, dilancarin semua yg lo jalanin, makin bahagia teruuuus, tercapai semua cita2 & harapannya, semoga selalu jd pribadi yang baik & membanggakaan semua nya. semoga yg lo mau tercapai semuanya, sehat2 teruuuss jgn sakit2 ya semoga semua sakit nya diangkat sama Allahhhh semoga hal baik selalu menyertai lo & hidup lo selama nya!!! love yooouuuuu',
    },
    {
        id: 'aisyah',
        name: 'Aisyah',
        title: 'HAPPIEST BIRTHDAY my urban girl ',
        message:
            'happyy birthday my MLG-DC girl, i hope you enjoy twenty-five!! semoga umurnya berkah selalu, dimudahkan selalu segara urusannya, ceria selalu, sayang kita terus sampe kapapun yaa fadh <3 i hope everything you wish for tercapai dan dikasih kesempatan sama tuhan untuk selalu berteman sama lo dan jadi salah satu orang yang selalu ada buat lo 🫰🏻🫰🏻🫰🏻',
    },
    {
        id: 'asa',
        name: 'Asa',
        title: 'Happy makin tua fad!!',
        message: 'Semoga segalanya dilancarkan dan dimudahkan diberikan kesehatan selalu',
    },
    {
        id: 'vinno',
        name: 'Vinno Tan',
        title: 'Happy Birthday Dila!!!',
        message: 'Jgn gila gila yaa! Tambahin rasa cinta ke orang tua, sam, dan teman” biar bisa makin deket!',
    },
    {
        id: 'gande',
        name: 'Gande',
        title: 'HBD FADH!!!',
        message:
            'Semoga di usia yang sekarang semakin jaya di darat, laut dan udara serta di lapangan pickleball dan track lari. Sehat selalu, dilancarkan rezekinya dan semakin sukses 🙏🏻🙏🏻🙏🏻',
    },
    {
        id: 'reno',
        name: 'Reno',
        title: 'HBD DHILS',
        message:
            'Selamat ulang tahun Fadd, semoga selalu diberikan jalan yang di ridhoi Tuhan, diberikan kesehatan yang tak ada batas, dan kebahagiaan yang tak kenal waktu.',
    },
    {
        id: 'fawwaz',
        name: 'Fawwaz',
        title: 'Happy Birthday Dila!!',
        message: 'Happy Birthday Dila! Hope all your wishes come true this year!',
    },
    {
        id: 'wanderlust',
        name: 'The wanderlust',
        title: 'HAPPY BIRTHDAY JAGUNG BAKAR ALIAS FADHH!!',
        message:
            'Semoga in this part of your life bisa achieve apa yang lo kejar yaaa, bisa kasih yang terbaik buat lo dan bu ita! Sehat selalu yee',
    },
    {
        id: 'thomas',
        name: 'thomas',
        title: 'hepibedey fadhilahh filzahh',
        message: 'semoga panjang umur, sehat selalu, sukses dan segala doa terkabulkan yow 🤘🥳',
    },
    {
        id: 'rafael',
        name: 'Rafael Rusydi',
        title: 'Happy birthday Fadila Wish You All The Best i hope you have a nice Birthday 🎂 🎉🎉🎂🎉',
        message:
            'Mudah2an you get everything you wanted in life, always healthy and happy hope everything works out well',
    },
    {
        id: 'nathan',
        name: 'Nathan Sidik',
        title: 'Happy 25th Dila!! Wish you all the best',
        message: 'Langgeng sama samy',
    },
];
