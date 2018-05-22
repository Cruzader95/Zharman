import axios from 'axios';
import model from 'parket';

const API_URI = process.env.PREACT_APP_API + '/mvp';

const MvpsStore = model('MvpsStore', {
  initial: () => ({
    list: [],
    new: {
      name: '',
      picture: '',
      points: 20,
      race: 0, // 0: Slime, 1: Orc, 2: Mimic
      stats: {
        hp: 4,
        sp: 4,
        str: 4,
        def: 4
      }
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
        points: 20,
        race: 0,
        stats: {
          hp: 4,
          sp: 4,
          str: 4,
          def: 4
        }
      }
    },
    remove(mvp, callback) {
      state.loading = true;
      axios
        .delete(API_URI + '/' + mvp.id)
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
    select(mvp) {
      state.new.name = mvp.name;
      state.new.picture = mvp.picture;
      state.new.id = mvp.id;
      state.new.stats = mvp.stats;
      state.new.points = mvp.points;
    },
    setName (name) {
      state.new.name = name;
    },
    setPicture (picture) {
      state.new.picture = picture;
    },
    setRace(index) {
      state.new.race = index
    },
    setStat(stat, value) {
      state.new.stats[stat] = parseInt(value, 10) | 0;
      state.new.points =
        state.new.stats.hp + state.new.stats.sp +
        state.new.stats.str + state.new.stats.def;
    }
  })
});

export default MvpsStore;
