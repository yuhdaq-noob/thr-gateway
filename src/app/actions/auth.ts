"use server";

import { supabaseAdmin } from "@/lib/supabase";

export async function loginUser(name: string, phoneNumber: string) {
  const { data: existingUser } = await supabaseAdmin
    .from("thr_hunters")
    .select("*")
    .eq("phone_number", phoneNumber)
    .single();

  if (existingUser) {
    return {
      success: true,
      user: existingUser,
      message: "Login kembali berhasil.",
    };
  }

  const { count } = await supabaseAdmin
    .from("thr_hunters")
    .select("*", { count: "exact", head: true });

  if (count !== null && count >= 20) {
    return {
      success: false,
      message: "Maaf, kuota 20 penerima THR sudah penuh!",
    };
  }

  const { data: newUser, error } = await supabaseAdmin
    .from("thr_hunters")
    .insert([{ phone_number: phoneNumber, name: name }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return { success: true, user: newUser, message: "Pendaftaran berhasil!" };
}
