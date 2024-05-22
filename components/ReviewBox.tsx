interface ProfileProps {
  profileData: object | null;
}

export default function ReviewBox({ profileData }: ProfileProps) {
    console.log("profile DATA:\t", profileData);
    return <h1>user data</h1>
}
