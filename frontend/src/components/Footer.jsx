function Footer() {
return ( <footer
   className="
   bg-gray-900
   text-white
   py-10
   "
 > <div
     className="
     max-w-6xl
     mx-auto
     px-6
     grid
     md:grid-cols-3
     gap-8
     "
   >


    <div>

      <h2
        className="
        text-2xl
        font-bold
        text-pink-400
        mb-3
        "
      >
        PCOS Detection
      </h2>

      <p className="text-gray-300">
        AI Powered Early Detection System
        for Polycystic Ovary Syndrome.
      </p>

    </div>

    <div>

      <h3 className="font-bold mb-3">
        Contact
      </h3>

      <p>Email: support@pcosdetection.com</p>

      <p>Phone: +91 9876543210</p>

    </div>

    <div>

      <h3 className="font-bold mb-3">
        Follow Us
      </h3>

      <div className="flex gap-4">

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>

      </div>

    </div>

  </div>

  <div
    className="
    text-center
    mt-8
    text-gray-400
    "
  >
    © 2026 PCOS Detection. All Rights Reserved.
  </div>

</footer>


);
}

export default Footer;
