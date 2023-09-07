import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { ReceivedFileRoot } from "../../Components/uploader/types";
import ErrorComponent from "../../Components/error";
import { paramsStringToArray } from "../../utils/paramsStringToArray";
import { selectRoute } from "../../utils/selectRoute";

const ContentContainer = () => {
	const [receivedFiles]: ReceivedFileRoot[] = useOutletContext();
	const params = useParams();
	const currentSegment = params["*"]?.split("/").reverse()[0];

	return (
		<div className="w-11/12">
			{receivedFiles.error && (
				<ErrorComponent message={receivedFiles.error.message} />
			)}

			{receivedFiles.files && (
				<>
					<div className="p-2 text-xs text-white/70 flex items-center">
						<Link
							to={"/view/files"}
							className="text-green-400 text-sm flex items-center"
						>
							<img
								src="/public/icons/homeSmiley.svg"
								alt=""
								height={25}
								width={25}
								className="mr-1"
							/>
							<p className="underline decoration-white underline-offset-4">
								{receivedFiles.nameOfFile}
							</p>
							&nbsp;
						</Link>

						{params.fileName && (
							<>
								<Link
									to={`/view/files/${params.fileName}`}
									state={{ directoryName: `${params.fileName}` }}
									className={`${!params["*"] && "text-white"} `}
								>
									&gt;&nbsp;
									<span className="underline underline-offset-4">
										{params.fileName}
									</span>
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
												className={`underline underline-offset-4 ${
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
					<div className="flex-col md:min-w-[750px]">
						<Outlet context={[receivedFiles]} />
					</div>
				</>
			)}
		</div>
	);
};

export default ContentContainer;
