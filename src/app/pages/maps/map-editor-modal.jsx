import { connect } from 'parket/preact';
import { Component } from 'preact';

// Shared components
import Icon from '../../components/icon';
import Modal from '../../components/modal';

@connect
export default class MapsEditorModal extends Component {
  render ({ store, onSave }) {
    return (
      <Modal id="mapsEditorModal" title="Add a new Map">
        <div class="modal-body">
          <form id="newMapForm">
            <div class="form-row">
              <div class="form-group col-sm-6">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-4">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture('picture', e.target.value) } type="url" value={ store.new.picture } />
              </div>
              <div class="form-group col-sm-4">
                Width: <input class="form-control" onInput={ (e) => store.setWidth('width', e.target.value) } type="number" value={ store.new.width } />
              </div>
              <div class="form-group col-sm-4">
                Height: <input class="form-control" onInput={ (e) => store.setHeight('height', e.target.value) } type="number" value={ store.new.height } />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            data-dismiss="modal">Close</button>
          <button
            class="btn btn-primary"
            disabled={ store.loading === true }
            onClick={ onSave }>
            { store.loading === true && ( <Icon className="icon-spin" figure="spinner" /> ) }
            { store.new.id? 'Update': 'Save' }
          </button>
        </div>
      </Modal>
    );
  }
}
