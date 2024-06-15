import './App.css'
import CentralPortion from './components/central-portion/CentralPortion'
import Logo from './assets/logo/mtm-logo.jpg'; 


export default function App() {

  document.title = "MTM | Itinerary Manager"

  return (
    <>
    <div className="homepage">
        <div className="navbar">
          <div className="logo">
          <img src={Logo} alt="" className='logo-image' />
            <h1>my trip mates </h1>
          </div>
          
          <h3>itinerary manager</h3>
      </div>

      <CentralPortion />

      <footer>github.com/aadityyxa/mtm-frontend-adityaoza</footer>

    </div>

    </>
  )
}
