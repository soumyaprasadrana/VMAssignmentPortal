export class Config {
  apiUrl: string = '';
  constructor() {
    this.apiUrl = window.location.origin;
  }
}
