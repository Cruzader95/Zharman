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
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#itemdata" role="tab" data-toggle="tab">Data</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#itemscripts" role="tab" data-toggle="tab">Scripts</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#itemdemo" role="tab" data-toggle="tab">Item Demo</a>
              </li>
            </ul>
          </form>
        </div>

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane fade in active" id="itemdata">
            <div class="form-row">
              <div class="form-group col-sm-5 offset-sm-1">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-5">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture(e.target.value) } type="url" value={ store.new.picture } />
              </div>
            </div>
          </div>

          <div role="tabpanel" class="tab-pane fade" id="itemscripts">
            <div class="form-row">
              <div class="form-group col-sm-10 offset-sm-1">
                <label for="itemscripts">Add Items Scripts: </label>
                <textarea class="form-control" id="itemscripts" rows="4"></textarea>
              </div>
            </div>
          </div>

          <div role="tabpanel" class="tab-pane fade" id="itemdemo">Section in Development :D</div>

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
