import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RootFolderContent from "./pages/RootFolderContent";
import NestedFolderContent from "./pages/NestedFolderContent";
import ContentContainer from "./pages/ContentContainer";
import CompressedFileView from "./Components/compressedFileView";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "view",
				element: <ContentContainer />,
				children: [
					{
						path: "files",
						element: <RootFolderContent />,
					},
					{
						path: "files/:fileName/*",
						element: <NestedFolderContent />,
					},
				],
			},
			{
				path: "compress",
				element: <CompressedFileView />,
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
