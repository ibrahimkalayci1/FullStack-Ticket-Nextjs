"use server"

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function createTicketAction(formData: FormData){
    // server action içinde olduğumuz için doğrudan veritabanı sorgulamaları yapabiliriz
    const rawData = {
    // form data içerisinden gerekli bilgileri al
    title:formData.get("title"),
    description:formData.get("description"),
    category:formData.get("category"),
    priority:formData.get("priority"),
    progress:formData.get("progress"),
    status:formData.get("status"),
 } 

  
  // veritabanına bağlan
  await connectMongo();

  // yeni ticket oluştur
  const newTicket = await Ticket.create(rawData);

  
  // statik sayfaları yeniden oluştur
  revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${newTicket._id.toString()}`);

  
  // tickets sayfasına yönlendir
  redirect("/tickets");
}







export async function updateTicketAction(formData: FormData){

// güncellenecek elemanın id si
const id = formData.get("id");




// form data içerisinden gerekli bilgileri al
   
    const rawData = {
    title:formData.get("title"),
    description:formData.get("description"),
    category:formData.get("category"),
    priority:formData.get("priority"),
    progress:formData.get("progress"),
    status:formData.get("status"),
 } 

  
  // veritabanına bağlan
  await connectMongo();

// ticket vt da güncelle

const updatedTicket = await Ticket.findByIdAndUpdate(id, rawData, {});

// statik sayfaları yeniden oluştur
revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${updatedTicket._id.toString()}`);

// tickets sayfasına yönlendir
redirect("/tickets")


}