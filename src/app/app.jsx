import { Router } from 'preact-router';

// general components
import Menu from './components/menu';
import Toast from './components/toast';

// app settings
import Config from 'json-loader!yaml-loader!../data/config.yml';

// pages
import BattlePage from './pages/battle/battle';
import CharsPage from './pages/chars/chars';
import HomePage from './pages/home/home';
import UsersPage from './pages/users/users';
import MobsPage from './pages/mobs/mobs';
import MvpPage from './pages/mvp/mvp';
import ItemsPage from './pages/items/items';
import MapsPage from './pages/maps/map';

const App = () => (
  <main>
    <Menu links={ Config.menu.top } title={ Config.menu.title } />
    <Router>
      <HomePage path="/" />
      <MapsPage path="/maps" />
      <ItemsPage path="/items" />
      <MvpPage path="/mvp" />
      <MobsPage path="/mobs" />
      <BattlePage path="/battle" />
      <CharsPage path="/chars" />
      <UsersPage path="/users" />
    </Router>
    <Toast name="top" />
  </main>
);

export default App;
