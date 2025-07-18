class Parent {
  constructor() {
    return { Name: "Divya Mehra" };
  }
}

class Child extends Parent {
  constructor() {
    super();
    return { name: "Hello World Deepanshu Mehra" };
  }
}

const parent = new Parent();
console.log(parent);

const child = new Child();
console.log(child.name);

class ClassWithStaticMethod {
  static staticProperty = "someValue";
  static staticMethod() {
    return "static method has been called.";
  }
  static {
    console.log("Class static initialization block called");
  }
}

const c1 = new ClassWithStaticMethod();

console.log(c1.staticMethod()); // This will throw an error

console.log(ClassWithStaticMethod.staticProperty);
// Expected output: "someValue"
console.log(ClassWithStaticMethod.staticMethod());
// Expected output: "static method has been called."
