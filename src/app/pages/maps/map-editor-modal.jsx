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
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#mapdata" role="tab" data-toggle="tab">Data</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#mapscripts" role="tab" data-toggle="tab">Scripts</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#mapsdemo" role="tab" data-toggle="tab">Map Demo</a>
              </li>
            </ul>
          </form>
        </div>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane fade in active" id="mapdata">
            <div class="form-row">
              <div class="form-group col-sm-5 offset-sm-1">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-5">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture(e.target.value) } type="url" value={ store.new.picture } />
              </div>
              <div class="form-group col-sm-5 offset-sm-1">
                Width: <input class="form-control" onInput={ (e) => store.setWidth(e.target.value) } type="number" value={ store.new.width } />
              </div>
              <div class="form-group col-sm-5">
                Height: <input class="form-control" onInput={ (e) => store.setHeight(e.target.value) } type="number" value={ store.new.height } />
              </div>
            </div>
          </div>

          <div role="tabpanel" class="tab-pane fade" id="mapscripts">
            <div class="form-row">
              <div class="form-group col-sm-10 offset-sm-1">
                <label for="mapscripts">Add Map Scripts: </label>
                <textarea class="form-control" id="scriptsonmap" rows="3"></textarea>
              </div>
              <div class="form-group col-sm-10 offset-sm-1">
                <label for="mapwarps">Add Warps: </label>
                <textarea class="form-control sndArea" id="mapwarpsm" rows="3"></textarea>
              </div>
            </div>
          </div>

          <div role="tabpanel" class="tab-pane fade" id="mapsdemo">Section in Development :D</div>
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
