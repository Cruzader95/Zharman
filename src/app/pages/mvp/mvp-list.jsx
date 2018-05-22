import { Component } from 'preact';
import { connect } from 'parket/preact';

// Shared components
import { Toaster } from '../../components/toast';
import Table from '../../components/table';

const RACES = [ 'Slime', 'Orc', 'Mimic' ];

@connect
export default class MobsList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { label: 'Name', content: this.renderNameColumn.bind(this) },
      { label: 'HP', content: (mvp) => mvp.stats.hp },
      { label: 'SP', content: (mvp) => mvp.stats.sp },
      { label: 'STR', content: (mvp) => mvp.stats.str },
      { label: 'DEF', content: (mvp) => mvp.stats.def },
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

  renderActionsColumn(mvp) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(mvp, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(mvp) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mvpEditorModal"
        onClick={ () => { this.props.store.select(mvp) } }>
        <img
          class="img-responsive rounded-circle mr-2"
          data-toggle="modal"
          data-target="#mvpEditorModal"
          onClick={ () => { this.props.store.select(mvp) } }
          src={ mvp.picture }
          height="30" />
        { mvp.name } ({ RACES[mvp.race] })</span>
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
          <label for="mvpscripts">Add Mvp Scripts: </label>
          <textarea class="form-control" id="mvpscripts" rows="3"></textarea>
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

