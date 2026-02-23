import { supabase } from "../config/supabaseClient";

export async function uploadFileToSupabase(fileName: string, file: Express.Multer.File) {
    // Lataa Supabaseen
    const { data, error } = await supabase.storage
        .from('ATS')
        .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: true,
    });

    if (error || !data) {
        console.error('Upload error:', error);
        return;
    };

    console.log('Tiedosto ladattu onnistuneesti:', data);
    return {
        id: data.id,
        path: data.path,
        fullPath: data.fullPath
    };
};