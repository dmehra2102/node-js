abstract class Vehicle {
  abstract modelName: string;
  abstract brandName: string;

  displayModelname(): void {
    console.log(this.modelName);
  }
}

class Tata extends Vehicle {
  brandName: string;
  modelName: string;
  constructor(brandName: string, modelName: string) {
    super();
    this.brandName = brandName;
    this.modelName = modelName;
  }
}

const t1 = new Tata("Tata Motors", "Safari");
t1.displayModelname();
