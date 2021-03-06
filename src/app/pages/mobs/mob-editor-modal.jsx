import { connect } from 'parket/preact';
import { Component } from 'preact';

// Shared components
import Icon from '../../components/icon';
import Modal from '../../components/modal';

@connect
export default class MobEditorModal extends Component {
  render ({ store, onSave }) {
    return (
      <Modal id="mobEditorModal" title="Add a new mob">
        <div class="modal-body">
          <form id="newMobForm">
            <div class={ 'border-bottom mb-3 py-1 ' + (store.new.points !== 20 && 'text-danger') }>
              Available points: { 20 - store.new.points }
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } placeholder="Unknown" />
              </div>
              <div class="form-group col-sm-4">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture(e.target.value) } type="url" value={ store.new.picture } />
              </div>
              <div class="form-group col-sm-3">
                HP: <input class="form-control" min="0" max="10" onInput={ (e) => store.setStat('hp', e.target.value) } type="number" value={ store.new.stats.hp } />
              </div>
              <div class="form-group col-sm-3">
                SP: <input class="form-control" min="0" max="10" onInput={ (e) => store.setStat('sp', e.target.value) } type="number" value={ store.new.stats.sp } />
              </div>
              <div class="form-group col-sm-3">
                STR: <input class="form-control" min="0" max="10" onInput={ (e) => store.setStat('str', e.target.value) } type="number" value={ store.new.stats.str } />
              </div>
              <div class="form-group col-sm-3">
                DEF: <input class="form-control" min="0" max="10" onInput={ (e) => store.setStat('def', e.target.value) } type="number" value={ store.new.stats.def } />
              </div>
              <div class="form-group col">
                <div class="btn-group btn-group-toggle">
                  <label class={ 'btn btn-secondary ' + (store.new.race === 0 ? 'active': '') }>
                    <input type="radio" onChange={ () => store.setRace(0) } /> Slime
                  </label>
                  <label class={ 'btn btn-secondary ' + (store.new.race === 1 ? 'active': '') }>
                    <input type="radio" onChange={ () => store.setRace(1) } /> Orc
                  </label>
                  <label class={ 'btn btn-secondary ' + (store.new.race === 2 ? 'active': '') }>
                    <input type="radio" onChange={ () => store.setRace(2) } /> Mimic
                  </label>
                </div>
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
            disabled={ store.loading === true || store.new.points !== 20 }
            onClick={ onSave }>
            { store.loading === true && ( <Icon className="icon-spin" figure="spinner" /> ) }
            { store.new.id? 'Update': 'Save' }
          </button>
        </div>
      </Modal>
    );
  }
}
