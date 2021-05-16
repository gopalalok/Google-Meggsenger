import { Circle } from "better-react-spinkit";

function Loading(){
    return(
        <center style={{display: "grid",placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                  src="https://i.postimg.cc/254sKsTR/logo-messenger-0.png"
                  style={{marginBottom: 10}}
                  height={200}
                />
                <Circle color="#fc03df" size={40} />
            </div>
        </center>
    );
}

export default Loading;