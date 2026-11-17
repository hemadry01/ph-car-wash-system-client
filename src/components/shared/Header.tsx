import Link from 'next/link';
import { LayoutGrid, ArrowLeftRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
    {
        href: '/services',
        label: 'Services',
        icon: LayoutGrid,
    },
    {
        href: '/compare',
        label: 'Compare',
        icon: ArrowLeftRight,
    },
    {
        href: '/about',
        label: 'About Us',
        icon: Info,
    },
];

const Header = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Nav links */}
                <nav className="flex items-center gap-6 sm:gap-10">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-2 text-sm font-medium text-gray-800 transition-colors hover:text-amber-500 md:text-base"
                        >
                            <Icon className="size-5 text-gray-700" aria-hidden="true" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Book Now CTA */}
                <Button
                    //asChild
                    className="rounded-md bg-amber-400 px-10 py-5 text-base font-semibold text-white hover:bg-amber-500"
                >
                    <Link href="/booking">Book Now</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
