import { supabase } from "../config/supabaseClient";

export async function uploadFileToSupabase(fileName: string, file: Express.Multer.File) {
    // Lataa Supabaseen
    const { data, error } = await supabase.storage
        .from('ATS')
        .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: true,
    });
    
    if(error) {
        throw error;
    };

    // Varmistetaan, että function ei palauta undefined
    if(!data) {
        throw new Error("Upload failed!");
    };

    return {
        id: data.id,
        path: data.path,
        fullPath: data.fullPath
    };
};