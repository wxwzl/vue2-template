import { VuexModule, Module, getModule, Mutation } from "vuex-module-decorators";
// import Vuex from "vuex";
// const store = new Vuex.Store({});
import store from "@store/index";
@Module({
  namespaced: true,
  dynamic: true,
  stateFactory: true,
  name: "Home",
  store: store,
})
class Home extends VuexModule {
  public name = "home";

  @Mutation
  setName(name: string) {
    this.name = name;
  }
}

export default getModule(Home);
