import * as types from './mutation-type'
const mutation = {
  [types.SingerData] (state, singer) {
    state.singer = singer
  }
}
export default mutation
