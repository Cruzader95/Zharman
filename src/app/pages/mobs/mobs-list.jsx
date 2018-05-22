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
      { label: 'HP', content: (mob) => mob.stats.hp },
      { label: 'SP', content: (mob) => mob.stats.sp },
      { label: 'STR', content: (mob) => mob.stats.str },
      { label: 'DEF', content: (mob) => mob.stats.def },
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

  renderActionsColumn(mob) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(mob, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(mob) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#mobEditorModal"
        onClick={ () => { this.props.store.select(mob) } }>
        <img
          class="img-responsive rounded-circle mr-2"
          data-toggle="modal"
          data-target="#mobEditorModal"
          onClick={ () => { this.props.store.select(mob) } }
          src={ mob.picture }
          height="30" />
        { mob.name } ({ RACES[mob.race] })</span>
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
