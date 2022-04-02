import Header from './components/Layout/Header';
import './App.css';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import { UserContext } from './components/Product/UserContext';
import { useState } from 'react';
function App(props) {
  const [sumQty, setSumQty] = useState(0)
  // const user={
  //   name:'Long',
  //   loggedIn:true
  // }
  function getSumQty(data){
    console.log(data)
    setSumQty(data)
    localStorage.setItem('getSumQty',data)
  }
  return (
      <div>
        <UserContext.Provider value={{
          getSumQty:getSumQty
        }}
        >
        <Header/>
            <section>
                  <div className='container'>
                        <div className='row'>
                            <MenuLeft/>
                            {props.children}
                        </div>
                  </div>
            </section>
        <Footer/>
        </UserContext.Provider>
      </div>
  );
}

export default App;
