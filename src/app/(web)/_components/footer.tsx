import type { IconType } from 'react-icons';

import {
  FaGithub as GithubIcon,
  FaGlobeAsia as Globe,
  FaInstagram as InstagramIcon,
  FaLinkedin as LinkedInIcon,
} from 'react-icons/fa';

import { Container } from '@/components/container';
import { ToggleTheme } from '@/components/toggle-theme';
import { Separator } from '@/components/ui/separator';

interface FooterLink {
  title: string;
  href: string;
  icon: IconType;
}

const links: FooterLink[] = [
  {
    title: 'Github',
    href: '#',
    icon: GithubIcon,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/arij_rifqoh',
    icon: InstagramIcon,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arij-rifqoh/',
    icon: LinkedInIcon,
  },
  {
    title: 'Portfolio',
    href: 'https://arijrifqoh.vercel.app/',
    icon: Globe,
  },
];

export function Footer() {
  return (
    <footer className="border-t py-12 ">
      <Container className="pb-0">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="order-last block text-center text-base text-muted-foreground md:order-first">
            &copy; {new Date().getFullYear()} Zoincas, All rights reserved
          </span>

          <div className="order-first flex flex-wrap justify-center gap-6 md:order-last">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground duration-150 hover:text-primary"
              >
                <link.icon className="size-6" />
              </a>
            ))}
            <Separator orientation="vertical" />
            <ToggleTheme />
          </div>
        </div>
      </Container>
    </footer>
  );
}
