import { Token } from "./getUsername";

const searchURL = `${process.env.NEXT_PUBLIC_BACKENDURL}search`;
export default async function searchForData(searchVal: string, token: Token) {
  try {
    const searchOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, searchVal }),
    };
    const searchStatus = await fetch(searchURL, searchOPT);
    const searchData = await searchStatus.json();
    if (searchStatus.ok) {
        return searchData;
    } else {
        console.error("Search Failed:\t", searchData.error);
        return {error : "Search Unsuccessful!"};
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
