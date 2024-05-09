import Logo from './Logo';
import SearchBar from './SearchBar';

function Header() {
	return (
		<div className="border-b border-stone-200 bg-white px-4 py-3 uppercase sm:px-6 items-center">
			<header className="flex mx-auto gap-2 items-center justify-between max-w-screen-lg">
				<Logo />
				<SearchBar />
			</header>
		</div>
	);
}
export default Header;
