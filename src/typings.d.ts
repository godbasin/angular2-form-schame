/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare interface Date {
  format: (fmt: any) => string;
}
declare var $: any;
declare var require: NodeRequire;