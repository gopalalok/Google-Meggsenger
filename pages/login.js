import { Avatar, IconButton, Button } from "@material-ui/core";
import styled from "styled-components";
import { auth,provider } from '../firebase';

function Login(){
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert);
    };
    return(
        <Container>
            <Header>
                <title>Login</title>
                
                
            </Header>

            <LoginContainer>
                
                <Button onClick={signIn} variant="outlined">Sign in With Google</Button>
            </LoginContainer>
            
        </Container>
    );
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background: url(https://i.postimg.cc/3NVhgwT8/Optimized-alexander-shatov-CTZh-Gb-Sx-WLI-unsplash.jpg);
    
    
`;

const Header = styled.div``;



const IconsContainer = styled.div``;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom:auto;
    background-color: white;
    border-radius:5px;
    maegin-left:auto;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;






