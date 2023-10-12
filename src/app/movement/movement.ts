export class Movement {
 name: string;
 description: string;
 countryOfOrigin: string;
 activeYears: string;

 constructor(name: string, description: string, countryOfOrigin: string, activeYears: string) {
   this.name = name;
   this.description = description;
   this.countryOfOrigin = countryOfOrigin;
   this.activeYears= activeYears;
 }
}