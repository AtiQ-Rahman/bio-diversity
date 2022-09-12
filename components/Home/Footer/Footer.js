import Image from 'next/image';
import React from 'react';
import styles from "../../../styles/Footer.module.css";
import { useRouter } from "next/router";

import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
const Footer = () => {
  const router = useRouter()
  return (
    <footer className={styles.footerDistributed}>

      <div className={styles.footerLeft}>

        <h3>Bio <span>Diversity</span></h3>

        <p className={styles.footerLinks}>


    {/* <a href="#"  className={styles.link}>Blog </a> */}
   

          <a  href="#" className={styles.link} type="button"
                              onClick={() => router.push("/form")}> Form </a>

          <a href="#">About</a>

          <a href="#">Contact</a>
        </p>

        <p className={styles.footerCompanyName}>Company Name © H.Tech</p>
      </div>

      <div className={styles.footerCenter}>

        <div>
          <i><RoomIcon></RoomIcon>
          </i>
          <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
        </div>

        <div>
          <i><CallIcon></CallIcon></i>
          <p>+1.555.555.5555</p>
        </div>

        <div>
          <i> <EmailIcon></EmailIcon></i>
          <p><a href="mailto:support@company.com">support@company.com</a></p>
        </div>

      </div>

      <div className={styles.footerRight}>

        <p className={styles.footerCompanyAbout}>
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className={styles.footerIcons}>

          <a href="#"><i><FacebookIcon></FacebookIcon></i></a>
          <a href="#"><i ><GitHubIcon></GitHubIcon></i></a>
          <a href="#"><i ><InstagramIcon></InstagramIcon></i></a>
          {/* <a href="#"><i ></i></a>
    <a href="#"><i></i></a> */}

        </div>

      </div>

    </footer>
  );
};

export default Footer;