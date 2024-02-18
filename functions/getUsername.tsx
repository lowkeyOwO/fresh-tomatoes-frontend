export type Token = string | undefined;

interface ProfileDetails {
  newUser: boolean;
  userDetails?: object;
}

export default async function getUsername(token: Token): Promise<ProfileDetails> {
  try {
    const profileURL = "http://localhost:4000/api/profile";
    const profileOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
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