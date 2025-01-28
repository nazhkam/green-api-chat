import './App.css';
import { ContactChat } from './components/contactChat/ContactChat';
import { ContactSidebar } from './components/сontactSidebar/ContactSidebar';
import { Container } from './components/container/Container';

function App() {

  return (
    <div className="App">
      <Container>
        <ContactSidebar/>
         <ContactChat/>
      </Container>
    </div>
  );
}

export default App;
