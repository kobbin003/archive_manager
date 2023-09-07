import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";
import "./App.css";
import { ReceivedFileRoot } from "./Components/uploader/types";
import Uploader from "./Components/uploader";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

export const RecievedFileContext = createContext<Dispatch<
	SetStateAction<ReceivedFileRoot | "loading" | undefined>
> | null>(null);
function App() {
	//* recievedfile from request.
	const [receivedFiles, setReceivedFile] = useState<
		ReceivedFileRoot | "loading"
	>();

	useEffect(() => {
		const handleOnUnload = () => {
			/** remove any sessionId stored in localStorage */
			const storedSessionId = localStorage.getItem("sessionId");
			if (storedSessionId) {
				const options = { method: "DELETE" };
				/** delete the previous sessionFolder in the server */
				fetch(`http://localhost:3000/resetSession/${storedSessionId}`, options)
					.then((res) => res.json())
					.catch((err) => {
						console.error(err);
					});
				localStorage.removeItem("sessionId");
			}
		};
		window.addEventListener("unload", handleOnUnload);
	}, []);

	return (
		<div className="sm:w-full md:w-10/12 h-screen flex flex-col items-center m-auto bg-white/5 overflow-y-scroll">
			<Header />
			<RecievedFileContext.Provider value={setReceivedFile}>
				<Uploader />
			</RecievedFileContext.Provider>
			{receivedFiles ? (
				receivedFiles == "loading" ? (
					<h1>Loading...</h1>
				) : (
					<Outlet context={[receivedFiles]} />
				)
			) : (
				<></>
			)}
		</div>
	);
}

export default App;
