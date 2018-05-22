import { Component } from 'preact';
import { connect } from 'parket/preact';

// Shared components
import { Toaster } from '../../components/toast';
import Table from '../../components/table';


@connect
export default class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { label: 'Name', content: this.renderNameColumn.bind(this) },
      { label: 'Picture',content: this.renderPictureColumn.bind(this) },
      { label: '', content: this.renderActionsColumn.bind(this) }
    ];
  }

  onRemove(response) {
    if (response.status === 200 && response.data) {
      Toaster.success('top', 'Successfully removed ' + this.props.store.new.name);
    } else {
      Toaster.error('top', 'Error while removing ' + this.props.store.new.name);
    }
  }

  renderActionsColumn(items) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(items, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(items) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#itemsEditorModal"
        onClick={ () => { this.props.store.select(items) } }>{ items.name }</span>
    )
  }

  renderPictureColumn(items) {
    return (
      <span
        class="img-responsive rounded-circle mr-2"
        data-toggle="modal"
        data-target="#itemsEditorModal"
        onClick={ () => { this.props.store.select(items) } }
        src={ items.picture }
        height="30">
        { items.picture }</span>
    )
  }

  render({ store }) {
    return (
      <section>
        <Table
          cols={ this.columns }
          data={ store.list }
          footer={ `Total: ${ store.list.length }` }
          loading={ store.loading } />
        <div class="form-group">
          <label for="itemscripts">Add Items Scripts: </label>
          <textarea class="form-control" id="itemscripts" rows="3"></textarea>
        </div>
        <button
          class="btn btn-sm btn-primary ml-auto btnScript"
          type="button">
          ➕ Add Script
        </button>
      </section>
    );
  }
}
