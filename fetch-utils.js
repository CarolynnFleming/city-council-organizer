const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzM5MywiZXhwIjoxOTU2OTEzMzkzfQ.5E636TNNCxoTJtTExSwOutzpIBjtS4WLgOnqfXdnvvM';
const SUPABASE_URL = 'https://igyvpimxugpyxqzzyuep.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getEvents() {
    const response = await client
        .from('events')
        .select(`*, event_participants (*)`);
    return checkError(response);
}

export async function createParticipant(participant) {
    const response = await client
        .from('event_participants')
        .insert(participant);
    return checkError(response);
}

export async function deleteParticipant(participantId) {
    const response = await client 
        .from('event_participants')
        .delete()
        .match({ id: participantId })
        .single();
    return checkError(response);
}


export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./events');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
