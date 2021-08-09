import { VuexModule, Module, getModule } from "vuex-module-decorators";
import instance from "@store/instance";
@Module({
  namespaced: true,
  stateFactory: true,
  name: "App",
  dynamic: true,
  store: instance,
})
export class App extends VuexModule {}
export default getModule(App);
