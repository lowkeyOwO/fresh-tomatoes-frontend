import { Token } from "./getUsername";

const homepageURL = `${process.env.NEXT_PUBLIC_BACKENDURL}homepage`;

export default async function getHomepage(token: Token) {
  try {
    const homepageOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    };

    const homepageData = await fetch(homepageURL,homepageOPT);
    const homepage = await homepageData.json();
    if (homepageData.ok) {
        return homepage;
    } else {
        throw new Error(homepage);
    }

  } catch (err) {
    return { error: err };
  }
}
