import Hero from '../Hero/Hero';
import Wishes from '../Wishes/Wishes';
import Footer from './Footer';

// The morning gradient lives on this wrapper, not on the hero, so it runs on unbroken
// into the wishes below. The morning stops are in px (like the design). The rest of the day
// (afternoon, sunset, then back to the morning blue) is in %, so it stretches over however long the
// wishes make the page: scrolling down is the day moving on.
export default function Main() {
    return (
        <div
            className="bg-cream-100"
            style={{
                backgroundImage: `linear-gradient(180deg,
                    var(--color-morning-200) 0,
                    var(--color-morning-100) 520px,
                    var(--color-peach-100) 900px,
                    var(--color-cream-100) 1200px,
                    var(--color-golden-200) 45%,
                    var(--color-sunset-200) 78%,
                    var(--color-morning-200) 100%)`,
            }}
        >
            <Hero />
            <Wishes />
            <Footer />
        </div>
    );
}
