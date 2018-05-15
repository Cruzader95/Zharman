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
      { label: 'HP', content: (mobs) => mobs.stats.hp },
      { label: 'SP', content: (mobs) => mobs.stats.sp },
      { label: 'STR', content: (mobs) => mobs.stats.str },
      { label: 'DEF', content: (mobs) => mobs.stats.def },
      { label: 'INT', content: (mobs) => mobs.stats.int },
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

  renderActionsColumn(mobs) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(mobs, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(mobs) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mobsEditorModal"
        onClick={ () => { this.props.store.select(mobs) } }>{ mobs.name } ({ RACES[mobs.race] })</span>
    )
  }

  render({ store }) {
    return (
      <Table
        cols={ this.columns }
        data={ store.list }
        footer={ `Total: ${ store.list.length }` }
        loading={ store.loading } />
    );
  }
}
