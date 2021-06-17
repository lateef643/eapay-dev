import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Product from './Presentations/products/index';
import Product_Details from './Presentations/products/detail';
import Cart from './Presentations/products/Cart'

const Home = lazy(() => import("./Containers/home"));


function App() {
  return (
    <Switch>
      <Suspense fallback>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/detail" component={Product_Details} />
        <Route exact path="/Cart" component={Cart} />
      </Suspense>
    </Switch>
  );
}

export default App;
