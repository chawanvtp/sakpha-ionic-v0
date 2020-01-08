import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Favicon from 'react-favicon'
import HomePage from './pages/home/home'
import DefaultProductCatalogPage from './pages/products/catalog'
import DefaultProductDetailPage from './pages/products/detail'
import LoginPage from './pages/auth/login'
import RegistrationPage from './pages/auth/registration'
import ForgotPasswordPage from './pages/auth/forgotPassword'
import ResetPasswordPage from './pages/auth/resetPassword'
import CartPage from './pages/cart'
import PaymentPage from 'src/pages/payment'
import PaymentCompletePage from 'src/pages/paymentComplete'
import ProfilePage from 'src/pages/auth/profile'
import HistoryPage from 'src/pages/auth/history'
import CropPage from 'src/pages/auth/profile/crop'
import { getParam } from './middleware/tools';
import { userSourceHandler } from './facades/Auth/UserAccountFacade';

const history = createBrowserHistory();

const App: React.FC = () => {
  document.title = "icon kaset - อนาคตใหม่ แห่งวงการเกษตร"
  var source = getParam("source")
  if (source) { userSourceHandler(source) }
  return (
    <div className="App-Page-top">
      <meta name="google" content="notranslate" />
      <Router history={history}>
        <Favicon url={require("./images/icons/favicon.ico")} />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/catalog" component={DefaultProductCatalogPage} />
          <Route exact={true} path="/product_detail" component={DefaultProductDetailPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/registration" component={RegistrationPage} />
          <Route exact={true} path="/forgotPassword" component={ForgotPasswordPage} />
          <Route exact={true} path="/cart" component={CartPage} />
          <Route exact={true} path="/payment" component={PaymentPage} />
          <Route exact={true} path="/payment_complete" component={PaymentCompletePage} />
          <Route exact={true} path="/profile" component={ProfilePage} />
          <Route path="/resetPassword" component={ResetPasswordPage} />
          <Route exact={true} path="/history" component={HistoryPage} />
          <Route exact={true} path="/profile_crop" component={CropPage} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
