import { Component } from 'preact';
import { Provider } from 'parket/preact';
import $ from 'jquery';

// Components
import CharsList from './chars-list';
import CharEditorModal from './char-editor-modal';

// Stores
import CharsStore from '../../../stores/chars.js';

const store = CharsStore();

export default class CharPage extends Component {
  constructor(props) {
    super(props);
  }

  onSave(e) {
    e.preventDefault();

    if (store.new.id) {
      store.update();
    } else {
      store.save();
    }

    store.reset();

    $('#charEditorModal').modal('hide');
  }

  componentDidMount() {
    store.load();
  }

  render() {
    return (
      <Provider store={ store }>
        <section class="container-fluid">
          <nav class="navbar navbar-light border-bottom px-0 mb-3">
            <h3>Chars Editor</h3>
            <button
              data-target="#charEditorModal"
              data-toggle="modal"
              class="btn btn-sm btn-primary ml-auto"
              type="button">➕ NEW</button>
          </nav>
          <p class="text-muted">Here you can add, remove, edit and compare your chars.</p>
          <CharsList />
          <CharEditorModal onSave={ this.onSave.bind(this) } />
        </section>
      </Provider>
    );
  }
}
