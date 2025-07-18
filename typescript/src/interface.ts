interface Country {
  readonly capital: string;
  population: string;
  GDP: string;
  prime_minister: string;
  world_ranking: number;
  readonly national_sports: string;
}

const myCountry: Country = {
  capital: "Delhi",
  GDP: "$4 trillion +",
  national_sports: "Hockey",
  population: "1.4 billion",
  prime_minister: "Modi",
  world_ranking: 4,
};

console.log(myCountry);
