import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
function Navbar() {
  return (
    <nav
      className="
      bg-white
      shadow-md
      sticky
      top-0
      z-50
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
      "
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <FaHeartbeat size={14} className="text-white" />
                </div>
                <div >
                  <p className="text-xl font-semibold text-gray-900 leading-tight">FirstLook PCOS</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">Health Monitor</p>
                </div>
        </div>

        <div className="flex gap-6 items-center">

          <Link
            className="hover:text-violet-500 transition"
            to="/"
          >
            Home
          </Link>

          <Link
            className="hover:text-violet-500 transition"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="
            bg-violet-500
            text-white
            px-5
            py-2
            rounded-xl
            hover:bg-violet-600
            transition
          "
            to="/signup"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;