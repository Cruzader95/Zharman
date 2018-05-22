import { connect } from 'parket/preact';
import { Component } from 'preact';

// Shared components
import Icon from '../../components/icon';
import Modal from '../../components/modal';

@connect
export default class ItemsEditorModal extends Component {
  render ({ store, onSave }) {
    return (
      <Modal id="itemsEditorModal" title="Add a new item">
        <div class="modal-body">
          <form id="newItemsForm">
            <div class="form-row">
              <div class="form-group col-sm-6">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-4">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture(e.target.value) } type="url" value={ store.new.picture } />
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
