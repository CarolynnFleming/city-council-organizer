const SUPABASE_URL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzM5MywiZXhwIjoxOTU2OTEzMzkzfQ.5E636TNNCxoTJtTExSwOutzpIBjtS4WLgOnqfXdnvvM';
const SUPABASE_KEY = 'https://igyvpimxugpyxqzzyuep.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getCityCouncilOrganizers() {
    const response = await client
        .from('city_council_organizer')
        .select(`*, city_council_members (*)`);
    return checkError(response);
}

export async function createMember(member) {
    const response = await client
        .from('city_council_members')
        .insert(member);
    return checkError(response);
}

export async function deleteMember(memberId) {
    const response = await client 
        .from('city_council_member')
        .delete()
        .match({ id: memberId })
        .single;
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
        location.replace('./organizer');
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
