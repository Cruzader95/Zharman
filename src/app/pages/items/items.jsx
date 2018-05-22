import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';
import { Toaster } from '../../components/toast';

// Subcomponents
import ItemsList from './items-list';
import ItemsEditorModal from './items-editor-modal';

// Stores
import ItemsStore from '../../../stores/items.js';

const store = ItemsStore();

export default class ItemsPage extends Component {
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
      Toaster.success('top', 'Successfully saved ' + store.new.name);
      $('#itemsEditorModal').modal('hide');
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
            description="Here you can add, remove and edit items"
            icon="dagger"
            title="Items Editor" >
            <button
              data-target="#itemsEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </Header>
          <ItemsList />
          <ItemsEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
