import axios from 'axios';
import model from 'parket';

const API_URI = process.env.PREACT_APP_API + '/maps';

const MapsStore = model('MapsStore', {
  initial: () => ({
    list: [],
    new: {
      name: '',
      picture: '',
      width: 0,
      height: 0,
      warps: {}
    },
    loading: true
  }),
  actions: state => ({
    load() {
      state.loading = true;
      axios
        .get(API_URI)
        .then(response => {
          state.list = response.data;
          state.loading = false;
          state.reset();
        })
    },
    reset() {
      state.new = {
        name: '',
        picture: '',
        width: 0,
        height: 0,
        warps: {}
      }
    },
    remove(map, callback) {
      state.loading = true;
      axios
        .delete(API_URI + '/' + map.id)
        .then(response => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    save(callback) {
      state.loading = true;
      axios
        .post(API_URI, state.new)
        .then((response) => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    update(callback) {
      state.loading = true;
      axios
        .put(API_URI + '/' + state.new.id, state.new)
        .then((response) => {
          state.load();
          callback(response);
        })
        .catch( (response) => {
          callback(response);
          state.loading = false;
        });
    },
    select(map) {
      state.new.name = map.name;
      state.new.picture = map.picture;
      state.new.width = map.width;
      state.new.height = map.height;
      state.new.warps = map.warps;
      state.new.id = map.id;
    },
    setName (name) {
      state.new.name = name;
    },
    setPicture (picture) {
      state.new.picture = picture;
    },
    setWidth (width) {
      state.new.width = width;
    },
    setHeight (height) {
      state.new.height = height;
    },
    setWarps (warps) {
      state.new.warps = warps;
    }
  })
});

export default MapsStore;
