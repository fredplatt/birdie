import { useContext, useEffect, useState } from "react";
import { DateContainer } from "./components/DateContainer/DateContainer";
import { globalContext } from "./common/state/store";
import { IndividualsInCare } from "./common/state/IndividualsInCare";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { Visit } from "./common/types";
import "./App.scss";

function App() {
  const { globalState } = useContext(globalContext);

  const [response, setResponse] = useState<Array<Visit>>([]);
  const [dates, setDates] = useState<Array<string>>();
  const [scrolled, setScrolled] = useState(Boolean);
  const [error, setError] = useState(String);

  const groupedVisits = (input: Array<Visit>) => {
    let dateArray: string[] = [];
    input.forEach((x) => dateArray.push(x.payload.timestamp.substring(0, 10)));
    setDates(dateArray.filter((v, i, a) => a.indexOf(v) === i));
    return;
  };

  useEffect(() => {
    setResponse([]);
    const url = `http://localhost:8000/api/visits/${globalState.selectedIndividual}`;
    fetch(url, {
      method: "GET",
    })
      .then(async (res) => {
        const result = await res.json();
        setResponse(result);
        groupedVisits(result);
      })
      .catch(() => setError("Connection could not be made with server"));
  }, [globalState.selectedIndividual]);

  const handleScroll = (e: any) => {
    e.target.scrollTop === 0 ? setScrolled(false) : setScrolled(true);
  };
  const individualString = `individual ${
    IndividualsInCare.indexOf(globalState.selectedIndividual) + 1
  }`;
  const headerClass = "header" + (scrolled ? " scrolled" : "");

  return (
    <div className="page-container">
      <MenuBar />
      <div className="App">
        <header className={headerClass}>
          <h1>family portal</h1>
          <h2>{individualString}</h2>
        </header>
        <div
          className="timeline"
          onScroll={(e) => {
            handleScroll(e);
          }}
        >
          {error ? (
            <h2>{error}</h2>
          ) : response.length === 0 ? (
            <h2>Loading care records for {individualString}</h2>
          ) : (
            dates?.map((x) => {
              let items = response?.filter((y) =>
                y.payload.timestamp.substring(0, 10).includes(x)
              );
              return <DateContainer key={x} date={x} items={items!} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
