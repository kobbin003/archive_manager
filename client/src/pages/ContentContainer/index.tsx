import React, { useEffect, useState } from "react";
import {
	Outlet,
	useLocation,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom";
import isEmptyObject from "../../utils/isEmptyObject";

const ContentContainer = () => {
	const [disabledButtonLeft, setDisabledButtonLeft] = useState(false);
	const [receivedFiles]: any[] = useOutletContext();
	const navigate = useNavigate();
	const params = useParams();

	const handleClickGoBack = () => {
		navigate(-1);
	};
	const handleClickGoForward = () => {
		navigate(1);
	};
	useEffect(() => {
		setDisabledButtonLeft(isEmptyObject(params));
		console.log(params);
	}, [params]);
	return (
		<>
			<div>
				<button
					onClick={handleClickGoBack}
					disabled={disabledButtonLeft}
					className={`${disabledButtonLeft && "invisible"}`}
				>
					&#60;
				</button>
				<button
					onClick={handleClickGoForward}
					// disabled={disabledButtonLeft}
				>
					&#62;
				</button>
			</div>
			<div className="flex-col">
				<div className="flex flex-row justify-between bg-slate-900 text-white">
					<div>Name</div>
					<div>Size</div>
					<div>Type</div>
					<div>Modified</div>
					<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
				</div>
				<Outlet context={[receivedFiles]} />
			</div>
		</>
	);
};

export default ContentContainer;
