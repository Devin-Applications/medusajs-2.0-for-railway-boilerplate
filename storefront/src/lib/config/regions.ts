export interface RegionConfig {
  name: string;
  phone: string;
  zipCodes: string[];
}

export const regions: RegionConfig[] = [
  {
    name: "Queens",
    phone: "(718) 515-1951",
    zipCodes: ["11101", "11102", "11103", "11104", "11105", "11106"]
  },
  {
    name: "Manhattan",
    phone: "(212) 515-1951",
    zipCodes: ["10001", "10002", "10003", "10004", "10005", "10006"]
  },
  {
    name: "Brooklyn",
    phone: "(347) 515-1951",
    zipCodes: ["11201", "11202", "11203", "11204", "11205", "11206"]
  },
  {
    name: "Bronx",
    phone: "(718) 515-1952",
    zipCodes: ["10451", "10452", "10453", "10454", "10455", "10456"]
  }
];

export const defaultRegion = regions[0]; // Queens as default
