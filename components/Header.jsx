import { useEffect, useState } from "react";
import Link from "next/link";
import { DarkLight } from ".";

const categories = [
  { name: "category 1", slug: "slug1" },
  { name: "category 2", slug: "slug2" },
];

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-secondary bg-opacity-25">
      <div
        className={` w-full flex justify-center  pt-6 pb-6 z-50 max-lg:p-7 ${
          isSticky ? "fixed top-0 left-0" : "relative"
        }`}
      >
        <div className="navbar bg-secondary bg-opacity-30 backdrop-blur-md shadow-lg max-w-md w-full rounded-lg flex items-center">
          <div className="flex-1 text-center">
            <a className="btn btn-ghost text-xl">Noyl</a>
          </div>
          <div className="flex-none flex items-center space-x-4">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Categories</summary>
                  <ul className="bg-base-100 bg-opacity-60 backdrop-blur-md rounded-t-none p-2 shadow-lg">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link href={`/category/${category.slug}`}>
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
            <div className="flex-none">
              <DarkLight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
