import logo from './logo.svg';
import './App.css';
import ParticleBackground from './components/ Particlebackground'
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import{Grid,Row,Col, Container}  from "react-bootstrap"


function App() {
  return (
    <div className="App">
     
     <Header/>
     <div class="deconstructed">
  DECONSTRUCTED
  <div>tag line here</div>
  <div>tag line here</div>
  <div>tag line here</div>
  <div>tag line here</div>
</div>
        
<h1 className="title">BITDEV</h1>
     <ParticleBackground></ParticleBackground>



     <section className="text-center">
    <Container>
     <Row>
       <Col lg={4}>
            <img alt="" className="m-b-20" width="200" height="100" src="/uploadlogo.png">
              </img>
            <h6 className="block-title p-b-5">Launch Design <i className="pg-arrow_right"></i></h6>
            <h1>    </h1>
            <h1>      </h1>
            

            <p className="m-b-30">awesome project for sharing website to showoff your coding skills and get to know about
              current project trends</p>
              </Col>
          
              <Col lg={4}>
            <img alt="" className="m-b-20" width="200" height="100" src="/teamlogofinal.jpg"></img>
            <h6 className="block-title p-b-5">easy interaction<i className="pg-arrow_right"></i></h6>
            <p className="m-b-30">add your college mates in your friend lists and interact with them easily</p>
            </Col>

            <Col lg={4} >
          
            <img alt="" className="m-b-20" width="200" height="100" src="/codeforces logo.png"></img>
            <h6 className="block-title p-b-5">competitive programming<i className="pg-arrow_right"></i></h6>
            <p className="m-b-30">competitive programming made easier with better interactions and uptodate competition
              updates</p>
              </Col>
              
   </Row>
          
      </Container>
    
  </section>
    </div>
  );
}

export default App;
