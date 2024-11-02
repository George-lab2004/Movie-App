import logo from "../../assets/icon.webp";

export default function Footer() {
  return (
    <>
      <footer className="bg-blue-950 rounded-lg shadow p-5 pb-10 dark:bg-gray-900 m-4 text-white">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                Movie Pulse
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:underline text-2xl font-semibold  me-4 md:me-6"
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm  sm:text-center dark:text-gray-400">
            © 2024
            <a href="/" className="hover:underline">
              {" "}
              MoviePulse
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
