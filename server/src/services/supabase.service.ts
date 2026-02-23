import { supabase } from "../config/supabaseClient";
import { File } from "buffer";

export async function uploadFileToSupabase(fileName: string, bucket: string, file: File.buffer) {
    // Lataa Supabaseen
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: true,
        });

    if (error) {
        console.error('Upload error:', error);
        return;
    }

    console.log('Tiedosto ladattu onnistuneesti:', data);
}