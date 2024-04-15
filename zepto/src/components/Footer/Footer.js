import React from "react";

import classes from "./Footer.module.css";

import zeptoLogo from "../../assets/Footer/zepto.svg";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import playStore from "../../assets/Footer/play-store.svg";
import appStore from "../../assets/Footer/app-store.svg";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={classes["footer-container"]}>
      <div className={classes['footer-sub-container']}>
        <img
          src={zeptoLogo}
          alt="Zepto Logo"
          className={classes["zepto-logo"]}
        />
        <div className={classes["icons-container"]}>
          <a href="#" className={classes['icon-link']}>
            <FaInstagram className={classes['icon']}/>
          </a>
          <a href="#" className={classes['icon-link']}>
            <FaTwitter className={classes['icon']}/>
          </a>
          <a href="#" className={classes['icon-link']}>
            <FaFacebookF className={classes['icon']} />
          </a>
          <a href="#" className={classes['icon-link']}>
            <FaLinkedinIn className={classes['icon']} />
          </a>
        </div>
        <p className={classes['copy-right']}>© KiranaKart Technologies Private Limited</p>
      </div>
      <div className={`${classes['footer-sub-container']} ${classes['links']}`}>
        <Link to="/" className={classes['link']}>Home</Link>
        <a href="#" className={classes['link']}>Delivery Areas</a>
        <a href="#" className={classes['link']}>Careers</a>
        <a href="#" className={classes['link']}>Customer Support</a>
        <a href="#" className={classes['link']}>Press</a>
      </div>
      <div className={`${classes['footer-sub-container']} ${classes['links']}`}>
        <a href="#" className={classes['link']}>Privacy Policy</a>
        <a href="#" className={classes['link']}>Terms of Use</a>
        <a href="#" className={classes['link']}>Responsible Disclosure Policy</a>
        <a href="#" className={classes['link']}>Mojo - a Zepto Blog</a>
      </div>
      <div className={classes['footer-sub-container']}>
        <p>Download App</p>
        <a href="#" className={classes['get-app']}>
          <img src={playStore} alt="play-store" />
          <span className={classes['get-app-text']}>Get it on play store</span>
        </a>
        <a href="#" className={classes['get-app']}>
          <img src={appStore} alt="app-store" />
          <span className={classes['get-app-text']}>Get it on app store</span>
        </a>
      </div>
    </div>
  );
}
