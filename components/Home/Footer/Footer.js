import Image from "next/legacy/image";
import React from "react";
import styles from "../../../styles/Footer.module.css";
import { useRouter } from "next/router";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import RoomIcon from "@mui/icons-material/Room";
import CallIcon from "@mui/icons-material/Call";
import { Icon } from "@iconify/react";
import EmailIcon from "@mui/icons-material/Email";
const Footer = (props) => {
  const router = useRouter();
  return (
    <footer {...props} className={styles.footerDistributed} style={{
      ...props?.style
    }}>
      <div className={styles.footerLeft}>
        <h3>
          Biodiversity of <span>Bangladesh</span>
        </h3>

        <p className={styles.footerLinks}>
          {/* <a href="#"  className={styles.link}>Blog </a> */}

          <a
            href="#"
            className={styles.link}
            type="button"
            onClick={() => router.push("/form")}
          >
            {" "}
            Form {" "}
          </a>

          <a href="#">About </a>

          <a href="#">Contact</a>
        </p>

        <p className={styles.footerCompanyName}> © 2022 All Rights Reserved by University Of Dhaka | Developed By  <a href="https://h-techsoft.com/"> <b>HTechSoft</b> </a> </p>
      </div>

      <div className={styles.footerCenter}>
        <div>
          <p>
            <i>
              <Icon icon="ep:avatar" />
            </i> Professor Dr. Mohammad Azmal Hossain Bhuiyan</p>
        </div>

        <div>

          <p>
          <i>
            {" "}
            <EmailIcon></EmailIcon>
          </i>
            <a href="mailto:bhuiyan.azmal@du.ac.bd">bhuiyan.azmal@du.ac.bd</a>
          </p>
        </div>
        <div>

          <p>
          <i>
            <Icon icon="ep:avatar" />
          </i>Dr. MoniruzzamanKhondker, Supernumerary Professor</p>
        </div>

        <div>
          <p>
          <i>
            {" "}
            <EmailIcon></EmailIcon>
          </i>
            <a href="mailto:mkhondker@du.ac.bd">mkhondker@du.ac.bd</a>
          </p>
        </div>
      </div>

      <div className={styles.footerRight}>
        <p className={styles.footerCompanyAbout}>
          <span>About the Project</span>
          Under the current project title ‘Mapping and Monitoring of Plant
          Biodiversity Resources of Bangladesh’ recruited team members from the
          Department of Botany, University of Dhaka, Bangladesh
        </p>

        <div className={styles.footerIcons}>
          <a href="#">
            <i>
              <FacebookIcon></FacebookIcon>
            </i>
          </a>
          {/* <a href="#">
            <i>
              <GitHubIcon></GitHubIcon>
            </i>
          </a>
          <a href="#">
            <i>
              <InstagramIcon></InstagramIcon>
            </i>
          </a> */}
          {/* <a href="#"><i ></i></a>
    <a href="#"><i></i></a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
