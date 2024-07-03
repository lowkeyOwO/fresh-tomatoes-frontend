import { Token } from "./getUsername";

interface personData {
  personDetails: object;
}
const personDataURL = `${process.env.NEXT_PUBLIC_BACKENDURL}getPersonDetails`;
export default async function getPersonDetails(
  token: Token,
  person_id: number
): Promise<personData> {
  try {
    
    const personDataOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, person_id }),
    };
    const personStatus = await fetch(personDataURL, personDataOPT);

    if (!personStatus.ok) {
      throw new Error("Failed to fetch person data");
    }

    const personData: personData = await personStatus.json();
    return personData;
  } catch (error) {
    console.error("Error fetching person data:", error);
    throw error;
  }
}
