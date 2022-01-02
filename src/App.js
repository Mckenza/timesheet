import react from "react";

import DivList from "./main/list/DivList";
import DivContent from "./main/content/DivContent";


function App() {
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
          <DivList/>
          <DivContent/>
        </main>

        <footer>

        </footer>
    </div>
  );
}

export default App;
