import NavBar from "./nav-bar";

const Header = async () => {
    return (
        <div className="px-4 py-4 shadow-black sm:shadow-border shadow-md fixed w-full bg-white bottom-0 sm:top-0 sm:bottom-auto z-50">
            <NavBar />
        </div>
    );
}

export default Header;