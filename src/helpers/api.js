import databaseService from "../services/database";

export async function getPosts() {
    const res = await databaseService.getAllActivePosts()
    if(res.documents) {
        return res.documents
    } else {
        throw new Response("Error fetching posts", { status: 500 });
    }
}