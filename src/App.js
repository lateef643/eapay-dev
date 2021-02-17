import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Containers/home"));


function App() {
  return (
    <Switch>
      <Suspense fallback>
        <Route exact path="/" component={Home} />
      </Suspense>
    </Switch>
  );
}

export default App;
