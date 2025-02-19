export interface UserType {
    profile: ProfileType;
    id: number;
    username: string;
    email: string;
    password: string;
    posts: PostType[];
}

export interface ProfileType {
    id: number;
    bio: string;
    profileImage: string;
    user: UserType;
    userId: number;
}

export interface PostType {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: UserType;
}