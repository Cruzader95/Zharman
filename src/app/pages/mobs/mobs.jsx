import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';
import { Toaster } from '../../components/toast';

// Subcomponents
import MobsList from './mobs-list';
import MobEditorModal from './mob-editor-modal';

// Stores
import MobsStore from '../../../stores/mobs.js';

const store = MobsStore();

export default class MobsPage extends Component {
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
      $('#mobEditorModal').modal('hide');
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
            description="Here you can add, remove and edit mobs"
            icon="spider"
            title="Mobs Editor" >
            <button
              data-target="#mobEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </Header>
          <MobsList />
          <MobEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
