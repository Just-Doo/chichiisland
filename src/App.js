import './App.css';
import Giraffe from './giraffe.jpg';
import { Container, Navbar } from 'react-bootstrap';
import { graphql } from 'graphql';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{
        backgroundImage: `url(${Giraffe})`
      }}>
        <div>
        <div style={{
          backgroundColor : "white", opacity : "1"
        }}>
        <h1 style={{ 
          color : "black", display : "inline", 
          }}>
            여기는 치치아일랜드입니다.
        </h1>
        </div>
        </div>
        <p>
          <Navbar bg="dark" expand="sm" variant="dark">
            <Container>
              <Navbar.Brand href="#home" to='/'> 기린을 찾아 누르세요. </Navbar.Brand>
            </Container>

          </Navbar>
          <a
          className="App-link"
          href="https://cafe.naver.com/chichiisland"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img src={Giraffe} alt="It is a giraffe" width="300" />
          </a>
          <br/>
            <text style={{
              opacity : "0.5"
            }}>기린, 시링히시죠?</text>
        </p>
      </header>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6166746458124854"crossorigin="anonymous"></script>
      
      <ins class="adsbygoogle"
        style={{display:"block", textAlign:"center"}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6166746458124854"
        data-ad-slot="4284968946"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      
    </div>
  );
}

export default App;
