import '../globals.css';

import React from 'react';

import Link from 'next/link';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillYoutube,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer">
      <div className="social">
        <Link href="#">
          <AiFillFacebook />
        </Link>
        <Link href="#">
          <AiFillInstagram />
        </Link>
        <Link href="#">
          <AiFillTwitterSquare />
        </Link>
        <Link href="#">
          <AiFillYoutube />
        </Link>
      </div>
      <div className="links">
        <Link href="#">Conditions of Use</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Press Room</Link>
      </div>
      <center className="copy">
        <p>&copy; 2023 MovieBox by mauricedev16</p>
      </center>
    </div>
  );
};

export default Footer;
