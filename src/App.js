
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);


  //Make api call to news api
  async function getNewsData() {
    //Set loading boolean to true so that we know to show loading text
    setLoading(true);

    //Make news api call using axios
    const resp = await axios.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=b738ed2669c54125aae96fba7c1107d5&pageSize=10");
    setNewsData(resp.data.articles);

    //Set loading boolean to false so that we know to show news articles
    setLoading(false);
  }

  useEffect(() => {
    getNewsData();
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        {loading ? "Loading..." : <Container>

          {newsData.map((newsData, index) =>
            <Row className="d-flex justify-content-center">
              <Col xs={12} className="mt-5 w-500" key={index}>
                <a target="_blank" href={newsData.url}>
                  <Card >
                    <Card.Title className="my-3">  {newsData.title}</Card.Title>
                    <Card.Img src={newsData.urlToImage} />
                    <Card.Body>

                      <Card.Text>
                        {newsData.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            </Row>
          )}

        </Container>
        }
      </header>
    </div>
  );
}

export default App;
