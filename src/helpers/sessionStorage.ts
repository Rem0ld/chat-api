import { Continent, Country, Hobby } from "types";


export function setSessionStorageIncludedExcluded(
  included: Country[],
  excluded: Country[]
): void {
  sessionStorage.setItem("included", JSON.stringify(included));
  sessionStorage.setItem("excluded", JSON.stringify(excluded));
};

export function getSessionStorageIncluded(): Country[] {
  const list: string = sessionStorage.getItem("included") as string
  return JSON.parse(list) as Country[];
}

export function getSessionStorageExcluded(): Country[] {
  const list: string = sessionStorage.getItem("excluded") as string;
  return JSON.parse(list) as Country[];
}

export function getSessionStorage(argument: string): Country[] {
  const list: string = sessionStorage.getItem(argument) as string;
  return JSON.parse(list) as Country[];
}

export function setSessionStorageFilter(name: string, element: Continent | Hobby): void {
  sessionStorage.setItem(name, JSON.stringify(element));
}

export function getSessionStorageFilter(name: string): Continent | Hobby {
  const filter: string = sessionStorage.getItem(name) as string;
  return JSON.parse(filter) as Continent | Hobby;
}