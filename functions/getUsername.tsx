export type Token = string | undefined;

interface ProfileDetails {
  newUser: boolean;
  userDetails?: object;
}

export default async function getUsername(
  token: string | undefined,
  username?: string | undefined
): Promise<ProfileDetails> {
  try {
    const profileURL = `${process.env.NEXT_PUBLIC_BACKENDURL}profile`;
    let requestBody: {
      token: string | undefined;
      username?: string | undefined;
    } = { token };
    if (username) {
      requestBody = { ...requestBody, username };
    }
    const profileOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    const profileStatus = await fetch(profileURL, profileOPT);

    if (!profileStatus.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData: ProfileDetails = await profileStatus.json();
    return profileData;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}
