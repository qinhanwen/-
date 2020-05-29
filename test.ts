function withAuth(url: string) {
  return function withLoginComponent(cmt: any): any {
    return class WithAuth extends cmt {
      constructor() {
        super();
        console.log('constructor',url);
      }
    };
  };
}

@withAuth('url')
class A {

}

new A()