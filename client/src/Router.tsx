import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RootFolderContent from "./pages/RootFolderContent";
import NestedFolderContent from "./pages/NestedFolderContent";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "files",
				element: <RootFolderContent />,
				// children: [
				// 	{
				// 		path: "fileID/:id",
				// 		element: <NestedFolderContent />,
				// 	},
				// ],
			},
			{
				path: "files/:id",
				element: <NestedFolderContent />,
			},
		],
	},
	{
		path: "/try",
		element: <p>TRy</p>,
	},
	{
		path: "*",
		element: <div>NO MATCH!!!</div>,
	},
]);
