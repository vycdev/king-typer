import React from "react";

import { apiUrl } from "../../utils/constants";

export const ProfilePage = () => {
    return (
        <button
            onClick={async () => {
                await fetch(`${apiUrl}/auth/logout`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                location.replace("");
            }}
        >
            Logout
        </button>
    );
};
