"use client"

export default function Condition() {
    const loading = false;
    const users = [];

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {users.length === 0 ? (
                <h1>Không có User</h1>
            ) : (
                <h1>Có User</h1>
            )}
        </>
    );


}