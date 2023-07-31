import { useState } from "react";
import "./App.css";
import { ReceivedFile } from "./Components/uploader/types";
import Uploader from "./Components/uploader";
import { Outlet } from "react-router-dom";

function App() {
	// //* recievedfile from request.
	const [receivedFiles, setReceivedFile] = useState<ReceivedFile>();
	return (
		<>
			<Uploader setReceivedFile={setReceivedFile} />

			{receivedFiles && (
				<div className="flex-col">
					<div className="flex flex-row justify-between bg-slate-900 text-white">
						<div>Name</div>
						<div>Size</div>
						<div>Type</div>
						<div>Modified</div>
					</div>
					<Outlet context={[receivedFiles]} />
				</div>
			)}
		</>
	);
}

export default App;
