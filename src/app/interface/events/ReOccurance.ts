export class ReOccurance {
  reOccuranceFrequency: String;
  numberOfOccurance: Number;
  endDate: String;
  isActive: boolean = true;

  constructor(frequency: String, occurance: Number) {
    this.reOccuranceFrequency = frequency;
    this.numberOfOccurance = occurance;
  }
}
