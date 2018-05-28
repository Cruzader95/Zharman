import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';
import { Toaster } from '../../components/toast';

// Subcomponents
import MapsList from './map-list';
import MapsEditorModal from './map-editor-modal';

// Stores
import MapsStore from '../../../stores/map.js';

const store = MapsStore();

export default class MapsPage extends Component {
  onSave(e) {
    e.preventDefault();

    if (store.new.id) {
      store.update(this.onSaveDone.bind(this));
    } else {
      store.save(this.onSaveDone.bind(this));
    }
  }

  onSaveDone(response) {
    if (response.status === 200 && response.data) {
      Toaster.success('top', 'Successfully saved ' + store.new.name );
      $('#mapsEditorModal').modal('hide');
    } else {
      Toaster.error('top', 'Error while saving ' + store.new.name);
    }
  }

  componentDidMount() {
    store.load();
  }

  render() {
    return (
      <Provider store={ store }>
        <section class="container-fluid">
          <Header
            description="Here you can add, remove and edit maps"
            icon="worldMap"
            title="Maps Editor" >
            <button
              data-target="#mapsEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </Header>
          <MapsList />
          <MapsEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
