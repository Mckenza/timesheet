import react, { createContext, useRef } from "react";

import DivList from "./main/list/DivList";
import DivContent from "./main/content/DivContent";

export const AppContext = createContext();

function App() {
  const refListUpdate = useRef(null);

  function createItemList(data){
    refListUpdate.current(data);
  }

  function updateList(callback){
    refListUpdate.current = callback;
  }


  return (
    <div className="wrap_content_all">
      <header>
          {
            /*
            кнопка регистрации, время, дата, название сайта....
             */
          }
        </header>
        <main>
          <AppContext.Provider value={{createItemList, updateList}}>
            <DivList/>
            <DivContent/>
          </AppContext.Provider>
        </main>

        <footer>

        </footer>
    </div>
  );
}

export default App;
