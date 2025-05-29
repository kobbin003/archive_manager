import "./header.css";
const Header = () => {
	return (
		<div className="p-3">
			<div className="flex">
				<img src="/icons/logo.svg" alt="" height={80} width={80} />
				<h1 className="text-7xl pl-3">
					webR<span className="text-orange-500">@</span>R
				</h1>
			</div>
			<p className="text-sm text-right">&nbsp;your friendly archive manager</p>
		</div>
	);
};

export default Header;
