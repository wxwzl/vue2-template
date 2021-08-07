import { VuexModule, Module, getModule } from "vuex-module-decorators";
import store from "@store/index";
@Module({
  namespaced: true,
  stateFactory: true,
  name: "Login",
  store: store,
  dynamic: true,
})
class Login extends VuexModule {}

export const loginModule = getModule(Login);
