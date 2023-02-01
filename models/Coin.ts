export default class Coin {
  constructor(
    public id: number,
    public name: string,
    public symbol: string,
    public price: number,
    public percentChange: number
  ) {}
}
