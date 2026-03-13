"use server";

import { supabaseAdmin } from "@/lib/supabase";

export async function executeSpin(phoneNumber: string) {
  const { data: user } = await supabaseAdmin
    .from("thr_hunters")
    .select("spins_left, total_prize")
    .eq("phone_number", phoneNumber)
    .single();

  if (!user || user.spins_left <= 0) {
    return { success: false, message: "Jatah gatcha Anda sudah habis!" };
  }

  const riggedPrizes = [500, 1000, 1500];
  const winAmount =
    riggedPrizes[Math.floor(Math.random() * riggedPrizes.length)];

  const newTotalPrize = user.total_prize + winAmount;
  const newSpinsLeft = user.spins_left - 1;

  const { error } = await supabaseAdmin
    .from("thr_hunters")
    .update({
      total_prize: newTotalPrize,
      spins_left: newSpinsLeft,
    })
    .eq("phone_number", phoneNumber);

  if (error) throw new Error(error.message);

  return {
    success: true,
    prize: winAmount,
    current_total: newTotalPrize,
    spins_left: newSpinsLeft,
  };
}

export async function getLeaderboard() {
  const { data, error } = await supabaseAdmin
    .from("thr_hunters")
    .select("name, total_prize")
    .order("total_prize", { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);
  return data;
}
