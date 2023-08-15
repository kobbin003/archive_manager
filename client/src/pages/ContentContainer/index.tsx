import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

const ContentContainer = () => {
	const [receivedFiles]: any[] = useOutletContext();
	const params = useParams();
	const currentSegment = params["*"]?.split("/").reverse()[0];
	console.log(params.fileName, currentSegment);
	const column =
		"text-left h-full  pl-2 flex  items-center border-l border-zinc-700";

	return (
		<div className="w-8/12">
			<div className="p-2 text-xs text-white/70 flex items-center">
				<Link
					to={"/view/files"}
					className="text-green-400 text-sm flex items-center"
				>
					{receivedFiles.nameOfFile}
					&nbsp;:&nbsp;
					<img
						src="/public/icons/homeSmiley.svg"
						alt=""
						height={25}
						width={25}
						className="mx-1"
					/>
				</Link>

				{params.fileName && (
					<>
						<Link
							to={`/view/files/${params.fileName}`}
							state={{ directoryName: `${params.fileName}` }}
							className={`${!params["*"] && "text-white"} `}
						>
							&gt;&nbsp;
							<span className="underline">{params.fileName}</span>
						</Link>
						{params["*"] &&
							paramsStringToArray(params["*"]).map((seg, index) => (
								<Link
									to={`/view/files/${params.fileName}/${
										params["*"] && selectRoute(params["*"], seg)
									}`}
									state={{ directoryName: `${seg}` }}
									className=""
									key={seg + index}
								>
									&nbsp;&gt;&nbsp;
									<span
										className={`underline ${
											currentSegment == seg && "text-white"
										}`}
									>
										{seg}
									</span>
								</Link>
							))}
					</>
				)}
			</div>
			<div className="flex-col min-w-[690px]">
				<div className="flex flex-row bg-slate-900 text-white">
					<div className="w-5/12 pl-2 text-left h-full flex items-center">
						Name
					</div>
					<div className={`${column} w-3/12`}>Size</div>
					<div className={`${column} w-3/12`}>Type</div>
					<div className={`${column} w-3/12`}>Modified</div>
					{/* <div className="flex-1 border-l">Download</div> */}
				</div>
				<Outlet context={[receivedFiles]} />
			</div>
		</div>
	);
};
const paramsStringToArray = (str: string) => {
	const route = str;
	const routeSegments = route.split("/");
	return routeSegments;
};
const selectRoute = (str: string, currentSegment: string) => {
	const segmentArray = paramsStringToArray(str);
	const indexOfCurrentSegment = segmentArray.findIndex(
		(seg) => seg == currentSegment
	);
	const slicedArray = segmentArray.slice(0, indexOfCurrentSegment + 1);
	return slicedArray.join("/");
};
export default ContentContainer;
