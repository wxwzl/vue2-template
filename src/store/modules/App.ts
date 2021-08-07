import { VuexModule, Module } from "vuex-module-decorators";
@Module({
  namespaced: true,
  stateFactory: true,
  name: "App",
})
export default class App extends VuexModule {}
