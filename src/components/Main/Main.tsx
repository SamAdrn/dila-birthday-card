import Hero from '../Hero/Hero';

// The morning gradient lives on this wrapper, not on the hero, so it runs on unbroken
// into the wishes below. The stops are in px (like the design), so the page can grow.
export default function Main() {
    return (
        <div
            className="bg-cream-100"
            style={{
                backgroundImage: `linear-gradient(180deg,
                    var(--color-morning-200) 0,
                    var(--color-morning-100) 520px,
                    var(--color-peach-100) 900px,
                    var(--color-cream-100) 1200px)`,
            }}
        >
            <Hero />
        </div>
    );
}
