import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ComingSoon } from ".";

const SocialMediaLinks = () => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <Link
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FaFacebookF className="h-6 w-6" />
      </Link>
      <Link
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 transition-colors"
      >
        <FaTwitter className="h-6 w-6" />
      </Link>
      <Link
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 transition-colors"
      >
        <FaInstagram className="h-6 w-6" />
      </Link>
      <Link
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors"
      >
        <FaLinkedinIn className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default SocialMediaLinks;
