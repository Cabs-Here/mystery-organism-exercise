// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


function pAequorFactory  (num, dnaBases) {
  return  {
    specimenNum: num,
    dna: dnaBases,
    mutate: function() {
      let selectedIndex = Math.floor(Math.random() * (this.dna.length - 1));
      let newBase = returnRandBase();
      
      while (newBase === this.dna[selectedIndex]) {
        newBase = returnRandBase();
      }
      this.dna[selectedIndex] = newBase;
      return this.dna;
    },
    compareDNA: function(otherOrg) {
      let numMatches = 0;
      for (var i = 0; i < 15; i++) {
        if (this.dna[i] === otherOrg.dna[i]) {
          numMatches++;
        }
      }
      let result = (numMatches / 15) * 100;
      let message = `Specimen #${this.specimenNum} and specimen #${otherOrg.specimenNum} have ${result.toFixed(0)}% DNA in common`;
      return message;
    },
    willLikelySurvive: function() {
      const cOrG = this.dna.filter(el => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6;
    },
    
  };
}


//create 30 instances where willLikelySurvive is true:

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen)





