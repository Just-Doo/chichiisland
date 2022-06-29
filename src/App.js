import './App.css';
import Giraffe from './giraffe.jpg';
import { Container, Navbar } from 'react-bootstrap';
// import { graphql } from 'graphql';
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTweets } from "./graphql/queries";
import { createTweet } from "./graphql/mutations"
import { onCreateTweet } from "./graphql/subscriptions";

Amplify.configure(awsExports);

function App() {
  const [ formData, setFormData ] = useState({
    author : "",
    text : ""
  });

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormData( (prev) => ({ ...prev, [name]: value }) );

  }
  const [ tweets, setTweets ] = useState([]);

  // async function listTweetsForUser(userId) {
  //   const queryParams = {
  //     userId,
  //     sortDirection: 'DESC',
  //   };
  
  //   const operation = graphqlOperation(listTweets, queryParams);
  
  //   return API.graphql(operation);
  // }

  
  const fetchTweets = async () => {
    const request = await API.graphql(graphqlOperation(listTweets));
    setTweets(request.data.listTweets.items);
  };

  const realtimeTweets = () => {
    API.graphql(graphqlOperation(onCreateTweet)).subscribe({
      next: ({ value : { data }}) => 
      setTweets((prev) => [{ ...data.onCreateTweet}, ...prev]),
    });
  }

  useEffect(()=>{
    fetchTweets();
    realtimeTweets();
  }, []);

  const onSubmit = async(event) => {
    event.preventDefault();
    await API.graphql( graphqlOperation(createTweet, { input : formData}) );
    setFormData( (prev) => ({ ...prev, text:""}));
  }
  
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

        <div className='container'>
          <h1>Tweetify!</h1>
          <section>
            <h3>Tweet Something!</h3>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="author"
                placeholder="What is your name?"
                required
                onChange={onChange}
                value={formData.author}
              />
              <textarea
                name="text"
                placeholder='What do you think?'
                required
                onChange={onChange}
                value={formData.text}
              ></textarea>
              <button>Post</button>
            </form>
          </section>
          
          <hr/>

          <section>
            <h3>Timeline</h3>
            <div>
              { tweets.map( (tweet) => (
                <article key={tweet.id}>
                  <hgroup>
                    <h4>{tweet.text}</h4>
                    <h5>{tweet.author}</h5>
                  </hgroup>
                </article>
              ))}
            </div>
          </section>
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
            }}>기린, 사랑하시죠?</text>
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
