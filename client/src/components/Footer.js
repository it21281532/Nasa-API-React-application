import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faSpaceAwesome,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-black-500 p-4 text-white text-center mt-10 ">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="flex items-center space-x-10 mb-10">
          <a
            href="https://www.facebook.com/NASA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="3x" />
          </a>
          <a
            href="https://www.instagram.com/nasa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
          <a
            href="https://www.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faSpaceAwesome} size="2x" />
          </a>
        </div>
        <div>
          <p className="text-sm">
            &copy; 2024 NASA APIs Weather Tracker. All rights reserved.
          </p>
          <p className="text-sm">Designed by Sahan</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
