import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import DisplayDetails from "../components/DisplayDetails";
import Upload from "../components/Upload";
import PlayVideo from "../components/PlayVideo";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <Upload/>
            },
            {
                path : "/display/details",
                element : <DisplayDetails/>
            },
            {
                path : "/play/video/:videoid",
                element: <PlayVideo />,
                    loader: async ({ params }) => {
                    return { videoId: params.videoid };
                    }
            }
        ]
    }
]);

export default router;