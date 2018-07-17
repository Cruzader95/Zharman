import { connect } from 'parket/preact';
import { Component } from 'preact';

// Shared components
import Icon from '../../components/icon';
import Modal from '../../components/modal';

@connect
export default class UserEditorModal extends Component {
  render ({ store, onSave }) {
    return (
      <Modal id="userEditorModal" title="Add a new User">
        <div class="modal-body">
          <form id="newUserForm">
            <div class="form-row">
              <div className="form-group col-sm-5">
                Nick: <input class="form-control" required autofocus onInput={ (e) => store.setNickname(e.target.value) } type="text" value={ store.new.nickname } name="usAlias" placeholder="Nick"/>
              </div>
              <div className="form-group col-sm-5">
                Name: <input class="form-control" required autofocus onInput={ (e) => store.setName(e.target.value) } type="text" value={ store.new.name } name="usName" placeholder="Name"/>
              </div>
              <div class="form-group col-sm-4">
                Picture: <input class="form-control" onInput={ (e) => store.setPicture(e.target.value) } type="url" value={ store.new.picture } />
              </div>
              <div className="form-group col-sm-4">
                Email: <input class="form-control" required onInput={ (e) => store.setEmail(e.target.value) } type="email" value={ store.new.email } name="usEmail" placeholder="Email"/>
              </div>
              <div className="form-group col-sm-3">
                Level: <input class="form-control" required onInput={ (e) => store.setLevel(e.target.value) } type="number" value={ store.new.level } placeholder="Level"/>
              </div>
              <div className="form-group col-sm-3">
                Password: <input class="form-control" required onInput={ (e) => store.setPassword(e.target.value) } type="password" value={ store.new.password } name="usHash" placeholder="······"/>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secundary"
            data-dismiss="modal">Close</button>
          <button
            class="btn btn-primary"
            disabled={ store.new.name.length <4 }
            onClick={ onSave } >
            { store.loading === true && ( <Icon className="icon-spin" figure="spinner" /> ) }
            { store.new.id? 'Update': 'Save' }
          </button>
        </div>
      </Modal>
    )
  }
}
