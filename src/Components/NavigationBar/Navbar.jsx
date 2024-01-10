import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import logo from '../../assets/icon-192x192.png';
import './Navbar.css';
const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const hiddenClass = !isHidden ? 'hidden' : '';

  const navigationLinks = [
    { href: 'https://www.canopus-lab.com/', text: 'Home' },
    { href: 'https://www.canopus-lab.com/about-us', text: 'About' },
    { href: 'https://www.canopus-lab.com/services', text: 'Services' },
    { href: 'https://www.canopus-lab.com/portfolio', text: 'Portfolio' },
    { href: 'https://www.canopus-lab.com/contact', text: 'Contact' },
    // { href: "/home", text: "Home" },
  ];

  return (
    <header>
      <nav className="nav__container">
        <a target={'_blank'} href={'/'} className="logo" rel="noreferrer">
          <img src={logo} alt="logo" height={40} width={70} />
        </a>
        <div
          className="list__main"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          <ul className={'list__container extra ' + hiddenClass}>
            {navigationLinks.map(({ href, text }) => {
              return (
                <li key={text + 1}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {text.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <BiMenu size={30} onClick={() => setIsHidden((prev) => !prev)} />
      </nav>
    </header>
  );
};

export default Navbar;
