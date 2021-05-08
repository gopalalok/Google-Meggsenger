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
                <Logo src="https://i.postimg.cc/kg0mrgkZ/logo.png"/>
                <Button style={{marginBottom:10}} onClick={signIn} variant="outlined">Sign in With Google</Button>
            </LoginContainer>
            
        </Container>
    );
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background: url(https://i.postimg.cc/bwB5DY8T/unnamed.jpg);
    
    
`;

const Header = styled.div`
    
`;



const IconsContainer = styled.div``;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius:5px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;



const Logo = styled.img`
    height: 300px;
    width: 300px;
    margin-bottom: 20px;
`;


