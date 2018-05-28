import { Component } from 'preact';
import { connect } from 'parket/preact';

// Shared components
import { Toaster } from '../../components/toast';
import Table from '../../components/table';

@connect
export default class MapsList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { label: 'Name', content: this.renderNameColumn.bind(this) },
      { label: 'Picture',content: this.renderPictureColumn.bind(this) },
      { label: 'Width',content: this.renderWidthColumn.bind(this) },
      { label: 'Height',content: this.renderHeightColumn.bind(this) },
      { label: '', content: this.renderActionsColumn.bind(this) }
    ];
  }

  onRemove(response) {
    if (response.status === 200 && response.data) {
      Toaster.success('top', 'Successfully removed ' + this.props.store.new.name
        + this.props.store.new.picture + this.props.store.new.width + this.props.store.new.height);
    } else {
      Toaster.error('top', 'Error while removing ' + this.props.store.new.name
        + this.props.store.new.picture + this.props.store.new.width + this.props.store.new.height);
    }
  }

  renderActionsColumn(map) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(map, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(map) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mapEditorModal"
        onClick={ () => { this.props.store.select(map) } }>{ map.name }</span>
    )
  }

  renderPictureColumn(map) {
    return (
      <img
        class="img-responsive rounded-circle mr-2"
        data-toggle="modal"
        data-target="#mapEditorModal"
        onClick={ () => { this.props.store.select(map) } }
        src={ map.picture }
        height="30" />
    )
  }

  renderWidthColumn(map) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mapEditorModal"
        onClick={ () => { this.props.store.select(map) } }>{ map.width }</span>
    )
  }

  renderHeightColumn(map) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mapEditorModal"
        onClick={ () => { this.props.store.select(map) } }>{ map.height }</span>
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

      </section>
    );
  }
}
