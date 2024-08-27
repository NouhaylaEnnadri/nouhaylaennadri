import Link from "next/link";

const categories = [
  { name: "category 1", slug: "slug1" },
  { name: "category 2", slug: "slug2" },
];

const Header = () => {
  return (
    <div className="flex justify-center pt-6 ">
      <div className="navbar bg-secondary bg-opacity-60 backdrop-blur-md shadow-lg max-w-md w-full rounded-lg">
        <div className="flex-1 text-center">
          <a className="btn btn-ghost text-xl">Noyl</a>
        </div>
        <div className="flex-none">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
