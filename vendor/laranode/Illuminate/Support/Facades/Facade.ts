import type Application from "../../Foundation/Application";
import type { Class } from "../../Types";

abstract class Facade {
  protected static facadeId: string | null = null;

  protected static app: Application;

  public static setApplicationFacade(app: Application) {
    this.app = app;
  }

  public static getFacadeAccessor(): Class<any> {
    throw new Error("Facade does not implement getFacadeAccessor method.");
  }

  static __getStatic(name: string, abstract: string) {
    return (...args: any) => {
      let target = this as any;
      if (!this.app.instances[abstract]) {
        this.app.singleton(abstract, this.getFacadeAccessor());
      }
      target = this.app.make(abstract);
      return target[name].call(target, ...args);
    };
  }
}

export default Facade;
