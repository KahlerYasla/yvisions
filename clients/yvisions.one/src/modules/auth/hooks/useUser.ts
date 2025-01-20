import { create } from "zustand"
import axios from "axios"
import { LoginRequest, LoginResponse } from "../types/dtos/login.dto"

// Types
export type User = {
    id: string
    username: string
    imageURL: string
    email: string
    token: string
}

interface useUserState {
    user: User | null
    dummyUsers: User[] // Array of dummy users
    setUser: (user: User | null) => void
    login: (loginRequest: LoginRequest) => Promise<LoginResponse>
    logout: () => void
    cacheUser: () => void
    isUserCached: boolean
    getUserFromCache: () => User | null
}

export const useUser = create<useUserState>((set, get) => ({
    user: null,
    dummyUsers: [
        {
            id: "1",
            username: "selin_cirak",
            imageURL:
                "https://media.licdn.com/dms/image/v2/D4D03AQGffS6xyL19xQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728595164756?e=1743033600&v=beta&t=mETEcfAdRBB24kNxElMkQjdNCUGcj_Lyjg4VOuvPxQE",
            email: "selin.cirak@example.com",
            token: "dummy-token-1",
        },
        {
            id: "2",
            username: "jane_smith",
            imageURL: "https://randomuser.me/api/portraits/women/2.jpg",
            email: "jane.smith@example.com",
            token: "dummy-token-2",
        },
        {
            id: "3",
            username: "alex_brown",
            imageURL: "https://randomuser.me/api/portraits/men/3.jpg",
            email: "alex.brown@example.com",
            token: "dummy-token-3",
        },
    ],
    setUser: (user) => set({ user }),
    login: async (loginRequest) => {
        const response = await axios.post<LoginResponse>(
            "/auth/login",
            loginRequest
        )

        return response.data
    },
    logout: () => set({ user: null }),
    cacheUser: () => {
        const user = localStorage.getItem("user")
        if (user) {
            set({ user: JSON.parse(user) })
        }
    },
    getUserFromCache: () => JSON.parse(localStorage.getItem("user") || "{}"),
    isUserCached: !!localStorage.getItem("user"),
}))
