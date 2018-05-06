import { Component } from 'preact';
import { connect } from 'parket/preact';

// Shared components
import { Toaster } from '../../components/toast';
import Table from '../../components/table';

const RACES = [ 'Archer', 'Knight', 'Mage' ];

@connect
export default class CharsList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { label: 'Name', content: this.renderNameColumn.bind(this) },
      { label: 'HP', content: (char) => char.stats.hp },
      { label: 'SP', content: (char) => char.stats.sp },
      { label: 'STR', content: (char) => char.stats.str },
      { label: 'DEF', content: (char) => char.stats.def },
      { label: 'INT', content: (char) => char.stats.int },
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

  renderActionsColumn(char) {
    return (
      <button
        class="btn btn-outline-danger btn-sm badge"
        onClick={ () => this.props.store.remove(char, this.onRemove.bind(this)) }>&times;</button>
    )
  }

  renderNameColumn(char) {
    return (
      <span
        class="btn btn-sm text-primary"
        data-toggle="modal"
        data-target="#charEditorModal"
        onClick={ () => { this.props.store.select(char) } }>{ char.name } ({ RACES[char.race] })</span>
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
