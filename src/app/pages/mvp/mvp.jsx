import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Shared Components
import Header from '../../components/header';
import { Toaster } from '../../components/toast';

// Subcomponents
import MvpList from './mvp-list';
import MvpEditorModal from './mvp-editor-modal';

// Stores
import MvpsStore from '../../../stores/mvp.js';

const store = MvpsStore();

export default class MvpPage extends Component {
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
      $('#mvpEditorModal').modal('hide');
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
            description="Here you can add, remove and edit mvps"
            icon="bomb"
            title="Mvp Editor" >
            <button
              data-target="#mvpEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </Header>
          <MvpList />
          <MvpEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
